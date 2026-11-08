import fs from "fs";
import path from "path";
import { MuseCode, CodeReport, AdminStats } from "./types";

// Determine data directory (works in local dev and on serverless /tmp)
function getDataDir(): string {
  const isVercel = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
  if (isVercel) {
    return "/tmp";
  }
  return path.join(process.cwd(), "data");
}

function getCodesFilePath(): string {
  return path.join(getDataDir(), "muse_codes.json");
}

function getReportsFilePath(): string {
  return path.join(getDataDir(), "muse_reports.json");
}

function ensureDataFile(): void {
  const dir = getDataDir();
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const codesPath = getCodesFilePath();
    if (!fs.existsSync(codesPath)) {
      const defaultSeedPath = path.join(process.cwd(), "data", "muse_codes.json");
      if (fs.existsSync(defaultSeedPath)) {
        const seedData = fs.readFileSync(defaultSeedPath, "utf8");
        fs.writeFileSync(codesPath, seedData, "utf8");
      } else {
        fs.writeFileSync(codesPath, JSON.stringify([], null, 2), "utf8");
      }
    }
    const reportsPath = getReportsFilePath();
    if (!fs.existsSync(reportsPath)) {
      fs.writeFileSync(reportsPath, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.error("Storage initialization error:", err);
  }
}

// Memory cache fallback for fast access & serverless safety
let memoryCodes: MuseCode[] | null = null;
let memoryReports: CodeReport[] | null = null;

export function getAllCodes(): MuseCode[] {
  ensureDataFile();
  try {
    const codesPath = getCodesFilePath();
    if (fs.existsSync(codesPath)) {
      const data = fs.readFileSync(codesPath, "utf8");
      const parsed = JSON.parse(data) as MuseCode[];
      memoryCodes = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn("Could not read codes file, using memory cache", err);
  }
  return memoryCodes || [];
}

export function saveAllCodes(codes: MuseCode[]): void {
  ensureDataFile();
  memoryCodes = codes;
  try {
    const codesPath = getCodesFilePath();
    fs.writeFileSync(codesPath, JSON.stringify(codes, null, 2), "utf8");
  } catch (err) {
    console.error("Could not write codes file:", err);
  }
}

export function getAllReports(): CodeReport[] {
  ensureDataFile();
  try {
    const reportsPath = getReportsFilePath();
    if (fs.existsSync(reportsPath)) {
      const data = fs.readFileSync(reportsPath, "utf8");
      const parsed = JSON.parse(data) as CodeReport[];
      memoryReports = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn("Could not read reports file", err);
  }
  return memoryReports || [];
}

export function saveAllReports(reports: CodeReport[]): void {
  ensureDataFile();
  memoryReports = reports;
  try {
    const reportsPath = getReportsFilePath();
    fs.writeFileSync(reportsPath, JSON.stringify(reports, null, 2), "utf8");
  } catch (err) {
    console.error("Could not write reports file:", err);
  }
}

/**
 * Add a new invite code
 * - Validates format (uppercase, trimmed, alphanumeric, 3-24 characters)
 * - Checks duplicates
 * - Rate limit per IP
 * - Max copies set to 30
 */
export function insertCode(
  rawCode: string,
  source: "web" | "app" = "web",
  ipHash?: string,
  notes?: string
): { success: boolean; code?: MuseCode; error?: string } {
  const codeClean = (rawCode || "").trim().toUpperCase();

  // Validation
  if (!codeClean) {
    return { success: false, error: "Invite code cannot be empty." };
  }
  if (!/^[A-Z0-9_\-]{3,24}$/.test(codeClean)) {
    return {
      success: false,
      error: "Code format is invalid. Use 3 to 24 letters, numbers, or dashes (e.g. MUSE-890).",
    };
  }

  const allCodes = getAllCodes();

  // Check duplicate active or recent code
  const existing = allCodes.find(
    (c) => c.code === codeClean && c.status !== "removed"
  );
  if (existing) {
    if (existing.status === "exhausted") {
      return {
        success: false,
        error: `This code (${codeClean}) was previously shared and has already reached its 30-copy maximum limit.`,
      };
    }
    return {
      success: false,
      error: `This invite code (${codeClean}) has already been submitted and is active in the directory.`,
    };
  }

  // Rate limiting by IP (max 5 codes per day per IP)
  if (ipHash) {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const recentSubmissions = allCodes.filter(
      (c) => c.addedByIpHash === ipHash && c.createdAt > oneDayAgo
    );
    if (recentSubmissions.length >= 5) {
      return {
        success: false,
        error: "Daily submission limit reached (max 5 codes per 24 hours per user).",
      };
    }
  }

  const newCode: MuseCode = {
    id: "code_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8),
    code: codeClean,
    createdAt: new Date().toISOString(),
    copyCount: 0,
    maxCopies: 30, // Strict 30 copy maximum limit per user rule
    reportCount: 0,
    status: "active",
    source,
    addedByIpHash: ipHash,
    notes: notes?.trim() || undefined,
  };

  allCodes.unshift(newCode);
  saveAllCodes(allCodes);

  return { success: true, code: newCode };
}

/**
 * Increment copy count for a code.
 * Stops copying if it has reached 30 copies.
 */
export function recordCopy(
  id: string
): { success: boolean; code?: MuseCode; error?: string; remainingCopies?: number } {
  const allCodes = getAllCodes();
  const index = allCodes.findIndex((c) => c.id === id);

  if (index === -1) {
    return { success: false, error: "Invite code not found." };
  }

  const target = allCodes[index];

  if (target.status === "hidden" || target.status === "removed") {
    return { success: false, error: "This invite code is no longer available." };
  }

  const maxCopies = target.maxCopies || 30;

  if (target.copyCount >= maxCopies || target.status === "exhausted") {
    return {
      success: false,
      error: `This code has reached the maximum allowed limit of ${maxCopies} copies and is now expired.`,
      remainingCopies: 0,
    };
  }

  target.copyCount += 1;
  target.lastCopiedAt = new Date().toISOString();

  // If reached 30, mark as exhausted
  if (target.copyCount >= maxCopies) {
    target.status = "exhausted";
  }

  allCodes[index] = target;
  saveAllCodes(allCodes);

  return {
    success: true,
    code: target,
    remainingCopies: Math.max(0, maxCopies - target.copyCount),
  };
}

/**
 * Report a code
 */
export function reportCode(
  codeId: string,
  reason: string,
  ipHash?: string
): { success: boolean; error?: string } {
  const allCodes = getAllCodes();
  const index = allCodes.findIndex((c) => c.id === codeId);

  if (index === -1) {
    return { success: false, error: "Code not found." };
  }

  const code = allCodes[index];
  code.reportCount = (code.reportCount || 0) + 1;

  // Auto-hide when 5 reports received
  if (code.reportCount >= 5) {
    code.status = "hidden";
  }

  allCodes[index] = code;
  saveAllCodes(allCodes);

  // Save report log
  const reports = getAllReports();
  reports.unshift({
    id: "rep_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    codeId,
    code: code.code,
    reason: reason.trim() || "Reported by user as not working",
    createdAt: new Date().toISOString(),
    ipHash,
  });
  saveAllReports(reports);

  return { success: true };
}

/**
 * Admin: update code status
 */
export function adminUpdateCode(
  id: string,
  updates: Partial<MuseCode>
): { success: boolean; code?: MuseCode; error?: string } {
  const allCodes = getAllCodes();
  const index = allCodes.findIndex((c) => c.id === id);

  if (index === -1) {
    return { success: false, error: "Code not found." };
  }

  allCodes[index] = { ...allCodes[index], ...updates };
  saveAllCodes(allCodes);

  return { success: true, code: allCodes[index] };
}

/**
 * Admin: delete code
 */
export function adminDeleteCode(id: string): { success: boolean; error?: string } {
  const allCodes = getAllCodes();
  const filtered = allCodes.filter((c) => c.id !== id);
  if (filtered.length === allCodes.length) {
    return { success: false, error: "Code not found." };
  }
  saveAllCodes(filtered);
  return { success: true };
}

/**
 * Get system stats
 */
export function getStats(): AdminStats {
  const allCodes = getAllCodes();
  const allReports = getAllReports();

  const totalCodes = allCodes.length;
  const activeCodes = allCodes.filter((c) => c.status === "active").length;
  const exhaustedCodes = allCodes.filter((c) => c.status === "exhausted").length;
  const totalCopies = allCodes.reduce((sum, c) => sum + (c.copyCount || 0), 0);

  return {
    totalCodes,
    activeCodes,
    exhaustedCodes,
    totalCopies,
    totalReports: allReports.length,
  };
}
