import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("[v0] Middleware checking path:", request.nextUrl.pathname);

  // Only check admin routes, not the login page
  if (
    request.nextUrl.pathname === "/admin" ||
    (request.nextUrl.pathname.startsWith("/admin/") &&
      !request.nextUrl.pathname.startsWith("/admin/login"))
  ) {
    const adminSession = request.cookies.get("admin-session");
    console.log(
      "[v0] Admin session cookie:",
      adminSession?.value ? "exists" : "missing"
    );

    if (!adminSession?.value) {
      console.log("[v0] No session cookie, redirecting to login");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Edge runtime safe base64 decode (avoid Node Buffer)
      const decoded = atob(adminSession.value);
      const sessionData = JSON.parse(decoded);
      console.log("[v0] Session data:", {
        email: sessionData.email,
        role: sessionData.role,
        timestamp: sessionData.timestamp,
      });

      // Check if session is expired (24 hours)
      if (Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000) {
        console.log("[v0] Session expired, redirecting to login");
        const response = NextResponse.redirect(
          new URL("/admin/login", request.url)
        );
        response.cookies.delete("admin-session");
        return response;
      }

      // Check if user has admin role
      if (sessionData.role !== "admin") {
        console.log("[v0] User is not admin, redirecting to login");
        const response = NextResponse.redirect(
          new URL("/admin/login", request.url)
        );
        response.cookies.delete("admin-session");
        return response;
      }

      console.log("[v0] Session valid, allowing access");
    } catch (error) {
      console.log("[v0] Invalid session token, redirecting to login:", error);
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete("admin-session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
