"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2, Mail, Phone, Globe,
  MapPin, Tag, FileText, Check,
  Loader2, ArrowRight, Lock, Zap, PiggyBank
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ACTIVE_EXPERIENCE_CATEGORIES } from "@/lib/constants";
import PageHeaderBanner from "@/components/layout/PageHeaderBanner";

const COUNTRIES = [
  "United States", "Mexico", "Colombia", "Spain",
  "Thailand", "Croatia", "Brazil", "Argentina",
  "Peru", "Costa Rica", "Portugal", "Italy",
  "France", "Japan", "Indonesia", "Other",
];

const TRUST_BADGES = [
  { icon: Lock, title: "Secure & Private", desc: "Your data is protected and never shared" },
  { icon: Zap, title: "Quick Review", desc: "Applications reviewed within 3-5 business days" },
  { icon: PiggyBank, title: "Keep More Earnings", desc: "Competitive commission rates for all hosts" },
];

type FormStep = 1 | 2 | 3

const MAX_CATEGORIES = 3
const CATEGORY_SLOTS = [
  { label: "Primary Category", required: true, hint: "The category that best describes your experience" },
  { label: "Second Category", required: false, hint: "Optional" },
  { label: "Third Category", required: false, hint: "Optional" },
]

interface FormData {
  business_name: string
  categories: string[] // ordered by priority: [primary, ...secondary], max 3
  description: string
  email: string
  phone: string
  website: string
  city: string
  country: string
  address: string
}

const INITIAL_FORM: FormData = {
  business_name: "", categories: [], description: "",
  email: "", phone: "", website: "",
  city: "", country: "", address: "",
}

const STEPS = [
  { num: 1, label: "Business Info" },
  { num: 2, label: "Contact" },
  { num: 3, label: "Location" },
]

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
  fontFamily: "'Montserrat', sans-serif",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s",
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

const iconStyle = {
  position: "absolute" as const,
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#006f6b",
}

