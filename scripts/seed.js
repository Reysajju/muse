const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "..", "data", "raw_codes.csv");
const outputPath = path.join(__dirname, "..", "data", "muse_codes.json");

if (!fs.existsSync(csvPath)) {
  console.error("raw_codes.csv not found at", csvPath);
  process.exit(1);
}

const content = fs.readFileSync(csvPath, "utf8");
const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);

// Skip header
const dataLines = lines.slice(1);

const codes = [];
const seenCodes = new Set();

const now = Date.now();

dataLines.forEach((line, index) => {
  const parts = line.split(",");
  if (parts.length < 3) return;

  const rawCode = parts[0].trim().toUpperCase();
  const rawSource = parts[1].trim();
  const rawStatus = parts[2].trim();

  if (!rawCode || seenCodes.has(rawCode)) return;
  seenCodes.add(rawCode);

  const isExpired = rawStatus === "listed-expired";

  // Distribute creation dates over the last 1 to 14 days
  const hoursAgo = Math.floor(Math.random() * 240) + (index % 12);
  const createdAt = new Date(now - hoursAgo * 60 * 60 * 1000).toISOString();

  // Realistic initial copies
  const maxCopies = 30;
  const copyCount = isExpired ? 30 : Math.floor(Math.random() * 15) + 1;

  let simplifiedSource = "Community Share";
  if (rawSource.includes("threads")) simplifiedSource = "Threads";
  else if (rawSource.includes("instagram")) simplifiedSource = "Instagram";
  else if (rawSource.includes("facebook")) simplifiedSource = "Facebook";
  else if (rawSource.includes("aipromptsgenz")) simplifiedSource = "AI Prompts Guide";
  else if (rawSource.includes("allblogthings")) simplifiedSource = "Blog Network";
  else if (rawSource.includes("listreferrals")) simplifiedSource = "Referral Hub";

  codes.push({
    id: `code_${now}_${index}_${Math.random().toString(36).substring(2, 7)}`,
    code: rawCode,
    createdAt,
    copyCount,
    maxCopies,
    reportCount: 0,
    status: isExpired ? "exhausted" : "active",
    source: "web",
    notes: `Source: ${simplifiedSource}`,
  });
});

// Sort with newest first
codes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

fs.writeFileSync(outputPath, JSON.stringify(codes, null, 2), "utf8");
console.log(`Successfully seeded ${codes.length} Muse invite codes into ${outputPath}!`);
