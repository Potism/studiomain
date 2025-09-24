import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    console.log("[Public Portfolio] Fetching portfolio items for gallery");

    const supabase = await createClient();

    const { data: items, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Public Portfolio] Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch portfolio items" },
        { status: 500 }
      );
    }

    console.log(
      `[Public Portfolio] Found ${items?.length || 0} portfolio items`
    );

    // Map database categories to gallery categories
    const categoryMapping: Record<string, string> = {
      "Studio Photography": "photo",
      "Product Photography": "photo",
      "Commercial Video": "video",
      "Event Photography": "events",
      "Portrait Photography": "photo",
      "Brand Photography": "photo",
      "Creative Content": "social",
    };

    const transformedItems =
      items?.map((item) => ({
        id: item.id,
        title: item.title,
        category: categoryMapping[item.category] || "photo", // Default to photo if not mapped
        type: item.file_type as "image" | "video",
        src:
          item.file_type === "video" && item.thumbnail_url
            ? item.thumbnail_url
            : item.file_url,
        description: item.description || "",
        tags: [item.category], // Use original category as tag
        created_at: item.created_at,
        is_featured: item.is_featured,
        sort_order: item.sort_order,
        thumbnail_url: item.thumbnail_url,
        original_file_url: item.file_url,
      })) || [];

    return NextResponse.json({
      success: true,
      items: transformedItems,
    });
  } catch (error) {
    console.error("[Public Portfolio] Error fetching portfolio items:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio items" },
      { status: 500 }
    );
  }
}
