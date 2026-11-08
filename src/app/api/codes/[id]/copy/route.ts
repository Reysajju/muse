import { NextRequest, NextResponse } from "next/server";
import { recordCopy } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = recordCopy(id);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Code copied successfully!",
      code: result.code?.code,
      copyCount: result.code?.copyCount,
      remainingCopies: result.remainingCopies,
      maxCopies: result.code?.maxCopies || 30,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
