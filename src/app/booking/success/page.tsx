import Link from "next/link";
import { Check, Calendar, Users, MapPin } from "lucide-react";
import { stripe } from "@/lib/stripe";

async function getSessionDetails(sessionId: string) {
  try {
    if (!sessionId || !sessionId.startsWith('cs_')) return null
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
  } catch (error) {
    console.error('Failed to retrieve session:', error)
    return null
  }
}

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const session = session_id ? await getSessionDetails(session_id) : null

  const amount = session?.amount_total
    ? (session.amount_total / 100).toFixed(2)
    : null

  const metadata = session?.metadata
  const font = "'Montserrat', sans-serif"

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#f4f7f7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 24px 48px",
      fontFamily: font,
    }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>

        {/* Check Icon */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,111,107,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}>
            <Check size={44} color="#006f6b" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(1.6rem, 4vw, 2rem)",
          fontWeight: 900,
          color: "#062626",
          textAlign: "center",
          marginBottom: "0.875rem",
          fontFamily: font,
          lineHeight: 1.2,
        }}>
          Booking Confirmed!
        </h1>

        {/* Description */}
        <p style={{
          color: "rgba(6,38,38,0.55)",
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: 1.7,
          textAlign: "center",
          marginBottom: "2rem",
          maxWidth: "380px",
          margin: "0 auto 2rem",
        }}>
          Your experience has been booked successfully. Check
          your email for confirmation details.
        </p>

        {/* Booking Summary Card */}
        <div style={{
          backgroundColor: "#062626",
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "1.25rem",
          textAlign: "center",
        }}>
          <p style={{
            color: "#89e3d5",
            fontSize: "0.65rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            marginBottom: "0.5rem",
          }}>
            Booking Summary
          </p>
          {amount && (
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.5rem" }}>
              <span style={{
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                fontWeight: 900,
                color: "white",
                fontFamily: font,
                lineHeight: 1,
              }}>
                ${amount}
              </span>
              <span style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
              }}>
                USD
              </span>
            </div>
          )}
        </div>

        {/* Booking Details */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1.5px solid #e0eeee",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
          {metadata?.bookingDate && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "10px",
                backgroundColor: "#f4f7f7",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Calendar size={16} color="#006f6b" />
              </div>
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(6,38,38,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
                  Date
                </p>
                <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#062626", fontFamily: font }}>
                  {new Date(metadata.bookingDate).toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric',
                    month: 'long', day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}

          {metadata?.guests && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "10px",
                backgroundColor: "#f4f7f7",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Users size={16} color="#006f6b" />
              </div>
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(6,38,38,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
                  Guests
                </p>
                <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#062626", fontFamily: font }}>
                  {metadata.guests} {parseInt(metadata.guests) === 1 ? 'guest' : 'guests'}
                </p>
              </div>
            </div>
          )}

          {session_id && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "10px",
                backgroundColor: "#f4f7f7",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <MapPin size={16} color="#006f6b" />
              </div>
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(6,38,38,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
                  Booking Reference
                </p>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#062626", fontFamily: font, wordBreak: "break-all" }}>
                  {session_id.slice(0, 28)}...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* What happens next */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "1.1rem",
            fontWeight: 900,
            color: "#062626",
            textAlign: "center",
            marginBottom: "1.25rem",
            fontFamily: font,
          }}>
            What happens next?
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              "You'll receive a confirmation email shortly",
              "Your host will be notified of your booking",
              "You'll get meeting point details 24hrs before",
              "Show up and enjoy your experience!",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{
                  width: "28px", height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#062626",
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: font,
                }}>
                  {i + 1}
                </div>
                <p style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgba(6,38,38,0.65)",
                  lineHeight: 1.5,
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          <Link
            href="/experiences"
            style={{
              display: "block",
              textAlign: "center",
              backgroundColor: "#062626",
              color: "white",
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "1rem",
              borderRadius: "9999px",
              textDecoration: "none",
              fontFamily: font,
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#062626"}
          >
            Explore More
          </Link>
          <Link
            href="/"
            style={{
              display: "block",
              textAlign: "center",
              backgroundColor: "transparent",
              color: "#062626",
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "1rem",
              borderRadius: "9999px",
              textDecoration: "none",
              fontFamily: font,
              border: "1.5px solid #062626",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#062626";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#062626";
            }}
          >
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  )
}