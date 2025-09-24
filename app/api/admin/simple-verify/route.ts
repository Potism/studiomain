import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const adminEmail = cookieStore.get("admin-email")?.value

    if (!adminEmail) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
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
      },
    )

    // Verify admin status
    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", adminEmail)
      .eq("role", "admin")
      .single()

    if (error || !adminData) {
      return NextResponse.json({ error: "Admin privileges required" }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      admin: {
        id: adminData.id,
        email: adminData.email,
        name: adminData.name,
        role: adminData.role,
      },
    })
  } catch (error) {
    console.error("Verify error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
