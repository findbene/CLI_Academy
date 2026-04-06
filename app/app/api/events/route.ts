import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    mode: "recovery-stub",
    message: "Telemetry ingestion will be rewired after the frontend shell stabilizes.",
  });
}
