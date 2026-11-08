import { NextRequest, NextResponse } from "next/server";
import { getAllCodes, insertCode, getStats } from "@/lib/db";
import crypto from "crypto";

function getClientIpHash(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "127.0.0.1";

  // SHA256 hash for privacy and anti-abuse tracking
  return crypto.createHash("sha256").update(ip + "_muse_salt").digest("hex").slice(0, 16);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").trim().toUpperCase();
    const sort = searchParams.get("sort") || "newest"; // "newest", "most_copied", "working"
    const includeExhausted = searchParams.get("includeExhausted") === "true";

    let codes = getAllCodes();

    // Filter by status: by default only show active codes (not hidden or removed)
    if (includeExhausted) {
      codes = codes.filter((c) => c.status === "active" || c.status === "exhausted");
    } else {
      codes = codes.filter((c) => c.status === "active" && c.copyCount < (c.maxCopies || 30));
    }

    // Search filter
    if (search) {
      codes = codes.filter(
        (c) =>
          c.code.includes(search) ||
          (c.notes && c.notes.toUpperCase().includes(search))
      );
    }

    // Sort order
    if (sort === "most_copied") {
      codes.sort((a, b) => b.copyCount - a.copyCount);
    } else if (sort === "working") {
      // Prioritize codes with copies left and 0 reports
      codes.sort((a, b) => {
        const aScore = (30 - a.copyCount) - a.reportCount * 5;
        const bScore = (30 - b.copyCount) - b.reportCount * 5;
        return bScore - aScore;
      });
    } else {
      // Default: newest first
      codes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const stats = getStats();

    return NextResponse.json({
      success: true,
      codes,
      totalCount: codes.length,
      stats,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { code, notes, source } = body;

    const ipHash = getClientIpHash(req);

    const result = insertCode(code, source || "web", ipHash, notes);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Invite code successfully added!",
      code: result.code,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
