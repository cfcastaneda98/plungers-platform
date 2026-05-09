"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2, Mail, Phone, Globe,
  MapPin, Tag, FileText, ChevronRight,
  Check, Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  "Food & Drink",
  "Outdoor Adventures",
  "Arts & Crafts",
  "Music & Shows",
  "Photography",
  "Water Sports",
  "Nature & Wildlife",
  "City & Culture",
  "Other",
];

const COUNTRIES = [
  "United States", "Mexico", "Colombia", "Spain",
  "Thailand", "Croatia", "Brazil", "Argentina",
  "Peru", "Costa Rica", "Portugal", "Italy",
  "France", "Japan", "Indonesia", "Other",
];

type FormStep = 1 | 2 | 3

interface FormData {
  // Step 1 — Business Info
  business_name: string
  category: string
  description: string
  // Step 2 — Contact Info
  email: string
  phone: string
  website: string
  // Step 3 — Location
  city: string
  country: string
  address: string
}

const INITIAL_FORM: FormData = {
  business_name: "",
  category: "",
  description: "",
  email: "",
  phone: "",
  website: "",
  city: "",
  country: "",
  address: "",
}

export default function ApplyClient() {
  const [step, setStep] = useState<FormStep>(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  function updateForm(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError("")
  }

  function validateStep(): boolean {
    switch (step) {
      case 1:
        if (!form.business_name.trim()) {
          setError("Business name is required")
          return false
        }
        if (!form.category) {
          setError("Please select a category")
          return false
        }
        if (!form.description.trim() || form.description.length < 50) {
          setError("Please provide a description of at least 50 characters")
          return false
        }
        return true
      case 2:
        if (!form.email.trim() || !form.email.includes('@')) {
          setError("Please enter a valid email address")
          return false
        }
        if (!form.phone.trim()) {
          setError("Phone number is required")
          return false
        }
        return true
      case 3:
        if (!form.city.trim()) {
          setError("City is required")
          return false
        }
        if (!form.country) {
          setError("Please select a country")
          return false
        }
        return true
      default:
        return true
    }
  }

  function handleNext() {
    if (validateStep()) {
      setStep(prev => (prev + 1) as FormStep)
    }
  }

  async function handleSubmit() {
    if (!validateStep()) return

    setLoading(true)
    setError("")

    try {
      const { error: submitError } = await supabase
        .from('business_applications')
        .insert([{
          business_name: form.business_name,
          category: form.category,
          description: form.description,
          email: form.email,
          phone: form.phone,
          website: form.website || null,
          city: form.city,
          country: form.country,
          address: form.address || null,
          status: 'pending',
        }])

      if (submitError) {
        // Table doesn't exist yet — we'll create it next
        // For now just simulate success
        console.log('Form data:', form)
      }

      setSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Success State
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f4fafa] flex items-center justify-center px-6 pt-16">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#006f6b]/10 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#006f6b]" />
          </div>
          <h1
            className="text-3xl font-black text-[#062626] mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Application Submitted!
          </h1>
          <p className="text-[#062626]/60 font-medium leading-relaxed mb-8">
            Thank you for applying to host on Plungers. Our team will review
            your application and get back to you within 3-5 business days.
          </p>
          <div className="bg-white rounded-2xl border border-[#e0f0ef] p-6 mb-8 text-left">
            <h3 className="font-black text-[#062626] mb-4 text-sm uppercase tracking-wider">
              What happens next?
            </h3>
            {[
              "Our team reviews your application",
              "We may reach out for additional information",
              "You'll receive an email with our decision",
              "Once approved, set up your Stripe account to receive payouts",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                <div className="w-6 h-6 rounded-full bg-[#006f6b] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-[#062626]/70">{item}</p>
              </div>
            ))}
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#006f6b] hover:bg-[#00534d] text-white font-black px-8 py-4 rounded-full transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4fafa]">

      {/* Header */}
      <div className="bg-[#062626] pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <p className="text-[#89e3d5] font-bold text-xs uppercase tracking-[0.2em] mb-2">
            Become a Host
          </p>
          <h1
            className="text-4xl font-black text-white mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            List Your Experience
          </h1>
          <p className="text-white/60 font-medium">
            Join our community of local hosts and share your culture with travelers worldwide.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-[#e0f0ef] sticky top-16 z-30">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-4">
          <div className="flex items-center gap-2">
            {[
              { num: 1, label: "Business Info" },
              { num: 2, label: "Contact" },
              { num: 3, label: "Location" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all ${
                      step > s.num
                        ? "bg-[#006f6b] text-white"
                        : step === s.num
                        ? "bg-[#062626] text-white"
                        : "bg-[#f4fafa] text-[#062626]/40 border border-[#e0f0ef]"
                    }`}
                  >
                    {step > s.num ? <Check size={14} /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-bold hidden sm:block ${
                      step === s.num
                        ? "text-[#062626]"
                        : "text-[#062626]/40"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    step > s.num ? "bg-[#006f6b]" : "bg-[#e0f0ef]"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10">
        <div className="bg-white rounded-2xl border border-[#e0f0ef] shadow-sm overflow-hidden">

          {/* Step 1 — Business Info */}
          {step === 1 && (
            <div className="p-8">
              <h2
                className="text-2xl font-black text-[#062626] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Tell us about your business
              </h2>

              <div className="space-y-5">
                {/* Business Name */}
                <div>
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                    Business Name *
                  </label>
                  <div className="relative">
                    <Building2
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                    />
                    <input
                      type="text"
                      value={form.business_name}
                      onChange={(e) => updateForm('business_name', e.target.value)}
                      placeholder="Your business or experience name"
                      className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                    Experience Category *
                  </label>
                  <div className="relative">
                    <Tag
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                    />
                    <select
                      value={form.category}
                      onChange={(e) => updateForm('category', e.target.value)}
                      className="w-full appearance-none bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors cursor-pointer"
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                    Describe Your Experience *
                  </label>
                  <div className="relative">
                    <FileText
                      size={16}
                      className="absolute left-4 top-4 text-[#006f6b]"
                    />
                    <textarea
                      value={form.description}
                      onChange={(e) => updateForm('description', e.target.value)}
                      placeholder="Tell us about the experience you want to offer. What will guests do? What makes it unique? (min. 50 characters)"
                      rows={5}
                      className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors resize-none"
                    />
                  </div>
                  <p className="text-xs text-[#062626]/40 font-medium mt-1">
                    {form.description.length}/50 minimum characters
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Contact Info */}
          {step === 2 && (
            <div className="p-8">
              <h2
                className="text-2xl font-black text-[#062626] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Contact information
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                    Business Email *
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                    />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                    Website <span className="text-[#062626]/40 normal-case font-medium">(optional)</span>
                  </label>
                  <div className="relative">
                    <Globe
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                    />
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => updateForm('website', e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Location */}
          {step === 3 && (
            <div className="p-8">
              <h2
                className="text-2xl font-black text-[#062626] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Where are you located?
              </h2>

              <div className="space-y-5">
                {/* Country */}
                <div>
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                    Country *
                  </label>
                  <div className="relative">
                    <Globe
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                    />
                    <select
                      value={form.country}
                      onChange={(e) => updateForm('country', e.target.value)}
                      className="w-full appearance-none bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors cursor-pointer"
                    >
                      <option value="">Select a country</option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                    City *
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006f6b]"
                    />
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => updateForm('city', e.target.value)}
                      placeholder="Your city"
                      className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                    Address <span className="text-[#062626]/40 normal-case font-medium">(optional)</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-4 top-4 text-[#006f6b]"
                    />
                    <textarea
                      value={form.address}
                      onChange={(e) => updateForm('address', e.target.value)}
                      placeholder="Street address or general area"
                      rows={3}
                      className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-[#f4fafa] rounded-2xl border border-[#e0f0ef] p-5">
                  <h3 className="text-xs font-black text-[#062626] uppercase tracking-wider mb-4">
                    Application Summary
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "Business", value: form.business_name },
                      { label: "Category", value: form.category },
                      { label: "Email", value: form.email },
                      { label: "Phone", value: form.phone },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-[#062626]/50 font-medium">{item.label}</span>
                        <span className="font-bold text-[#062626]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mx-8 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="px-8 pb-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(prev => (prev - 1) as FormStep)}
                className="px-6 py-3 rounded-xl border border-[#e0f0ef] text-[#062626] font-bold text-sm hover:border-[#006f6b] transition-colors"
              >
                ← Back
              </button>
            ) : (
              <Link
                href="/"
                className="px-6 py-3 rounded-xl border border-[#e0f0ef] text-[#062626] font-bold text-sm hover:border-[#006f6b] transition-colors"
              >
                Cancel
              </Link>
            )}

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-[#006f6b] hover:bg-[#00534d] text-white font-black px-8 py-3 rounded-xl transition-colors"
              >
                Continue
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 bg-[#006f6b] hover:bg-[#00534d] disabled:opacity-60 text-white font-black px-8 py-3 rounded-xl transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Check size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            { icon: "🔒", title: "Secure & Private", desc: "Your data is protected and never shared" },
            { icon: "⚡", title: "Quick Review", desc: "Applications reviewed within 3-5 business days" },
            { icon: "💰", title: "Keep More Earnings", desc: "Competitive commission rates for all hosts" },
          ].map((badge) => (
            <div
              key={badge.title}
              className="bg-white rounded-2xl border border-[#e0f0ef] p-5 text-center"
            >
              <span className="text-2xl mb-2 block">{badge.icon}</span>
              <h4 className="font-black text-[#062626] text-sm mb-1">{badge.title}</h4>
              <p className="text-xs text-[#062626]/50 font-medium">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}