export default function ApplyClient() {
  const router = useRouter()
  const [step, setStep] = useState<FormStep>(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  function updateForm(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError("")
  }

  // Sets the category for a slot (0 = primary). Empty value clears the slot and
  // shifts lower-ranked picks up so the list never has gaps.
  function setCategoryAt(index: number, value: string) {
    setForm(prev => {
      const next = [...prev.categories]
      if (!value) {
        next.splice(index, 1)
      } else {
        next[index] = value
      }
      const deduped = next.filter((c, i) => c && next.indexOf(c) === i)
      return { ...prev, categories: deduped.slice(0, MAX_CATEGORIES) }
    })
    setError("")
  }

  function validateStep(): boolean {
    switch (step) {
      case 1:
        if (!form.business_name.trim()) { setError("Business name is required"); return false }
        if (form.categories.length === 0) { setError("Please select at least one category"); return false }
        if (!form.description.trim() || form.description.length < 50) { setError("Please provide a description of at least 50 characters"); return false }
        return true
      case 2:
        if (!form.email.trim() || !form.email.includes('@')) { setError("Please enter a valid email address"); return false }
        if (!form.phone.trim()) { setError("Phone number is required"); return false }
        return true
      case 3:
        if (!form.city.trim()) { setError("City is required"); return false }
        if (!form.country) { setError("Please select a country"); return false }
        return true
      default: return true
    }
  }

  function handleNext() {
    if (validateStep()) setStep(prev => (prev + 1) as FormStep)
  }

  async function handleSubmit() {
    if (!validateStep()) return
    setLoading(true)
    setError("")
    try {
      const { error: insertError } = await supabase.from('business_applications').insert([{
        business_name: form.business_name,
        // Legacy single-category column kept in sync with the primary category
        category: form.categories[0],
        primary_category: form.categories[0],
        secondary_categories: form.categories.slice(1),
        description: form.description,
        email: form.email,
        phone: form.phone,
        website: form.website || null,
        city: form.city,
        country: form.country,
        address: form.address || null,
        status: 'pending',
      }])
      if (insertError) throw insertError
      setSubmitted(true)
    } catch (err) {
      console.error('Application submit failed:', err)
      setError("We couldn't submit your application. Please try again in a moment.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#f4f7f7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      paddingTop: "100px",
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>

        {/* Check Icon */}
        <div style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,111,107,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 2rem",
        }}>
          <Check size={42} color="#006f6b" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(1.6rem, 4vw, 2rem)",
          fontWeight: 900,
          color: "#062626",
          marginBottom: "1rem",
          fontFamily: "'Montserrat', sans-serif",
          lineHeight: 1.2,
        }}>
          Application Submitted!
        </h1>

        {/* Description */}
        <p style={{
          color: "rgba(6,38,38,0.6)",
          fontWeight: 500,
          lineHeight: 1.7,
          marginBottom: "2.5rem",
          fontSize: "0.9rem",
          maxWidth: "360px",
          margin: "0 auto 2.5rem",
        }}>
          Thank you for applying to host on Plungers. Our team
          will review your application and get back to you within
          3-5 business days.
        </p>

        {/* What happens next */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          border: "1.5px solid #e0eeee",
          padding: "2rem",
          marginBottom: "2rem",
          textAlign: "left",
          boxShadow: "0 4px 24px rgba(6,38,38,0.05)",
        }}>
          <h3 style={{
            fontWeight: 900,
            color: "#062626",
            marginBottom: "1.5rem",
            fontSize: "1rem",
            fontFamily: "'Montserrat', sans-serif",
            textAlign: "center",
          }}>
            What happens next?
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              "Our team reviews your application",
              "We may reach out for additional information",
              "You'll receive an email with our decision",
              "Once approved, set up your Stripe account to receive payouts",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#062626",
                  color: "white",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}>
                  {i + 1}
                </div>
                <p style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgba(6,38,38,0.7)",
                  lineHeight: 1.5,
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home Button */}
        <Link
          href="/"
          style={{
            display: "block",
            width: "100%",
            backgroundColor: "#062626",
            color: "white",
            fontWeight: 700,
            fontSize: "0.95rem",
            padding: "1rem",
            borderRadius: "9999px",
            textDecoration: "none",
            fontFamily: "'Montserrat', sans-serif",
            textAlign: "center",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#062626"}
        >
          Back to Home
        </Link>

      </div>
    </main>
  )
}

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f4f7f7", fontFamily: "'Montserrat', sans-serif" }}>

      {/* Header (same banner treatment as Privacy / Terms) */}
      <PageHeaderBanner
        className="section-pad"
        imageUrl="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1920&q=80"
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ color: "#89e3d5", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>
            Become a Host
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, color: "white", fontFamily: "'Montserrat', sans-serif", marginBottom: "1rem" }}>
            List Your Experience
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
            Share your culture with travelers &nbsp;•&nbsp; Applications reviewed within 3-5 business days
          </p>
        </div>
      </PageHeaderBanner>

      {/* Progress Steps */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e0eeee", padding: "1.25rem 80px", position: "sticky", top: "72px", zIndex: 30 }}>
        <div style={{ maxWidth: "500px", margin: "0 auto", display: "flex", alignItems: "flex-start", gap: "0" }}>
          {STEPS.map((s, i) => (
            <div key={s.num} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  backgroundColor: step > s.num ? "#006f6b" : step === s.num ? "#062626" : "white",
                  border: step >= s.num ? "none" : "2px solid #d1d5db",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                }}>
                  {step > s.num ? (
                    <Check size={16} color="white" />
                  ) : (
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: step === s.num ? "white" : "#9ca3af" }}>
                      {s.num}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, color: step === s.num ? "#062626" : "#9ca3af", whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: "2px", backgroundColor: step > s.num ? "#006f6b" : "#e0eeee", marginTop: "20px", transition: "background-color 0.3s" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2.5rem 24px 4rem" }}>

        {/* Form Card */}
        <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1.5px solid #e0eeee", overflow: "hidden", marginBottom: "2rem", boxShadow: "0 4px 24px rgba(6,38,38,0.06)" }}>

          {/* Step 1 */}
          {step === 1 && (
            <div style={{ padding: "2.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#062626", marginBottom: "2rem", textAlign: "center", fontFamily: "'Montserrat', sans-serif" }}>
                Tell us about your business
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                {/* Business Name */}
                <div>
                  <label style={labelStyle}>Business Name *</label>
                  <div style={{ position: "relative" }}>
                    <Building2 size={15} style={iconStyle} />
                    <input
                      type="text"
                      value={form.business_name}
                      onChange={(e) => updateForm('business_name', e.target.value)}
                      placeholder="Your business or experience name"
                      style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
                    />
                  </div>
                </div>

                {/* Categories (ranked, 1-3) */}
                <div>
                  <label style={labelStyle}>Experience Categories *</label>
                  <p style={{ fontSize: "0.78rem", color: "rgba(6,38,38,0.55)", fontWeight: 500, lineHeight: 1.5, marginBottom: "0.85rem" }}>
                    Choose up to {MAX_CATEGORIES}, in order of importance. Your first pick is your primary category.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {CATEGORY_SLOTS.map((slot, i) => {
                      // A slot unlocks once the one above it is filled
                      const locked = i > form.categories.length
                      const value = form.categories[i] || ""
                      const taken = form.categories.filter((_, idx) => idx !== i)
                      return (
                        <div key={slot.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", opacity: locked ? 0.5 : 1, transition: "opacity 0.2s" }}>
                          <div style={{
                            width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                            backgroundColor: value ? "#006f6b" : "#e0eeee",
                            color: value ? "white" : "rgba(6,38,38,0.5)",
                            fontSize: "0.8rem", fontWeight: 800,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {i + 1}
                          </div>
                          <div style={{ position: "relative", flex: 1 }}>
                            <Tag size={15} style={iconStyle} />
                            <select
                              value={value}
                              disabled={locked}
                              onChange={(e) => setCategoryAt(i, e.target.value)}
                              aria-label={slot.label}
                              style={{ ...inputStyle, appearance: "none", cursor: locked ? "not-allowed" : "pointer" }}
                              onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                              onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
                            >
                              <option value="">
                                {slot.required ? "Select your primary category" : `${slot.label} (optional)`}
                              </option>
                              {ACTIVE_EXPERIENCE_CATEGORIES.filter((cat) => !taken.includes(cat)).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={labelStyle}>Describe Your Experience *</label>
                  <div style={{ position: "relative" }}>
                    <FileText size={15} style={{ ...iconStyle, top: "16px", transform: "none" }} />
                    <textarea
                      value={form.description}
                      onChange={(e) => updateForm('description', e.target.value)}
                      placeholder="Tell us about the experience you want to offer. What will guests do? What makes it unique? (min. 50 characters)"
                      rows={5}
                      style={{ ...inputStyle, paddingTop: "0.875rem", resize: "none" as const }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
                    />
                  </div>
                  <p style={{ fontSize: "0.72rem", color: "rgba(6,38,38,0.4)", fontWeight: 500, marginTop: "0.25rem" }}>
                    {form.description.length}/50 minimum characters
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ padding: "2.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#062626", marginBottom: "2rem", textAlign: "center", fontFamily: "'Montserrat', sans-serif" }}>
                Contact information
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                <div>
                  <label style={labelStyle}>Business Email *</label>
                  <div style={{ position: "relative" }}>
                    <Mail size={15} style={iconStyle} />
                    <input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="your@email.com" style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <div style={{ position: "relative" }}>
                    <Phone size={15} style={iconStyle} />
                    <input type="tel" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="+1 (555) 000-0000" style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Website <span style={{ textTransform: "none", fontWeight: 400, color: "rgba(6,38,38,0.4)" }}>(optional)</span></label>
                  <div style={{ position: "relative" }}>
                    <Globe size={15} style={iconStyle} />
                    <input type="url" value={form.website} onChange={(e) => updateForm('website', e.target.value)} placeholder="https://yourwebsite.com" style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={{ padding: "2.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#062626", marginBottom: "2rem", textAlign: "center", fontFamily: "'Montserrat', sans-serif" }}>
                Where are you located?
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                <div>
                  <label style={labelStyle}>Country *</label>
                  <div style={{ position: "relative" }}>
                    <Globe size={15} style={iconStyle} />
                    <select value={form.country} onChange={(e) => updateForm('country', e.target.value)} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}>
                      <option value="">Select a country</option>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>City *</label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={15} style={iconStyle} />
                    <input type="text" value={form.city} onChange={(e) => updateForm('city', e.target.value)} placeholder="Your city" style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Address <span style={{ textTransform: "none", fontWeight: 400, color: "rgba(6,38,38,0.4)" }}>(optional)</span></label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={15} style={{ ...iconStyle, top: "16px", transform: "none" }} />
                    <textarea value={form.address} onChange={(e) => updateForm('address', e.target.value)} placeholder="Street address or general area" rows={3} style={{ ...inputStyle, paddingTop: "0.875rem", resize: "none" as const }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"} />
                  </div>
                </div>

                {/* Summary */}
                <div style={{ backgroundColor: "#f4f7f7", borderRadius: "12px", border: "1.5px solid #e0eeee", padding: "1.25rem" }}>
                  <h4 style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#062626", marginBottom: "1rem" }}>
                    Application Summary
                  </h4>
                  {[
                    { label: "Business", value: form.business_name },
                    { label: form.categories.length > 1 ? "Categories" : "Category", value: form.categories.map((c, i) => `${i + 1}. ${c}`).join("  ·  ") },
                    { label: "Email", value: form.email },
                    { label: "Phone", value: form.phone },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "rgba(6,38,38,0.5)", fontWeight: 500 }}>{item.label}</span>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#062626", textAlign: "right" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ margin: "0 2.5rem 1rem", padding: "0.75rem 1rem", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px" }}>
              <p style={{ color: "#dc2626", fontSize: "0.8rem", fontWeight: 500 }}>{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div style={{ padding: "1.25rem 2.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {step > 1 ? (
              <button
                onClick={() => setStep(prev => (prev - 1) as FormStep)}
                style={{ background: "none", border: "1.5px solid #e0eeee", borderRadius: "9999px", padding: "0.75rem 1.75rem", fontSize: "0.875rem", fontWeight: 600, color: "#062626", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", transition: "all 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
              >
                ← Back
              </button>
            ) : (
              <Link href="/" style={{ background: "none", border: "none", fontSize: "0.875rem", fontWeight: 600, color: "rgba(6,38,38,0.5)", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", textDecoration: "none" }}>
                Cancel
              </Link>
            )}

            {step < 3 ? (
              <button
                onClick={handleNext}
                style={{ backgroundColor: "#062626", color: "white", border: "none", borderRadius: "9999px", padding: "0.875rem 2.25rem", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat', sans-serif", display: "flex", alignItems: "center", gap: "0.5rem", transition: "background-color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#062626"}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ backgroundColor: "#062626", color: "white", border: "none", borderRadius: "9999px", padding: "0.875rem 2.25rem", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat', sans-serif", display: "flex", alignItems: "center", gap: "0.5rem", opacity: loading ? 0.7 : 1, transition: "background-color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#062626"}
              >
                {loading ? <><Loader2 size={16} /> Submitting...</> : <>Submit Application <Check size={16} /></>}
              </button>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="trust-badges-grid" style={{ gap: "1rem" }}>
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                style={{ backgroundColor: "white", borderRadius: "16px", border: "1.5px solid #e0eeee", padding: "1.75rem 1.5rem", textAlign: "center" }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", backgroundColor: "#062626", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <Icon size={22} color="white" />
                </div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#062626", marginBottom: "0.4rem", fontFamily: "'Montserrat', sans-serif" }}>
                  {badge.title}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "rgba(6,38,38,0.5)", fontWeight: 500, lineHeight: 1.5 }}>
                  {badge.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}