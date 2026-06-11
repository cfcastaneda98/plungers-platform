"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Star, User, Loader2, ChevronDown } from "lucide-react";

interface Review {
  id: string
  rating: number
  title: string | null
  body: string
  created_at: string
  traveler_id: string
  profiles?: { full_name: string | null } | null
}

interface ReviewsSectionProps {
  experienceId: string
  averageRating: number
  totalReviews: number
}

const font = "'Montserrat', sans-serif"

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= rating ? "#9d691d" : "none"}
          color={star <= rating ? "#9d691d" : "#d1d5db"}
        />
      ))}
    </div>
  )
}

function RatingBar({ rating, count, total }: { rating: number; count: number; total: number }) {
  const percentage = total > 0 ? (count / total) * 100 : 0
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(6,38,38,0.6)", width: "16px", textAlign: "right", flexShrink: 0 }}>
        {rating}
      </span>
      <Star size={11} fill="#9d691d" color="#9d691d" style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, height: "6px", backgroundColor: "#e0eeee", borderRadius: "9999px", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: "9999px",
          backgroundColor: "#9d691d",
          width: `${percentage}%`,
          transition: "width 0.5s ease",
        }} />
      </div>
      <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(6,38,38,0.4)", width: "24px", flexShrink: 0 }}>
        {count}
      </span>
    </div>
  )
}

export default function ReviewsSection({
  experienceId,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [ratingCounts, setRatingCounts] = useState<Record<number, number>>({
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  })

  useEffect(() => {
    async function loadReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select(`
            id, rating, title, body,
            created_at, traveler_id,
            profiles ( full_name )
          `)
          .eq('experience_id', experienceId)
          .order('created_at', { ascending: false })

        if (!error && data) {
          setReviews(data as unknown as Review[])

          // Count ratings
          const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
          data.forEach((r) => {
            if (counts[r.rating] !== undefined) counts[r.rating]++
          })
          setRatingCounts(counts)
        }
      } catch (err) {
        console.error('Failed to load reviews:', err)
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [experienceId])

  const displayedReviews = showAll ? reviews : reviews.slice(0, 4)

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}>
        <Loader2 size={24} color="#006f6b" style={{ animation: "spin 1s linear infinite" }} />
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#062626", marginBottom: "1.25rem", fontFamily: font }}>
          Reviews
        </h2>
        <div style={{
          padding: "2rem", backgroundColor: "white",
          borderRadius: "14px", border: "1.5px solid #e0eeee",
          textAlign: "center",
        }}>
          <Star size={28} color="#e0eeee" fill="#e0eeee" style={{ margin: "0 auto 0.75rem" }} />
          <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#062626", marginBottom: "4px", fontFamily: font }}>
            No reviews yet
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(6,38,38,0.45)", fontWeight: 500 }}>
            Be the first to review this experience after booking
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#062626", marginBottom: "1.25rem", fontFamily: font }}>
        Reviews
      </h2>

      {/* Rating Summary */}
      <div style={{
        backgroundColor: "white", borderRadius: "16px",
        border: "1.5px solid #e0eeee", padding: "1.5rem",
        marginBottom: "1.25rem",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "2rem",
        alignItems: "center",
      }}>
        {/* Overall Score */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "3.5rem", fontWeight: 900,
            color: "#062626", fontFamily: font,
            lineHeight: 1,
          }}>
            {averageRating.toFixed(1)}
          </div>
          <StarRating rating={Math.round(averageRating)} size={16} />
          <p style={{ fontSize: "0.72rem", color: "rgba(6,38,38,0.4)", fontWeight: 500, marginTop: "6px" }}>
            {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Rating Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <RatingBar
              key={rating}
              rating={rating}
              count={ratingCounts[rating] || 0}
              total={reviews.length}
            />
          ))}
        </div>
      </div>

      {/* Review Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: "white", borderRadius: "14px",
              border: "1.5px solid #e0eeee", padding: "1.25rem 1.5rem",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.875rem", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {/* Avatar */}
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  backgroundColor: "#062626",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem", fontFamily: font }}>
                    {review.profiles?.full_name?.charAt(0) || "P"}
                  </span>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#062626", fontSize: "0.875rem", fontFamily: font, marginBottom: "2px" }}>
                    {review.profiles?.full_name || "Plungers Traveler"}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "rgba(6,38,38,0.4)", fontWeight: 500 }}>
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      month: 'long', year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <StarRating rating={review.rating} size={13} />
            </div>

            {/* Title */}
            {review.title && (
              <p style={{ fontWeight: 800, color: "#062626", fontSize: "0.9rem", marginBottom: "0.5rem", fontFamily: font }}>
                {review.title}
              </p>
            )}

            {/* Body */}
            <p style={{
              color: "rgba(6,38,38,0.65)", fontSize: "0.85rem",
              fontWeight: 500, lineHeight: 1.7,
            }}>
              {review.body}
            </p>

            {/* Verified Badge */}
            <div style={{ marginTop: "0.875rem", display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{
                width: "16px", height: "16px", borderRadius: "50%",
                backgroundColor: "#006f6b",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#006f6b" }}>
                Verified Experience
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More */}
      {reviews.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            width: "100%", marginTop: "1rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            backgroundColor: "white", border: "1.5px solid #e0eeee",
            borderRadius: "12px", padding: "0.875rem",
            fontSize: "0.875rem", fontWeight: 700, color: "#062626",
            cursor: "pointer", fontFamily: font, transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#006f6b"; e.currentTarget.style.color = "#006f6b"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e0eeee"; e.currentTarget.style.color = "#062626"; }}
        >
          {showAll ? "Show less" : `Show all ${reviews.length} reviews`}
          <ChevronDown size={16} style={{ transform: showAll ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
        </button>
      )}
    </div>
  )
}