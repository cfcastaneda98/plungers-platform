"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleEmailLogin() {
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        setError("Google sign in failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleEmailLogin();
  }

  return (
    <main className="min-h-screen bg-[#f4fafa] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <img
              src="/images/plungers-logo-dark.svg"
              alt="Plungers"
              className="h-10 w-auto mx-auto mb-6"
            />
          </Link>
          <h1
            className="text-3xl font-black text-[#062626] mb-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Welcome back
          </h1>
          <p className="text-[#062626]/50 font-medium text-sm">
            Sign in to continue your journey
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#e0f0ef] shadow-sm overflow-hidden">
          <div className="p-8">

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border-2 border-[#e0f0ef] hover:border-[#006f6b] text-[#062626] font-bold py-3.5 rounded-xl transition-all duration-200 mb-6 disabled:opacity-60"
            >
              {googleLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                  <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
                  <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
                  <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z"/>
                </svg>
              )}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[#e0f0ef]" />
              <span className="text-xs font-bold text-[#062626]/30 uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-[#e0f0ef]" />
            </div>

            {/* Email */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="your@email.com"
                    className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-bold text-[#006f6b] hover:text-[#00534d] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                    className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-12 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#062626]/30 hover:text-[#062626]/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleEmailLogin}
                disabled={loading}
                className="w-full bg-[#006f6b] hover:bg-[#00534d] disabled:opacity-60 text-white font-black py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-[#f4fafa] border-t border-[#e0f0ef] text-center">
            <p className="text-sm font-medium text-[#062626]/50">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-[#006f6b] font-bold hover:text-[#00534d] transition-colors"
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6">
          <Link
            href="/"
            className="text-sm font-bold text-[#062626]/40 hover:text-[#062626]/60 transition-colors"
          >
            ← Back to Plungers
          </Link>
        </p>
      </div>
    </main>
  );
}