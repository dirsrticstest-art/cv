import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    ai_provider: "demo",
    version: "2.0.0",
    platform: "Vercel",
  });
}
