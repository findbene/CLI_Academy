import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    mode: "recovery-stub",
    message: "Stripe checkout wiring is next after the app shell and content routes stabilize.",
  });
}
