"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthWrapperProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export default function AdminAuthWrapper({
  children,
  loadingComponent,
}: AdminAuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("[AdminAuth] Verifying admin session...");

        const response = await fetch("/api/admin/verify", {
          credentials: "include",
        });

        console.log("[AdminAuth] Verify response status:", response.status);

        if (!response.ok) {
          console.log("[AdminAuth] Verification failed, redirecting to login");
          router.replace("/admin/login");
          return;
        }

        const result = await response.json();
        console.log("[AdminAuth] Verify result:", result);

        if (!result.success || result.user?.role !== "admin") {
          console.log("[AdminAuth] User is not admin, redirecting to login");
          router.replace("/admin/login");
          return;
        }

        setAdminUser(result.user);
        setIsAuthenticated(true);
        console.log(
          "[AdminAuth] Authentication successful for:",
          result.user.email
        );
      } catch (error) {
        console.error("[AdminAuth] Verification error:", error);
        router.replace("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  if (isLoading) {
    return (
      loadingComponent || (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-300 mt-4">Verifying authentication...</p>
          </div>
        </div>
      )
    );
  }

  if (!isAuthenticated || !adminUser) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}

// Hook to access admin user data
export function useAdminUser() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const getAdminUser = async () => {
      try {
        const response = await fetch("/api/admin/verify", {
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.user) {
            setAdminUser(result.user);
          }
        }
      } catch (error) {
        console.error("Failed to get admin user:", error);
      }
    };

    getAdminUser();
  }, []);

  return adminUser;
}

