import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    mode: "recovery-stub",
    progress: [],
  });
}

export async function POST() {
  return NextResponse.json({
    ok: true,
    mode: "recovery-stub",
    saved: true,
  });
}
