import jwt from "jsonwebtoken";

export interface AdminUser {
  userId: string;
  email: string;
  name: string;
  role?: string; // Add role to interface
}

export function verifyAdminToken(token: string): AdminUser | null {
  try {
    console.log(
      "[v0] Verifying token with secret:",
      process.env.JWT_SECRET ? "Secret exists" : "No secret"
    );
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret-key"
    ) as AdminUser;
    console.log("[v0] Token verified successfully:", decoded.email);
    return decoded;
  } catch (error) {
    console.log("[v0] Token verification failed:", error);
    return null;
  }
}

export function getAdminFromCookie(
  cookieHeader: string | null
): AdminUser | null {
  console.log(
    "[Auth] Cookie header received:",
    cookieHeader ? "Present" : "Missing"
  );

  if (!cookieHeader) {
    console.log("[Auth] No cookie header provided");
    return null;
  }

  const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
    const parts = cookie.trim().split("=");
    const key = parts.shift() || "";
    const value = parts.join("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  console.log("[Auth] Parsed cookies:", Object.keys(cookies));

  const sessionToken = cookies["admin-session"];
  if (!sessionToken) {
    console.log("[Auth] No admin-session cookie found");
    return null;
  }

  console.log("[Auth] Session token found, length:", sessionToken.length);

  try {
    // Decode base64 session data (Node runtime here is fine)
    const sessionData = JSON.parse(
      Buffer.from(sessionToken, "base64").toString()
    );

    console.log(
      "[Auth] Session decoded successfully for user:",
      sessionData.email
    );

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - sessionData.timestamp;
    const maxAge = 24 * 60 * 60 * 1000;

    if (sessionAge > maxAge) {
      console.log("[Auth] Session expired, age:", sessionAge, "max:", maxAge);
      return null;
    }

    // Check if user has admin role
    if (sessionData.role !== "admin") {
      console.log("[Auth] User role is not admin:", sessionData.role);
      return null;
    }

    console.log("[Auth] Session validation successful");

    return {
      userId: sessionData.userId || sessionData.id,
      email: sessionData.email,
      name: sessionData.name,
      role: sessionData.role,
    };
  } catch (error) {
    console.log("[Auth] Session verification failed:", error);
    return null;
  }
}
