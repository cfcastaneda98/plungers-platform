"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Star, Loader2, Check, X } from "lucide-react";

interface WriteReviewProps {
  experienceId: string
  experienceTitle: string
}

const font = "'Montserrat', sans-serif"

export default function WriteReview({ experienceId, experienceTitle }: WriteReviewProps) {
  const [eligibleBookingId, setEligibleBookingId] = useState<string | null>(null)
  const [alreadyReviewed, setAlreadyReviewed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // Form state
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => {
    async function checkEligibility() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) {
          setLoading(false)
          return
        }

        // Check if user has a completed booking for this experience
        const { data: bookings } = await supabase
          .from('bookings')
          .select('id')
          .eq('experience_id', experienceId)
          .eq('traveler_id', session.user.id)
          .eq('status', 'completed')
          .limit(1)

        if (!bookings || bookings.length === 0) {
          setLoading(false)
          return
        }

        const bookingId = bookings[0].id

        // Check if already reviewed this booking
        const { data: existingReview } = await supabase
          .from('reviews')
          .select('id')
          .eq('booking_id', bookingId)
          .limit(1)

        if (existingReview && existingReview.length > 0) {
          setAlreadyReviewed(true)
        } else {
          setEligibleBookingId(bookingId)
        }
      } catch (err) {
        console.error('Failed to check review eligibility:', err)
      } finally {
        setLoading(false)
      }
    }

    checkEligibility()
  }, [experienceId])

  async function handleSubmit() {
    if (rating === 0) {
      setError("Please select a rating")
      return
    }
    if (!body.trim() || body.length < 20) {
      setError("Please write at least 20 characters")
      return
    }
    if (!eligibleBookingId) return

    setSubmitting(true)
    setError("")

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        setError("Please sign in to submit a review")
        return
      }

      const { error: submitError } = await supabase
        .from('reviews')
        .insert([{
          experience_id: experienceId,
          booking_id: eligibleBookingId,
          traveler_id: session.user.id,
          rating,
          title: title.trim() || null,
          body: body.trim(),
        }])

      if (submitError) {
        console.error('Review submit error:', submitError)
        setError("Failed to submit review. Please try again.")
        return
      }

      setSubmitted(true)
      setIsOpen(false)

      // Refresh the page to show new review
      setTimeout(() => window.location.reload(), 1500)

    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  // Not logged in or no completed booking — show nothing
  if (loading || (!eligibleBookingId && !alreadyReviewed && !submitted)) {
    return null
  }

  // Already reviewed
  if (alreadyReviewed || submitted) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: "0.625rem",
        padding: "0.875rem 1.25rem",
        backgroundColor: "rgba(0,111,107,0.06)",
        border: "1.5px solid rgba(0,111,107,0.2)",
        borderRadius: "12px", marginBottom: "1rem",
      }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%",
          backgroundColor: "#006f6b",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Check size={14} color="white" strokeWidth={3} />
        </div>
        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#006f6b", fontFamily: font }}>
          {submitted ? "Review submitted! Thank you for your feedback." : "You've already reviewed this experience."}
        </p>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: "1rem" }}>

      {/* Eligible Banner */}
      {!isOpen && (
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          backgroundColor: "rgba(157,105,29,0.06)",
          border: "1.5px solid rgba(157,105,29,0.2)",
          borderRadius: "12px",
          gap: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={16} fill="#9d691d" color="#9d691d" />
              ))}
            </div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#062626", fontFamily: font }}>
              You&apos;ve completed this experience — share your thoughts!
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              flexShrink: 0,
              backgroundColor: "#062626",
              color: "white",
              fontWeight: 700,
              fontSize: "0.8rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              fontFamily: font,
              transition: "background-color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#062626"}
          >
            Write a Review
          </button>
        </div>
      )}

      {/* Review Form */}
      {isOpen && (
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1.5px solid #e0eeee",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(6,38,38,0.08)",
        }}>

          {/* Form Header */}
          <div style={{
            backgroundColor: "#062626",
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <p style={{ color: "#89e3d5", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "3px" }}>
                Your Review
              </p>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: "0.95rem", fontFamily: font }}>
                {experienceTitle}
              </h3>
            </div>
            <button
              onClick={() => { setIsOpen(false); setError(""); setRating(0); setTitle(""); setBody(""); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center" }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Star Rating */}
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#062626", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
                Overall Rating *
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    style={{
                      background: "none", border: "none",
                      cursor: "pointer", padding: "4px",
                      transition: "transform 0.1s",
                      transform: hoveredRating >= star ? "scale(1.2)" : "scale(1)",
                    }}
                  >
                    <Star
                      size={32}
                      fill={(hoveredRating || rating) >= star ? "#9d691d" : "none"}
                      color={(hoveredRating || rating) >= star ? "#9d691d" : "#d1d5db"}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#9d691d", marginTop: "0.5rem" }}>
                  {["", "Poor", "Fair", "Good", "Great", "Excellent!"][rating]}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#062626", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                Review Title <span style={{ textTransform: "none", fontWeight: 400, color: "rgba(6,38,38,0.4)" }}>(optional)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sum up your experience in a few words"
                maxLength={100}
                style={{
                  width: "100%", padding: "0.875rem 1rem",
                  backgroundColor: "#f4f7f7",
                  border: "1.5px solid #e0eeee",
                  borderRadius: "12px", fontSize: "0.875rem",
                  color: "#062626", outline: "none",
                  fontFamily: font, boxSizing: "border-box" as const,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
              />
            </div>

            {/* Body */}
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#062626", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                Your Review *
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tell others about your experience. What did you enjoy? What was the host like? Would you recommend it?"
                rows={5}
                maxLength={1000}
                style={{
                  width: "100%", padding: "0.875rem 1rem",
                  backgroundColor: "#f4f7f7",
                  border: "1.5px solid #e0eeee",
                  borderRadius: "12px", fontSize: "0.875rem",
                  color: "#062626", outline: "none",
                  fontFamily: font, boxSizing: "border-box" as const,
                  resize: "none", transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#006f6b"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
              />
              <p style={{ fontSize: "0.7rem", color: "rgba(6,38,38,0.35)", fontWeight: 500, marginTop: "4px", textAlign: "right" }}>
                {body.length}/1000
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{ padding: "0.75rem 1rem", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px" }}>
                <p style={{ color: "#dc2626", fontSize: "0.8rem", fontWeight: 500 }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => { setIsOpen(false); setError(""); setRating(0); setTitle(""); setBody(""); }}
                style={{
                  flex: 1, padding: "0.875rem",
                  backgroundColor: "white",
                  border: "1.5px solid #e0eeee",
                  borderRadius: "12px", fontSize: "0.875rem",
                  fontWeight: 700, color: "#062626",
                  cursor: "pointer", fontFamily: font,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#062626"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e0eeee"}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  flex: 2, padding: "0.875rem",
                  backgroundColor: "#006f6b",
                  border: "none", borderRadius: "12px",
                  fontSize: "0.875rem", fontWeight: 700,
                  color: "white", cursor: "pointer",
                  fontFamily: font, opacity: submitting ? 0.7 : 1,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "0.5rem",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#00534d" }}
                onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#006f6b" }}
              >
                {submitting ? (
                  <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</>
                ) : (
                  <>Submit Review <Check size={16} /></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}