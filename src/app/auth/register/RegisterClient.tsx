"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail, Lock, User, Loader2,
  Eye, EyeOff, Check, ArrowLeft,
  Globe, Home
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type AccountType = "traveler" | "business";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

const font = "'Montserrat', sans-serif"

const inputStyle = {
  width: "100%",
  paddingLeft: "2.75rem",
  paddingRight: "1rem",
  paddingTop: "0.875rem",
  paddingBottom: "0.875rem",
  backgroundColor: "#f4f7f7",
  border: "1.5px solid #e0eeee",
  borderRadius: "12px",
  fontSize: "0.875rem",
  color: "#062626",
  outline: "none",
  fontFamily: font,
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s",
}

const iconStyle = {
  position: "absolute" as const,
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#006f6b",
}

const labelStyle = {
  display: "block",
  fontSize: "0.7rem",
  fontWeight: 700,
  color: "#062626",
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
  marginBottom: "0.5rem",
}

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
    if (!fullName.trim()) { setError("Please enter your full name"); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email address"); return; }
    if (passwordStrength < 3) { setError("Please meet all password requirements"); return; }

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim(), role: accountType },
        },
      });

      if (authError) {
        setError(authError.message.includes("already registered")
          ? "An account with this email already exists."
          : authError.message);
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
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });
      if (authError) setError("Google sign up failed. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  // Success state
  if (success) {
    return (
      <main style={{
        minHeight: "100vh", backgroundColor: "#f4f7f7",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", fontFamily: font,
      }}>
        <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
          <div style={{
            width: "88px", height: "88px", borderRadius: "50%",
            backgroundColor: "rgba(0,111,107,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}>
            <Check size={44} color="#006f6b" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#062626", marginBottom: "0.875rem", fontFamily: font }}>
            Check your email!
          </h1>
          <p style={{ color: "rgba(6,38,38,0.55)", fontWeight: 500, lineHeight: 1.7, marginBottom: "2rem", fontSize: "0.9rem" }}>
            We sent a confirmation link to{" "}
            <span style={{ fontWeight: 700, color: "#062626" }}>{email}</span>.
            Click it to activate your account.
          </p>
          <Link href="/auth/login" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            backgroundColor: "#006f6b", color: "white", fontWeight: 700,
            fontSize: "0.9rem", padding: "1rem 2.5rem", borderRadius: "9999px",
            textDecoration: "none", fontFamily: font,
          }}>
            Go to Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: "100vh", backgroundColor: "#f4f7f7",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "24px", fontFamily: font,
    }}>

      {/* Logo */}
      <Link href="/" style={{ marginBottom: "2rem", display: "block" }}>
        <img
          src="/images/plungers-logo-dark.svg"
          alt="Plungers"
          style={{ height: "40px", width: "auto" }}
        />
      </Link>

      {/* Card */}
      <div style={{
        backgroundColor: "white", borderRadius: "20px",
        border: "1.5px solid #e0eeee", padding: "2.5rem",
        width: "100%", maxWidth: "480px",
        boxShadow: "0 4px 32px rgba(6,38,38,0.07)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#062626", marginBottom: "0.5rem", fontFamily: font }}>
            Create your account
          </h1>
          <p style={{ color: "rgba(6,38,38,0.5)", fontSize: "0.875rem", fontWeight: 500 }}>
            Join the Plungers community today
          </p>
        </div>

        {/* Account Type Toggle */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={labelStyle}>I want to</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { type: "traveler" as AccountType, label: "Book Experiences", Icon: Globe },
              { type: "business" as AccountType, label: "Host Experiences", Icon: Home },
            ].map((opt) => (
              <button
                key={opt.type}
                onClick={() => setAccountType(opt.type)}
                style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "0.75rem",
                  padding: "1.25rem 1rem", borderRadius: "14px",
                  border: accountType === opt.type ? "none" : "1.5px solid #e0eeee",
                  backgroundColor: accountType === opt.type ? "#062626" : "white",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  backgroundColor: accountType === opt.type ? "#006f6b" : "#f4f7f7",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background-color 0.2s",
                }}>
                  <opt.Icon size={22} color={accountType === opt.type ? "white" : "#8a9e9e"} />
                </div>
                <span style={{
                  fontSize: "0.85rem", fontWeight: 800,
                  color: accountType === opt.type ? "white" : "rgba(6,38,38,0.6)",
                  fontFamily: font,
                }}>
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
          style={{
            width: "100%", display: "flex", alignItems: "center",
            justifyContent: "center", gap: "0.75rem",
            backgroundColor: "white", border: "1.5px solid #e0eeee",
            borderRadius: "12px", padding: "0.875rem 1.5rem",
            fontSize: "0.9rem", fontWeight: 600, color: "#062626",
            cursor: "pointer", marginBottom: "1.75rem",
            fontFamily: font, transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#006f6b";
            e.currentTarget.style.backgroundColor = "#f4fafa";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e0eeee";
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          {googleLoading ? (
            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
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
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#e0eeee" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(6,38,38,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>or</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#e0eeee" }} />
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Full Name */}
          <div>
            <label style={labelStyle}>Full Name</label>
            <div style={{ position: "relative" }}>
              <User size={15} style={iconStyle} />
              <input
                type="text" value={fullName}
                onChange={(e) => { setFullName(e.target.value); setError(""); }}
                placeholder="Your full name" style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={15} style={iconStyle} />
              <input
                type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="you@email.com" style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={15} style={iconStyle} />
              <input
                type={showPassword ? "text" : "password"} value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: "3rem" }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer",
                  color: "rgba(6,38,38,0.35)", display: "flex", alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Strength */}
            {password.length > 0 && (
              <div style={{ marginTop: "0.75rem" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "0.5rem" }}>
                  {[1, 2, 3].map((level) => (
                    <div key={level} style={{
                      flex: 1, height: "3px", borderRadius: "9999px",
                      backgroundColor: passwordStrength >= level
                        ? level === 1 ? "#ef4444" : level === 2 ? "#f59e0b" : "#006f6b"
                        : "#e0eeee",
                      transition: "background-color 0.2s",
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {PASSWORD_RULES.map((rule) => (
                    <div key={rule.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{
                        width: "16px", height: "16px", borderRadius: "50%",
                        backgroundColor: rule.test(password) ? "#006f6b" : "#e0eeee",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background-color 0.2s", flexShrink: 0,
                      }}>
                        {rule.test(password) && <Check size={9} color="white" />}
                      </div>
                      <span style={{
                        fontSize: "0.72rem", fontWeight: 500,
                        color: rule.test(password) ? "#006f6b" : "rgba(6,38,38,0.4)",
                        transition: "color 0.2s",
                      }}>
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
            <div style={{ padding: "0.75rem 1rem", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px" }}>
              <p style={{ color: "#dc2626", fontSize: "0.8rem", fontWeight: 500 }}>{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: "100%", backgroundColor: "#062626", color: "white",
              fontWeight: 700, fontSize: "0.95rem", padding: "1rem",
              borderRadius: "12px", border: "none", cursor: "pointer",
              fontFamily: font, marginTop: "0.5rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              opacity: loading ? 0.7 : 1, transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#062626"}
          >
            {loading ? (
              <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Creating account...</>
            ) : (
              "Create Account"
            )}
          </button>

          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(6,38,38,0.4)", fontWeight: 500 }}>
            By creating an account you agree to our{" "}
            <Link href="/" style={{ color: "#006f6b", fontWeight: 700, textDecoration: "none" }}>Terms of Service</Link>
            {" "}and{" "}
            <Link href="/" style={{ color: "#006f6b", fontWeight: 700, textDecoration: "none" }}>Privacy Policy</Link>
          </p>
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(6,38,38,0.5)", marginTop: "1.5rem", fontWeight: 500 }}>
          Already have an account?{" "}
          <Link href="/auth/login" style={{ color: "#006f6b", fontWeight: 700, textDecoration: "none" }}>
            Sign In
          </Link>
        </p>
      </div>

      {/* Back to Plungers */}
      <Link
        href="/"
        style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          marginTop: "1.5rem", color: "rgba(6,38,38,0.4)",
          fontSize: "0.8rem", fontWeight: 600,
          textDecoration: "none", fontFamily: font, transition: "color 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "#062626"}
        onMouseLeave={(e) => e.currentTarget.style.color = "rgba(6,38,38,0.4)"}
      >
        <ArrowLeft size={14} />
        Back to Plungers
      </Link>

    </main>
  );
}