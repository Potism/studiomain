import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Verifying admin session...")

    const token = request.cookies.get("admin-session")?.value
    console.log("[v0] Admin session cookie:", token ? "Present" : "Missing")

    if (!token) {
      console.log("[v0] No admin session cookie found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
      const sessionData = JSON.parse(Buffer.from(token, "base64").toString())

      const sessionAge = Date.now() - sessionData.timestamp
      const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

      if (sessionAge > maxAge) {
        console.log("[v0] Session expired")
        return NextResponse.json({ error: "Session expired" }, { status: 401 })
      }

      if (sessionData.role !== "admin") {
        console.log("[v0] User is not admin:", sessionData.role)
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      console.log("[v0] Session verified for user:", sessionData.email)

      return NextResponse.json({
        success: true,
        user: {
          id: sessionData.userId,
          email: sessionData.email,
          name: sessionData.name,
          role: sessionData.role,
        },
      })
    } catch (decodeError) {
      console.log("[v0] Invalid session token:", decodeError)
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }
  } catch (error) {
    console.error("[v0] Verify error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
