import { NextResponse } from "next/server";

export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/downloads/:path*", "/settings/:path*", "/learn/:path*"],
};
