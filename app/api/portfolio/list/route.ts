import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    console.log("[Portfolio List] Fetching portfolio items for admin");

    // Check admin authentication
    const token = request.cookies.get("admin-session")?.value;

    if (!token) {
      console.log("[Portfolio List] No admin session cookie");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the session data
    let sessionData;
    try {
      sessionData = JSON.parse(Buffer.from(token, "base64").toString());
    } catch (error) {
      console.log("[Portfolio List] Failed to decode session:", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - sessionData.timestamp;
    const maxAge = 24 * 60 * 60 * 1000;

    if (sessionAge > maxAge) {
      console.log("[Portfolio List] Session expired");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin role
    if (sessionData.role !== "admin") {
      console.log("[Portfolio List] User role is not admin:", sessionData.role);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    const { data: items, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Portfolio List] Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch portfolio items" },
        { status: 500 }
      );
    }

    console.log(`[Portfolio List] Found ${items?.length || 0} portfolio items`);

    return NextResponse.json({
      success: true,
      items: items || [],
    });
  } catch (error) {
    console.error("[Portfolio List] Error fetching portfolio items:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio items" },
      { status: 500 }
    );
  }
}
