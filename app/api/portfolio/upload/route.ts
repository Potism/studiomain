import { put } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    console.log("[Upload] Starting upload request - Next.js 14 approach");

    // Use Next.js 14 request.cookies for consistency with verify endpoint
    const token = request.cookies.get("admin-session")?.value;

    console.log(
      "[Upload] Admin session cookie:",
      token ? "Found" : "Not found"
    );

    if (!token) {
      console.log("[Upload] No admin session cookie");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the session data (using Buffer like verify endpoint)
    let sessionData;
    try {
      sessionData = JSON.parse(Buffer.from(token, "base64").toString());
      console.log("[Upload] Session decoded for user:", sessionData.email);
    } catch (error) {
      console.log("[Upload] Failed to decode session:", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - sessionData.timestamp;
    const maxAge = 24 * 60 * 60 * 1000;

    if (sessionAge > maxAge) {
      console.log("[Upload] Session expired");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin role
    if (sessionData.role !== "admin") {
      console.log("[Upload] User role is not admin:", sessionData.role);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("[Upload] Authentication successful for:", sessionData.email);

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const thumbnail = formData.get("thumbnail") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    if (!file || !title || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create unique filename with category prefix
    const fileExtension = file.name.split(".").pop();
    const uniqueId = nanoid();
    const uniqueFilename = `portfolio/${category
      .toLowerCase()
      .replace(/\s+/g, "-")}/${uniqueId}.${fileExtension}`;

    // Upload main file to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
    });

    // Upload thumbnail if provided (for video files)
    let thumbnailUrl = null;
    if (thumbnail) {
      const thumbnailFilename = `portfolio/${category
        .toLowerCase()
        .replace(/\s+/g, "-")}/thumbnails/${uniqueId}-thumbnail.jpg`;

      const thumbnailBlob = await put(thumbnailFilename, thumbnail, {
        access: "public",
      });
      thumbnailUrl = thumbnailBlob.url;
    }

    const supabase = await createClient();

    const portfolioItem = {
      title,
      description,
      category,
      file_url: blob.url,
      file_type: file.type.startsWith("image/") ? "image" : "video",
      file_size: file.size,
      blob_pathname: uniqueFilename,
      thumbnail_url: thumbnailUrl,
    };

    console.log("[Upload] Attempting to save portfolio item:", portfolioItem);

    const { data, error } = await supabase
      .from("portfolio_items")
      .insert(portfolioItem)
      .select()
      .single();

    if (error) {
      console.error("[Upload] Database error details:", error);
      console.error("[Upload] Error code:", error.code);
      console.error("[Upload] Error message:", error.message);
      console.error("[Upload] Error details:", error.details);
      return NextResponse.json(
        { error: "Failed to save portfolio item", details: error.message },
        { status: 500 }
      );
    }

    console.log("[Upload] Portfolio item saved successfully:", data);

    return NextResponse.json({ success: true, item: data });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
