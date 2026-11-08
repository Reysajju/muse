import { NextRequest, NextResponse } from "next/server";
import {
  getAllCodes,
  getAllReports,
  getStats,
  adminUpdateCode,
  adminDeleteCode,
} from "@/lib/db";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "museadmin2026";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.replace("Bearer ", "").trim() === ADMIN_SECRET) {
    return true;
  }
  const searchParamKey = new URL(req.url).searchParams.get("key");
  if (searchParamKey === ADMIN_SECRET) {
    return true;
  }
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const codes = getAllCodes();
  const reports = getAllReports();
  const stats = getStats();

  return NextResponse.json({
    success: true,
    codes,
    reports,
    stats,
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, id, updates } = body;

    if (action === "update" && id) {
      const res = adminUpdateCode(id, updates || {});
      return NextResponse.json(res);
    }

    if (action === "delete" && id) {
      const res = adminDeleteCode(id);
      return NextResponse.json(res);
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error processing request";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
