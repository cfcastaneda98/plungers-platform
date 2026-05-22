"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail, Lock, User, Loader2,
  Eye, EyeOff, Check
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type AccountType = "traveler" | "business";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export default function RegisterClient() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("traveler");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordStrength = PASSWORD_RULES.filter(r => r.test(password)).length;

  async function handleRegister() {
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (passwordStrength < 3) {
      setError("Please meet all password requirements");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: accountType,
          },
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          setError("An account with this email already exists.");
        } else {
          setError(authError.message);
        }
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleRegister() {
    setGoogleLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (authError) {
        setError("Google sign up failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  // Success state
  if (success) {
    return (
      <main className="min-h-screen bg-[#f4fafa] flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-[#006f6b]/10 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#006f6b]" />
          </div>
          <h1
            className="text-3xl font-black text-[#062626] mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Check your email!
          </h1>
          <p className="text-[#062626]/60 font-medium leading-relaxed mb-8">
            We sent a confirmation link to{" "}
            <span className="font-bold text-[#062626]">{email}</span>.
            Click it to activate your account.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 bg-[#006f6b] hover:bg-[#00534d] text-white font-black px-8 py-4 rounded-full transition-colors"
          >
            Go to Sign In
          </Link>
        </div>
      </main>
    );
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
            Create your account
          </h1>
          <p className="text-[#062626]/50 font-medium text-sm">
            Join the Plungers community today
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#e0f0ef] shadow-sm overflow-hidden">
          <div className="p-8">

            {/* Account Type Toggle */}
            <div className="mb-6">
              <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-3 block">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: "traveler" as AccountType, label: "Book Experiences", icon: "🌍" },
                  { type: "business" as AccountType, label: "Host Experiences", icon: "🏡" },
                ].map((opt) => (
                  <button
                    key={opt.type}
                    onClick={() => setAccountType(opt.type)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                      accountType === opt.type
                        ? "border-[#006f6b] bg-[#006f6b]/5"
                        : "border-[#e0f0ef] hover:border-[#006f6b]/50"
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span
                      className={`text-xs font-black ${
                        accountType === opt.type
                          ? "text-[#006f6b]"
                          : "text-[#062626]/60"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleRegister}
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

            {/* Form Fields */}
            <div className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                  />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      setError("")
                    }}
                    placeholder="Your full name"
                    className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
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
                    placeholder="your@email.com"
                    className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                  Password
                </label>
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

                {/* Password Strength */}
                {password.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 h-1 rounded-full transition-all ${
                            passwordStrength >= level
                              ? level === 1
                                ? "bg-red-400"
                                : level === 2
                                ? "bg-yellow-400"
                                : "bg-[#006f6b]"
                              : "bg-[#e0f0ef]"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="space-y-1">
                      {PASSWORD_RULES.map((rule) => (
                        <div
                          key={rule.label}
                          className="flex items-center gap-2"
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                              rule.test(password)
                                ? "bg-[#006f6b]"
                                : "bg-[#e0f0ef]"
                            }`}
                          >
                            {rule.test(password) && (
                              <Check size={10} className="text-white" />
                            )}
                          </div>
                          <span
                            className={`text-xs font-medium transition-colors ${
                              rule.test(password)
                                ? "text-[#006f6b]"
                                : "text-[#062626]/40"
                            }`}
                          >
                            {rule.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-[#006f6b] hover:bg-[#00534d] disabled:opacity-60 text-white font-black py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-xs text-[#062626]/40 font-medium">
                By creating an account you agree to our{" "}
                <Link href="/" className="text-[#006f6b] font-bold">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/" className="text-[#006f6b] font-bold">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-[#f4fafa] border-t border-[#e0f0ef] text-center">
            <p className="text-sm font-medium text-[#062626]/50">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#006f6b] font-bold hover:text-[#00534d] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

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