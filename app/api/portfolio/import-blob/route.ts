import { list } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAdminFromCookie } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const admin = getAdminFromCookie(request.headers.get("cookie"))
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // List all files in Blob storage
    const { blobs } = await list()

    // Get existing portfolio items to avoid duplicates
    const supabase = await createClient()
    const { data: existingItems } = await supabase.from("portfolio_items").select("file_url")

    const existingUrls = new Set(existingItems?.map((item) => item.file_url) || [])

    // Filter out files that are already in the portfolio
    const availableFiles = blobs
      .filter((blob) => !existingUrls.has(blob.url))
      .map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        filename: blob.pathname.split("/").pop() || "unknown",
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        // Detect file type from pathname
        type: blob.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? "image" : "video",
      }))

    return NextResponse.json({ files: availableFiles })
  } catch (error) {
    console.error("Error listing blob files:", error)
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = getAdminFromCookie(request.headers.get("cookie"))
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { files } = await request.json()

    if (!files || !Array.isArray(files)) {
      return NextResponse.json({ error: "Invalid files data" }, { status: 400 })
    }

    const supabase = await createClient()

    // Import selected files to portfolio database
    const portfolioItems = files.map((file) => ({
      title: file.title || file.filename,
      description: file.description || "",
      category: file.category || "Studio Photography",
      file_url: file.url,
      file_type: file.type,
      file_size: file.size,
      blob_pathname: file.pathname,
    }))

    const { data, error } = await supabase.from("portfolio_items").insert(portfolioItems).select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to import files" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      imported: data?.length || 0,
      items: data,
    })
  } catch (error) {
    console.error("Import error:", error)
    return NextResponse.json({ error: "Import failed" }, { status: 500 })
  }
}
