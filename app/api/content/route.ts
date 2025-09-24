import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAdminFromCookie } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: content, error } = await supabase.from("website_content").select("*").order("section")

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
    }

    // Transform to nested object structure
    const contentMap =
      content?.reduce(
        (acc, item) => {
          if (!acc[item.section]) {
            acc[item.section] = {}
          }
          acc[item.section][item.key] = item.value
          return acc
        },
        {} as Record<string, Record<string, string>>,
      ) || {}

    return NextResponse.json({ success: true, content: contentMap })
  } catch (error) {
    console.error("Content fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = getAdminFromCookie(request.headers.get("cookie"))
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { section, key, value } = await request.json()

    if (!section || !key || value === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from("website_content").upsert({
      section,
      key,
      value,
      updated_by: admin.email,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Content update error:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
