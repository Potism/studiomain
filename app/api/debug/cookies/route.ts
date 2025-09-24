import { type NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    console.log("[Debug] Full cookie header:", cookieHeader);

    const admin = getAdminFromCookie(cookieHeader);
    console.log("[Debug] Admin result:", admin);

    return NextResponse.json({
      cookieHeader,
      admin,
      success: !!admin,
    });
  } catch (error) {
    console.error("[Debug] Error:", error);
    return NextResponse.json({ error: "Debug failed" }, { status: 500 });
  }
}

