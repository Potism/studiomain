import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const supabase = await createClient()

    console.log("[v0] Attempting login for:", email)

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("[v0] Supabase auth result:", {
      user: authData.user?.id,
      email: authData.user?.email,
      error: authError?.message,
    })

    if (authError || !authData.user) {
      return NextResponse.json(
        {
          error: "Auth failed",
          details: authError?.message,
        },
        { status: 401 },
      )
    }

    // Check admin_users table
    const { data: adminUsers, error: adminError } = await supabase.from("admin_users").select("*").eq("email", email)

    console.log("[v0] Admin users found:", adminUsers)
    console.log("[v0] Supabase user ID:", authData.user.id)

    return NextResponse.json({
      supabaseUserId: authData.user.id,
      supabaseEmail: authData.user.email,
      adminUsersFound: adminUsers,
      match: adminUsers?.some((user) => user.id === authData.user.id),
    })
  } catch (error) {
    console.error("[v0] Debug error:", error)
    return NextResponse.json({ error: "Debug failed" }, { status: 500 })
  }
}
