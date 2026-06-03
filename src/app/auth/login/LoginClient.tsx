"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
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
      if (authError) setError("Google sign in failed. Please try again.");
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
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#f4f7f7",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Montserrat', sans-serif",
    }}>

      {/* Logo */}
      <Link href="/" style={{ marginBottom: "2rem", display: "block" }}>
        <img
          src="/images/plungers-logo-dark.svg"
          alt="Plungers"
          style={{ height: "80px", width: "auto" }}
        />
      </Link>

      {/* Card */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        border: "1.5px solid #e0eeee",
        padding: "2.5rem 2.5rem",
        width: "100%",
        maxWidth: "480px",
        boxShadow: "0 4px 32px rgba(6,38,38,0.07)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: 900,
            color: "#062626",
            marginBottom: "0.5rem",
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Welcome Back
          </h1>
          <p style={{
            color: "rgba(6,38,38,0.5)",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}>
            Sign in to continue your journey
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            backgroundColor: "white",
            border: "1.5px solid #e0eeee",
            borderRadius: "12px",
            padding: "0.875rem 1.5rem",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#062626",
            cursor: "pointer",
            marginBottom: "1.75rem",
            fontFamily: "'Montserrat', sans-serif",
            transition: "all 0.2s",
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

          {/* Email */}
          <div>
            <label style={{
              display: "block",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#062626",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.5rem",
            }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={15} style={{
                position: "absolute", left: "14px",
                top: "50%", transform: "translateY(-50%)",
                color: "#006f6b",
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                placeholder="you@email.com"
                style={{
                  width: "100%",
                  paddingLeft: "2.5rem",
                  paddingRight: "1rem",
                  paddingTop: "0.875rem",
                  paddingBottom: "0.875rem",
                  backgroundColor: "#f4f7f7",
                  border: "1.5px solid #e0eeee",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  color: "#062626",
                  outline: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#062626",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}>
                Password
              </label>
              <Link href="/auth/forgot-password" style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#006f6b",
                textDecoration: "none",
              }}>
                Forgot Password?
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={15} style={{
                position: "absolute", left: "14px",
                top: "50%", transform: "translateY(-50%)",
                color: "#006f6b",
              }} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  paddingLeft: "2.5rem",
                  paddingRight: "3rem",
                  paddingTop: "0.875rem",
                  paddingBottom: "0.875rem",
                  backgroundColor: "#f4f7f7",
                  border: "1.5px solid #e0eeee",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  color: "#062626",
                  outline: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "14px",
                  top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", color: "rgba(6,38,38,0.35)",
                  display: "flex", alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              padding: "0.75rem 1rem",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "10px",
            }}>
              <p style={{ color: "#dc2626", fontSize: "0.8rem", fontWeight: 500 }}>{error}</p>
            </div>
          )}

          {/* Sign In Button */}
          <button
            onClick={handleEmailLogin}
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#062626",
              color: "white",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "1rem",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
              marginTop: "0.5rem",
              transition: "background-color 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#062626"}
          >
            {loading ? (
              <>
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          fontSize: "0.85rem",
          color: "rgba(6,38,38,0.5)",
          marginTop: "1.5rem",
          fontWeight: 500,
        }}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" style={{
            color: "#006f6b",
            fontWeight: 700,
            textDecoration: "none",
          }}>
            Create one free
          </Link>
        </p>
      </div>

      {/* Back to Plungers */}
      <Link href="/" style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginTop: "1.5rem",
        color: "rgba(6,38,38,0.4)",
        fontSize: "0.8rem",
        fontWeight: 600,
        textDecoration: "none",
        fontFamily: "'Montserrat', sans-serif",
        transition: "color 0.2s",
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