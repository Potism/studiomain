"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Camera, Video, Palette } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const loginResponse = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("[v0] Login response status:", loginResponse.status);

      if (loginResponse.ok) {
        const result = await loginResponse.json();
        console.log("[v0] Login result:", result);

        if (result.success && result.user && result.user.role === "admin") {
          console.log("[v0] Redirecting to admin dashboard...");
          setTimeout(() => {
            window.location.href = "/admin";
          }, 300);
        } else {
          console.log("[v0] Access denied - result:", result);
          setError("Access denied. Admin privileges required.");
        }
      } else {
        const errorData = await loginResponse.json();
        console.log("[v0] Login failed:", errorData);
        setError(errorData.error || "Failed to create admin session");
      }
    } catch (error) {
      console.log("[v0] Login error:", error);
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Left side - only visible on desktop */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C6FF3A]/5 via-transparent to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#C6FF3A] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-xl">PS</span>
            </div>
            <span className="text-3xl font-bold text-white">
              Perspective Studio
            </span>
          </div>

          <div className="mt-16">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Creative
              <br />
              <span className="text-[#C6FF3A]">Control Center</span>
            </h1>
            <p className="text-neutral-300 mt-6 text-lg max-w-md leading-relaxed">
              Manage your creative agency's portfolio, services, and client
              projects from one powerful dashboard.
            </p>

            <div className="flex gap-6 mt-8">
              <div className="flex items-center gap-2 text-neutral-400">
                <Camera className="w-5 h-5" />
                <span className="text-sm">Photography</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Video className="w-5 h-5" />
                <span className="text-sm">Videography</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Palette className="w-5 h-5" />
                <span className="text-sm">Design</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">
              Portfolio Management
            </h3>
            <p className="text-neutral-400 text-sm">
              Upload and organize your creative work with our integrated
              portfolio system.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-b from-neutral-950 to-black">
        {/* Mobile header - only visible on mobile */}
        <div className="flex md:hidden items-center gap-3 mb-12 w-full">
          <div className="w-10 h-10 bg-[#C6FF3A] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-lg">PS</span>
          </div>
          <span className="text-2xl font-semibold text-white">
            Perspective Studio
          </span>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Welcome Back</h2>
            <p className="text-neutral-400 text-lg">
              Sign in to access your creative dashboard
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl flex items-center gap-3">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-neutral-200 text-sm font-medium"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@perspectivestudio.com"
                  className="bg-black/50 border-neutral-700 text-white placeholder:text-neutral-500 h-12 rounded-xl focus:border-[#C6FF3A] focus:ring-[#C6FF3A]/20"
                  required
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-neutral-200 text-sm font-medium"
                  >
                    Password
                  </Label>
                  <button
                    type="button"
                    className="text-sm text-[#C6FF3A] hover:text-[#C6FF3A]/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-black/50 border-neutral-700 text-white placeholder:text-neutral-500 h-12 rounded-xl focus:border-[#C6FF3A] focus:ring-[#C6FF3A]/20"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90 h-12 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-500 text-sm">
              Need assistance?{" "}
              <a
                href="mailto:support@perspectivestudio.com"
                className="text-[#C6FF3A] hover:text-[#C6FF3A]/80 transition-colors font-medium"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
