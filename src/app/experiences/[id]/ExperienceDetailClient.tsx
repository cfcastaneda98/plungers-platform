"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin, Clock, Users, Star,
  Check, X, Globe, Calendar, Loader2
} from "lucide-react";
import { Experience, Business } from "@/lib/types";
import dynamic from "next/dynamic";
import MediaGallery from "@/components/ui/MediaGallery";
import ReviewsSection from "@/components/ui/ReviewsSection";
import { supabase } from "@/lib/supabase";
import WriteReview from "@/components/ui/WriteReview";

const ExperienceMap = dynamic(
  () => import("@/components/ui/ExperienceMap"),
  { ssr: false }
)

const CATEGORY_IMAGES: { [key: string]: string } = {
  'Food & Drink': 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=1200&q=80',
  'Outdoor Adventures': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
  'Arts & Crafts': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80',
  'Music & Shows': 'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=1200&q=80',
  'Water Sports': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
  'default': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80',
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (remaining === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours}h ${remaining}min`
}

interface BusinessData {
  business_name: string
  city: string | null
  country: string | null
  description: string | null
  instagram_url?: string | null
  facebook_url?: string | null
  tiktok_url?: string | null
  twitter_url?: string | null
  youtube_url?: string | null
}

interface Props {
  experience: Experience & { businesses?: BusinessData | BusinessData[] | null }
  similarExperiences: Experience[]
}

export default function ExperienceDetailClient({
  experience,
  similarExperiences,
}: Props) {
  const [guests, setGuests] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const totalPrice = experience.price * guests

  const heroImage =
    experience.cover_image_url ||
    CATEGORY_IMAGES[experience.category] ||
    CATEGORY_IMAGES['default']

  const business: BusinessData | null = experience.businesses
    ? Array.isArray(experience.businesses)
      ? experience.businesses[0] ?? null
      : experience.businesses
    : null

  async function handleBooking() {
    if (!selectedDate) {
      setBookingError("Please select a date first")
      return
    }
    setBookingLoading(true)
    setBookingError("")
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        experienceId: experience.id,
        guests,
        bookingDate: selectedDate,
        bookingTime: '09:00',
        travelerId: (await supabase.auth.getSession()).data.session?.user?.id || null,
      }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setBookingError("Failed to create booking. Please try again.")
      }
    } catch {
      setBookingError("Something went wrong. Please try again.")
    } finally {
      setBookingLoading(false)
    }
  }

  const font = "'Montserrat', sans-serif"

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f4f7f7", fontFamily: font }}>

      {/* Media Gallery — full width */}
      <MediaGallery
        coverImage={heroImage}
        images={experience.image_urls || []}
        videos={experience.video_urls || []}
        title={experience.title}
      />

      {/* Main Content */}
      <div className="section-pad" style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 80px 4rem" }}>
        <div className="detail-grid" style={{ gap: "3rem", alignItems: "start" }}>

          {/* Left Column */}
          <div style={{ minWidth: 0 }}>

            {/* Title & Meta */}
            <div style={{ marginBottom: "1.75rem" }}>
              <h1 style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 900,
                color: "#062626",
                lineHeight: 1.2,
                marginBottom: "1rem",
                fontFamily: font,
              }}>
                {experience.title}
              </h1>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
                {[
                  { icon: <MapPin size={13} />, text: `${experience.city}, ${experience.country}`, color: "#006f6b" },
                  { icon: <Clock size={13} />, text: formatDuration(experience.duration_minutes), color: "#8a9e9e" },
                  { icon: <Users size={13} />, text: `Up to ${experience.max_guests} guests`, color: "#8a9e9e" },
                  ...(experience.languages ? [{ icon: <Globe size={13} />, text: experience.languages.join(', '), color: "#8a9e9e" }] : []),
                ].map((item, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px", color: item.color, fontSize: "0.8rem", fontWeight: 600 }}>
                    {item.icon}
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.25rem 1.5rem", backgroundColor: "white", borderRadius: "14px", border: "1.5px solid #e0eeee", marginBottom: "1.75rem" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#006f6b", fontFamily: font, lineHeight: 1 }}>
                  {experience.average_rating.toFixed(1)}
                </div>
                <div style={{ fontSize: "0.65rem", color: "rgba(6,38,38,0.4)", fontWeight: 600, marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Rating
                </div>
              </div>
              <div style={{ width: "1px", height: "40px", backgroundColor: "#e0eeee" }} />
              <div>
                <div style={{ display: "flex", gap: "3px", marginBottom: "5px" }}>
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} fill="#9d691d" color="#9d691d" />
                  ))}
                </div>
                <p style={{ fontSize: "0.8rem", color: "rgba(6,38,38,0.5)", fontWeight: 500 }}>
                  Based on {experience.total_reviews} reviews
                </p>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "1.75rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#062626", marginBottom: "0.875rem", fontFamily: font }}>
                About this experience
              </h2>
              <p style={{ color: "rgba(6,38,38,0.65)", lineHeight: 1.75, fontWeight: 500, fontSize: "0.9rem" }}>
                {experience.description}
              </p>
            </div>

            {/* Included */}
            {experience.includes && experience.includes.length > 0 && (
              <div style={{ marginBottom: "1.75rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#062626", marginBottom: "0.875rem", fontFamily: font }}>
                  What&apos;s included
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.625rem" }}>
                  {experience.includes.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "rgba(0,111,107,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={11} color="#006f6b" />
                      </div>
                      <span style={{ fontSize: "0.825rem", color: "rgba(6,38,38,0.65)", fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Not Included */}
            {experience.excludes && experience.excludes.length > 0 && (
              <div style={{ marginBottom: "1.75rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#062626", marginBottom: "0.875rem", fontFamily: font }}>
                  Not included
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.625rem" }}>
                  {experience.excludes.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <X size={11} color="#ef4444" />
                      </div>
                      <span style={{ fontSize: "0.825rem", color: "rgba(6,38,38,0.65)", fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {experience.requirements && experience.requirements.length > 0 && (
              <div style={{ marginBottom: "1.75rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#062626", marginBottom: "0.875rem", fontFamily: font }}>
                  Requirements
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {experience.requirements.map((req, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.825rem", color: "rgba(6,38,38,0.65)", fontWeight: 500 }}>
                      <span style={{ color: "#006f6b", fontWeight: 900, marginTop: "1px" }}>·</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Host Info & Social */}
            {business && (
              <div style={{ marginBottom: "1.75rem", padding: "1.5rem", backgroundColor: "white", borderRadius: "16px", border: "1.5px solid #e0eeee" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#062626", marginBottom: "1.25rem", fontFamily: font }}>
                  About your host
                </h2>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "14px", backgroundColor: "#062626", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", fontWeight: 900, fontSize: "1.25rem", fontFamily: font }}>
                      {business.business_name.charAt(0)}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 800, color: "#062626", fontSize: "0.95rem", marginBottom: "4px", fontFamily: font }}>
                      {business.business_name}
                    </h3>
                    {business.city && (
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#006f6b", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                        <MapPin size={11} />
                        {business.city}{business.country ? `, ${business.country}` : ""}
                      </div>
                    )}
                    {business.description && (
                      <p style={{ color: "rgba(6,38,38,0.55)", fontSize: "0.825rem", fontWeight: 500, lineHeight: 1.6 }}>
                        {business.description}
                      </p>
                    )}
                  </div>
                </div>

                {(business.instagram_url || business.facebook_url || business.tiktok_url || business.twitter_url || business.youtube_url) && (
                  <div>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(6,38,38,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
                      Follow on social media
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {business.instagram_url && (
                        <a href={business.instagram_url} target="_blank" rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1.5px solid #e0eeee", borderRadius: "9999px", padding: "6px 14px", fontSize: "0.75rem", fontWeight: 700, color: "#062626", textDecoration: "none", transition: "all 0.2s", fontFamily: font }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E1306C"; e.currentTarget.style.color = "#E1306C"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e0eeee"; e.currentTarget.style.color = "#062626"; }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                          Instagram
                        </a>
                      )}
                      {business.facebook_url && (
                        <a href={business.facebook_url} target="_blank" rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1.5px solid #e0eeee", borderRadius: "9999px", padding: "6px 14px", fontSize: "0.75rem", fontWeight: 700, color: "#062626", textDecoration: "none", transition: "all 0.2s", fontFamily: font }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1877F2"; e.currentTarget.style.color = "#1877F2"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e0eeee"; e.currentTarget.style.color = "#062626"; }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          Facebook
                        </a>
                      )}
                      {business.tiktok_url && (
                        <a href={business.tiktok_url} target="_blank" rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1.5px solid #e0eeee", borderRadius: "9999px", padding: "6px 14px", fontSize: "0.75rem", fontWeight: 700, color: "#062626", textDecoration: "none", transition: "all 0.2s", fontFamily: font }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.color = "#000"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e0eeee"; e.currentTarget.style.color = "#062626"; }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                          TikTok
                        </a>
                      )}
                      {business.twitter_url && (
                        <a href={business.twitter_url} target="_blank" rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1.5px solid #e0eeee", borderRadius: "9999px", padding: "6px 14px", fontSize: "0.75rem", fontWeight: 700, color: "#062626", textDecoration: "none", transition: "all 0.2s", fontFamily: font }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.color = "#000"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e0eeee"; e.currentTarget.style.color = "#062626"; }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          X (Twitter)
                        </a>
                      )}
                      {business.youtube_url && (
                        <a href={business.youtube_url} target="_blank" rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1.5px solid #e0eeee", borderRadius: "9999px", padding: "6px 14px", fontSize: "0.75rem", fontWeight: 700, color: "#062626", textDecoration: "none", transition: "all 0.2s", fontFamily: font }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF0000"; e.currentTarget.style.color = "#FF0000"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e0eeee"; e.currentTarget.style.color = "#062626"; }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                          YouTube
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Location */}
            <div style={{ marginBottom: "1.75rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#062626", marginBottom: "0.875rem", fontFamily: font }}>
                Location
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(6,38,38,0.55)", fontSize: "0.85rem", fontWeight: 500, marginBottom: "1rem" }}>
                <MapPin size={14} color="#006f6b" />
                {experience.location}
              </div>
              {experience.latitude && experience.longitude ? (
                <ExperienceMap
                  experiences={[experience]}
                  height="280px"
                  zoom={13}
                  center={{ lat: experience.latitude, lng: experience.longitude }}
                />
              ) : (
                <div style={{ width: "100%", height: "200px", backgroundColor: "white", borderRadius: "14px", border: "1.5px solid #e0eeee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <MapPin size={28} color="#006f6b" style={{ margin: "0 auto 8px" }} />
                    <p style={{ color: "rgba(6,38,38,0.35)", fontSize: "0.8rem", fontWeight: 500 }}>Location not available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reviews */}
          <div id="reviews">
            <WriteReview
              experienceId={experience.id}
              experienceTitle={experience.title}
            />
            <ReviewsSection
              experienceId={experience.id}
              averageRating={experience.average_rating}
              totalReviews={experience.total_reviews}
            />
          </div>

          {/* Location */}

          {/* Right Column — Booking Widget */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1.5px solid #e0eeee", overflow: "hidden", boxShadow: "0 8px 32px rgba(6,38,38,0.1)" }}>

              {/* Price Header */}
              <div style={{ backgroundColor: "#062626", padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "0.5rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontWeight: 500 }}>from</span>
                  <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "white", fontFamily: font, lineHeight: 1 }}>
                    ${experience.price}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontWeight: 500 }}>/ person</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "1rem", fontWeight: 900, color: "white", fontFamily: font }}>
                    {experience.average_rating.toFixed(1)}
                  </span>
                  <Star size={13} fill="#9d691d" color="#9d691d" />
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 500 }}>
                    ({experience.total_reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Form */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

                {/* Date */}
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, color: "#062626", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                    Select Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <Calendar size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#006f6b" }} />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      style={{ width: "100%", paddingLeft: "2.25rem", paddingRight: "0.875rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", backgroundColor: "#f4f7f7", border: "1.5px solid #e0eeee", borderRadius: "10px", fontSize: "0.85rem", color: "#062626", outline: "none", fontFamily: font, boxSizing: "border-box" as const }}
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, color: "#062626", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                    Guests
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", backgroundColor: "#f4f7f7", border: "1.5px solid #e0eeee", borderRadius: "10px", padding: "0.625rem 0.875rem" }}>
                    <button
                      onClick={() => setGuests(Math.max(experience.min_guests, guests - 1))}
                      style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "white", border: "1.5px solid #e0eeee", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1rem", color: "#062626", cursor: "pointer", flexShrink: 0 }}
                    >
                      -
                    </button>
                    <span style={{ flex: 1, textAlign: "center", fontWeight: 700, fontSize: "0.9rem", color: "#062626", fontFamily: font }}>
                      {guests} {guests === 1 ? 'guest' : 'guests'}
                    </span>
                    <button
                      onClick={() => setGuests(Math.min(experience.max_guests, guests + 1))}
                      style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "white", border: "1.5px solid #e0eeee", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1rem", color: "#062626", cursor: "pointer", flexShrink: 0 }}
                    >
                      +
                    </button>
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "rgba(6,38,38,0.35)", fontWeight: 500, marginTop: "4px" }}>
                    Min {experience.min_guests} — Max {experience.max_guests} guests
                  </p>
                </div>

                {/* Price Breakdown */}
                <div style={{ backgroundColor: "#f4f7f7", borderRadius: "10px", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 500, color: "rgba(6,38,38,0.55)" }}>
                    <span>${experience.price} × {guests} {guests === 1 ? 'guest' : 'guests'}</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 500, color: "rgba(6,38,38,0.55)" }}>
                    <span>Platform fee</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div style={{ borderTop: "1px solid #e0eeee", paddingTop: "0.5rem", display: "flex", justifyContent: "space-between", fontSize: "0.95rem", fontWeight: 900, color: "#062626", fontFamily: font }}>
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                {/* Error */}
                {bookingError && (
                  <div style={{ padding: "0.75rem", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px" }}>
                    <p style={{ color: "#dc2626", fontSize: "0.8rem", fontWeight: 500 }}>{bookingError}</p>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading || !selectedDate}
                  style={{
                    width: "100%",
                    backgroundColor: !selectedDate ? "#e0eeee" : "#006f6b",
                    color: !selectedDate ? "rgba(6,38,38,0.4)" : "white",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    padding: "1rem",
                    borderRadius: "12px",
                    border: "none",
                    cursor: !selectedDate || bookingLoading ? "not-allowed" : "pointer",
                    fontFamily: font,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => { if (selectedDate && !bookingLoading) e.currentTarget.style.backgroundColor = "#00534d" }}
                  onMouseLeave={(e) => { if (selectedDate && !bookingLoading) e.currentTarget.style.backgroundColor = "#006f6b" }}
                >
                  {bookingLoading ? (
                    <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Processing...</>
                  ) : !selectedDate ? (
                    "Select a Date First"
                  ) : (
                    "Book Now →"
                  )}
                </button>

                <p style={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(6,38,38,0.35)", fontWeight: 500 }}>
                  You won&apos;t be charged yet
                </p>
              </div>
            </div>

            {/* Need Help */}
            <div style={{ marginTop: "1rem", padding: "1.25rem", backgroundColor: "white", borderRadius: "14px", border: "1.5px solid #e0eeee", textAlign: "center" }}>
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#062626", marginBottom: "4px", fontFamily: font }}>
                Need help?
              </p>
              <p style={{ fontSize: "0.75rem", color: "rgba(6,38,38,0.45)", fontWeight: 500 }}>
                Our team is available 24/7 to assist you
              </p>
            </div>
          </div>
        </div>

        {/* Similar Experiences */}
        {similarExperiences.length > 0 && (
          <div style={{ marginTop: "4rem", paddingTop: "2.5rem", borderTop: "1px solid #e0eeee" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#062626", marginBottom: "2rem", fontFamily: font }}>
              Similar experiences you might like
            </h2>
            <div className="similar-grid" style={{ gap: "1.25rem" }}>
              {similarExperiences.map((exp) => (
                <Link
                  key={exp.id}
                  href={`/experiences/${exp.id}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{ backgroundColor: "white", borderRadius: "14px", overflow: "hidden", border: "1.5px solid #e0eeee", transition: "all 0.25s ease", cursor: "pointer" }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "#006f6b"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#e0eeee"; }}
                  >
                    <div style={{ height: "160px", overflow: "hidden" }}>
                      <img
                        src={exp.cover_image_url || CATEGORY_IMAGES[exp.category] || CATEGORY_IMAGES['default']}
                        alt={exp.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                    <div style={{ padding: "0.875rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#006f6b", fontSize: "0.7rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                        <MapPin size={10} />
                        {exp.city}, {exp.country}
                      </div>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#062626", lineHeight: 1.3, marginBottom: "0.625rem", fontFamily: font, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                        {exp.title}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <span style={{ fontSize: "0.9rem", fontWeight: 900, color: "#062626", fontFamily: font }}>{exp.average_rating.toFixed(1)}</span>
                          <Star size={11} fill="#9d691d" color="#9d691d" />
                        </div>
                        <span style={{ fontSize: "0.9rem", fontWeight: 900, color: "#062626", fontFamily: font }}>from ${exp.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}