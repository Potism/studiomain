import { del } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    console.log("[Portfolio Delete] Starting delete request");

    // Check admin authentication
    const token = request.cookies.get("admin-session")?.value;

    if (!token) {
      console.log("[Portfolio Delete] No admin session cookie");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the session data
    let sessionData;
    try {
      sessionData = JSON.parse(Buffer.from(token, "base64").toString());
    } catch (error) {
      console.log("[Portfolio Delete] Failed to decode session:", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - sessionData.timestamp;
    const maxAge = 24 * 60 * 60 * 1000;

    if (sessionAge > maxAge) {
      console.log("[Portfolio Delete] Session expired");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin role
    if (sessionData.role !== "admin") {
      console.log(
        "[Portfolio Delete] User role is not admin:",
        sessionData.role
      );
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "No item ID provided" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get item details including thumbnail URL
    const { data: item, error: fetchError } = await supabase
      .from("portfolio_items")
      .select("file_url, blob_pathname, thumbnail_url")
      .eq("id", id)
      .single();

    if (fetchError || !item) {
      return NextResponse.json(
        { error: "Portfolio item not found" },
        { status: 404 }
      );
    }

    try {
      // Delete main file from blob storage
      await del(item.file_url);

      // Delete thumbnail if it exists
      if (item.thumbnail_url) {
        await del(item.thumbnail_url);
      }
    } catch (blobError) {
      console.error(
        "[Portfolio Delete] Error deleting from blob storage:",
        blobError
      );
      // Continue with database deletion even if blob deletion fails
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from("portfolio_items")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("[Portfolio Delete] Database delete error:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete from database" },
        { status: 500 }
      );
    }

    console.log("[Portfolio Delete] Portfolio item deleted successfully:", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Portfolio Delete] Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// Keep the old DELETE method for backward compatibility
export async function DELETE(request: NextRequest) {
  return POST(request);
}
