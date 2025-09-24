import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Create Supabase client
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    })

    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("[v0] Supabase Auth User ID:", authData.user.id)

    // Update admin_users table with correct ID and admin role
    const { error: updateError } = await supabase.from("admin_users").upsert({
      id: authData.user.id, // Use the actual Supabase Auth ID
      email: authData.user.email,
      name: "Albert Perspective",
      role: "admin",
      password_hash: "supabase_auth_managed",
    })

    if (updateError) {
      console.error("[v0] Update error:", updateError)
      return NextResponse.json({ error: "Failed to update admin record" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Albert admin record fixed",
      userId: authData.user.id,
    })
  } catch (error) {
    console.error("[v0] Fix Albert error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
