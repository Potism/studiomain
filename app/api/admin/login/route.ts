import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    console.log("[v0] Attempting login for:", email);

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.user) {
      console.log("[v0] Auth error:", authError);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("[v0] Supabase auth successful, checking admin role...");

    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (adminError || !adminUser) {
      console.log("[v0] No admin user found for email:", email);
      return NextResponse.json(
        { error: "Access denied. Admin privileges required." },
        { status: 403 }
      );
    }

    if (adminUser.role !== "admin") {
      console.log("[v0] User role is not admin:", adminUser.role);
      return NextResponse.json(
        { error: "Access denied. Admin privileges required." },
        { status: 403 }
      );
    }

    console.log("[v0] Admin verification successful");

    const sessionData = {
      userId: authData.user.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
      timestamp: Date.now(),
    };

    const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString(
      "base64"
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
    });

    response.cookies.set("admin-session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/", // Ensure cookie is available for all admin routes
    });

    console.log(
      "[v0] Session cookie set with token length:",
      sessionToken.length
    );

    console.log("[v0] Session cookie set successfully");
    return response;
  } catch (error) {
    console.error("[v0] Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
