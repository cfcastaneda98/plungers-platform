import Link from "next/link";
import { Check, Calendar, Users, MapPin } from "lucide-react";
import { stripe } from "@/lib/stripe";

async function getSessionDetails(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
  } catch {
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

  return (
    <main className="min-h-screen bg-[#f4fafa] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">

        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[#006f6b]/10 flex items-center justify-center mx-auto mb-6">
            <Check size={48} className="text-[#006f6b]" />
          </div>
          <h1
            className="text-4xl font-black text-[#062626] mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Booking Confirmed!
          </h1>
          <p className="text-[#062626]/60 font-medium">
            Your experience has been booked successfully.
            Check your email for confirmation details.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl border border-[#e0f0ef] shadow-sm overflow-hidden mb-6">

          {/* Header */}
          <div className="bg-[#062626] p-6">
            <p className="text-[#89e3d5] text-xs font-bold uppercase tracking-widest mb-1">
              Booking Summary
            </p>
            {amount && (
              <p className="text-white text-3xl font-black">
                ${amount} <span className="text-white/50 text-base font-medium">USD</span>
              </p>
            )}
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            {metadata?.bookingDate && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f4fafa] flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-[#006f6b]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#062626]/40 uppercase tracking-wider">
                    Date
                  </p>
                  <p className="font-bold text-[#062626]">
                    {new Date(metadata.bookingDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}

            {metadata?.guests && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f4fafa] flex items-center justify-center shrink-0">
                  <Users size={18} className="text-[#006f6b]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#062626]/40 uppercase tracking-wider">
                    Guests
                  </p>
                  <p className="font-bold text-[#062626]">
                    {metadata.guests} {parseInt(metadata.guests) === 1 ? 'guest' : 'guests'}
                  </p>
                </div>
              </div>
            )}

            {session_id && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f4fafa] flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#006f6b]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#062626]/40 uppercase tracking-wider">
                    Booking Reference
                  </p>
                  <p className="font-bold text-[#062626] text-xs break-all">
                    {session_id.slice(0, 24)}...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-2xl border border-[#e0f0ef] p-6 mb-6">
          <h3 className="font-black text-[#062626] text-sm uppercase tracking-wider mb-4">
            What happens next?
          </h3>
          {[
            "You'll receive a confirmation email shortly",
            "Your host will be notified of your booking",
            "You'll get meeting point details 24hrs before",
            "Show up and enjoy your experience!",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-6 h-6 rounded-full bg-[#006f6b] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm font-medium text-[#062626]/70">{item}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/experiences"
            className="flex-1 text-center bg-[#006f6b] hover:bg-[#00534d] text-white font-black py-4 rounded-xl transition-colors"
          >
            Explore More
          </Link>
          <Link
            href="/"
            className="flex-1 text-center border-2 border-[#e0f0ef] hover:border-[#006f6b] text-[#062626] font-black py-4 rounded-xl transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}