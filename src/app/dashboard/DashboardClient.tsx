"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  User, MapPin, Calendar, Clock,
  Star, LogOut, ChevronRight,
  Loader2, Package
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Booking {
  id: string
  status: string
  guests: number
  booking_date: string
  total_amount: number
  created_at: string
  experiences: {
    id: string
    title: string
    city: string
    country: string
    cover_image_url: string | null
    category: string
    duration_minutes: number
  } | null
}

const font = "'Montserrat', sans-serif"

const STATUS_STYLES: { [key: string]: { bg: string; color: string; label: string } } = {
  pending: { bg: "rgba(245,158,11,0.1)", color: "#d97706", label: "Pending" },
  confirmed: { bg: "rgba(0,111,107,0.1)", color: "#006f6b", label: "Confirmed" },
  completed: { bg: "rgba(6,38,38,0.08)", color: "#062626", label: "Completed" },
  canceled: { bg: "rgba(239,68,68,0.1)", color: "#dc2626", label: "Canceled" },
  refunded: { bg: "rgba(139,92,246,0.1)", color: "#7c3aed", label: "Refunded" },
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (hours === 0) return `${minutes} min`
  if (remaining === 0) return `${hours}h`
  return `${hours}h ${remaining}min`
}

export default function DashboardClient() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"bookings" | "profile">("bookings")

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) {
        window.location.href = '/auth/login'
        return
      }

      setUser(session.user)

      // Fetch bookings
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id, status, guests, booking_date,
            total_amount, created_at,
            experiences (
              id, title, city, country,
              cover_image_url, category, duration_minutes
            )
          `)
          .eq('traveler_id', session.user.id)
          .order('created_at', { ascending: false })

        if (!error && data) {
          setBookings(data as unknown as Booking[])
        }
      } catch (err) {
        console.error('Failed to load bookings:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <main style={{
        minHeight: "100vh", backgroundColor: "#f4f7f7",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: font,
      }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 size={32} color="#006f6b" style={{ animation: "spin 1s linear infinite", margin: "0 auto 1rem" }} />
          <p style={{ color: "rgba(6,38,38,0.5)", fontWeight: 500, fontSize: "0.9rem" }}>
            Loading your dashboard...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: "100vh", backgroundColor: "#f4f7f7", fontFamily: font,
    }}>

      {/* Header */}
      <div style={{ backgroundColor: "#062626", paddingTop: "6rem", paddingBottom: "2rem" }}>
        <div className="section-pad" style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "80px", paddingRight: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Avatar */}
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                backgroundColor: "#006f6b",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "white", fontWeight: 900, fontSize: "1.4rem", fontFamily: font }}>
                  {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "?"}
                </span>
              </div>
              <div>
                <p style={{ color: "#89e3d5", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "4px" }}>
                  My Account
                </p>
                <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontFamily: font, lineHeight: 1.2 }}>
                  {user?.user_metadata?.full_name || "Welcome back!"}
                </h1>
              </div>
            </div>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "9999px", padding: "0.625rem 1.25rem",
                color: "white", fontWeight: 600, fontSize: "0.8rem",
                cursor: "pointer", fontFamily: font, transition: "all 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0.25rem", marginTop: "2rem" }}>
            {[
              { key: "bookings", label: "My Bookings" },
              { key: "profile", label: "Profile" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "bookings" | "profile")}
                style={{
                  padding: "0.625rem 1.5rem",
                  borderRadius: "9999px 9999px 0 0",
                  border: "none",
                  backgroundColor: activeTab === tab.key ? "#f4f7f7" : "transparent",
                  color: activeTab === tab.key ? "#062626" : "rgba(255,255,255,0.6)",
                  fontWeight: 700, fontSize: "0.85rem",
                  cursor: "pointer", fontFamily: font, transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-pad" style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 80px 4rem" }}>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div>
            {bookings.length === 0 ? (
              /* Empty State */
              <div style={{ textAlign: "center", padding: "5rem 0" }}>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%",
                  backgroundColor: "rgba(0,111,107,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}>
                  <Package size={36} color="#006f6b" />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#062626", marginBottom: "0.75rem", fontFamily: font }}>
                  No bookings yet
                </h3>
                <p style={{ color: "rgba(6,38,38,0.5)", fontWeight: 500, marginBottom: "2rem", fontSize: "0.9rem" }}>
                  Your booked experiences will appear here
                </p>
                <Link
                  href="/experiences"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    backgroundColor: "#006f6b", color: "white",
                    fontWeight: 700, fontSize: "0.9rem",
                    padding: "1rem 2.5rem", borderRadius: "9999px",
                    textDecoration: "none", fontFamily: font,
                  }}
                >
                  Explore Experiences →
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ color: "rgba(6,38,38,0.5)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
                </p>
                {bookings.map((booking) => (
                  <Link
                    key={booking.id}
                    href={booking.experiences ? `/experiences/${booking.experiences.id}` : '#'}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      style={{
                        backgroundColor: "white", borderRadius: "16px",
                        border: "1.5px solid #e0eeee", overflow: "hidden",
                        transition: "all 0.2s", cursor: "pointer",
                        display: "flex", alignItems: "stretch",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                        e.currentTarget.style.borderColor = "#006f6b";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "#e0eeee";
                      }}
                    >
                      {/* Image */}
                      {booking.experiences?.cover_image_url && (
                        <div style={{ width: "140px", flexShrink: 0, overflow: "hidden" }}>
                          <img
                            src={booking.experiences.cover_image_url}
                            alt={booking.experiences.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div style={{ flex: 1, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          {/* Category + Status */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <span style={{
                              fontSize: "0.68rem", fontWeight: 700,
                              color: "#89e3d5", backgroundColor: "#062626",
                              padding: "3px 10px", borderRadius: "9999px",
                            }}>
                              {booking.experiences?.category || "Experience"}
                            </span>
                            <span style={{
                              fontSize: "0.72rem", fontWeight: 700,
                              backgroundColor: STATUS_STYLES[booking.status]?.bg || "#f4f7f7",
                              color: STATUS_STYLES[booking.status]?.color || "#062626",
                              padding: "4px 12px", borderRadius: "9999px",
                            }}>
                              {STATUS_STYLES[booking.status]?.label || booking.status}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 style={{
                            fontSize: "1rem", fontWeight: 800, color: "#062626",
                            marginBottom: "0.5rem", fontFamily: font, lineHeight: 1.3,
                          }}>
                            {booking.experiences?.title || "Experience"}
                          </h3>

                          {/* Meta */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                            {booking.experiences?.city && (
                              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#006f6b", fontSize: "0.75rem", fontWeight: 600 }}>
                                <MapPin size={11} />
                                {booking.experiences.city}, {booking.experiences.country}
                              </span>
                            )}
                            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(6,38,38,0.5)", fontSize: "0.75rem", fontWeight: 500 }}>
                              <Calendar size={11} />
                              {new Date(booking.booking_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(6,38,38,0.5)", fontSize: "0.75rem", fontWeight: 500 }}>
                              <User size={11} />
                              {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                            </span>
                            {booking.experiences?.duration_minutes && (
                              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(6,38,38,0.5)", fontSize: "0.75rem", fontWeight: 500 }}>
                                <Clock size={11} />
                                {formatDuration(booking.experiences.duration_minutes)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Footer */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem", paddingTop: "0.875rem", borderTop: "1px solid #e0eeee" }}>
                          <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#062626", fontFamily: font }}>
                            ${booking.total_amount.toFixed(2)}
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#006f6b", fontSize: "0.8rem", fontWeight: 700 }}>
                            View Details <ChevronRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div style={{ maxWidth: "560px" }}>
            <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1.5px solid #e0eeee", overflow: "hidden", boxShadow: "0 4px 24px rgba(6,38,38,0.06)" }}>

              {/* Profile Header */}
              <div style={{ backgroundColor: "#062626", padding: "2rem", textAlign: "center" }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  backgroundColor: "#006f6b",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1rem",
                }}>
                  <span style={{ color: "white", fontWeight: 900, fontSize: "1.8rem", fontFamily: font }}>
                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "?"}
                  </span>
                </div>
                <h2 style={{ color: "white", fontWeight: 900, fontSize: "1.2rem", fontFamily: font, marginBottom: "4px" }}>
                  {user?.user_metadata?.full_name || "Plungers User"}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontWeight: 500 }}>
                  {user?.email}
                </p>
              </div>

              {/* Profile Details */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Full Name", value: user?.user_metadata?.full_name || "Not set", Icon: User },
                  { label: "Email Address", value: user?.email || "Not set", Icon: Star },
                  { label: "Account Type", value: user?.user_metadata?.role === 'business' ? 'Business Host' : 'Traveler', Icon: Package },
                  { label: "Member Since", value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "—", Icon: Calendar },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "0.875rem 1rem", backgroundColor: "#f4f7f7",
                    borderRadius: "12px",
                  }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "white", border: "1.5px solid #e0eeee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <item.Icon size={16} color="#006f6b" />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(6,38,38,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#062626", fontFamily: font }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}