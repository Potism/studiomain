import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    console.log("[Portfolio Update] Starting update request");

    // Check admin authentication
    const token = request.cookies.get("admin-session")?.value;

    if (!token) {
      console.log("[Portfolio Update] No admin session cookie");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the session data
    let sessionData;
    try {
      sessionData = JSON.parse(Buffer.from(token, "base64").toString());
    } catch (error) {
      console.log("[Portfolio Update] Failed to decode session:", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - sessionData.timestamp;
    const maxAge = 24 * 60 * 60 * 1000;

    if (sessionAge > maxAge) {
      console.log("[Portfolio Update] Session expired");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin role
    if (sessionData.role !== "admin") {
      console.log(
        "[Portfolio Update] User role is not admin:",
        sessionData.role
      );
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title, description, category, is_featured, sort_order } =
      await request.json();

    if (!id || !title || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("portfolio_items")
      .update({
        title,
        description,
        category,
        is_featured,
        sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[Portfolio Update] Database error:", error);
      return NextResponse.json(
        { error: "Failed to update portfolio item" },
        { status: 500 }
      );
    }

    console.log(
      "[Portfolio Update] Portfolio item updated successfully:",
      data
    );

    return NextResponse.json({ success: true, item: data });
  } catch (error) {
    console.error("[Portfolio Update] Update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

