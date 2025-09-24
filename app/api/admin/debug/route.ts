import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()

    // Create Supabase client
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Get current user from Supabase Auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    console.log("[v0] Auth user:", user)
    console.log("[v0] Auth error:", authError)

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        message: "No authenticated user",
        user: null,
        adminRecord: null,
      })
    }

    // Check if user exists in admin_users table
    const { data: adminUser, error: dbError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    console.log("[v0] Admin user from DB:", adminUser)
    console.log("[v0] DB error:", dbError)

    // Also check all admin users
    const { data: allAdmins, error: allError } = await supabase.from("admin_users").select("*")

    console.log("[v0] All admin users:", allAdmins)

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
      },
      adminRecord: adminUser,
      allAdminUsers: allAdmins,
      errors: {
        authError,
        dbError,
        allError,
      },
    })
  } catch (error) {
    console.error("[v0] Debug error:", error)
    return NextResponse.json({ error: "Debug failed", details: error }, { status: 500 })
  }
}
