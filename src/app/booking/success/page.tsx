import { stripe } from "@/lib/stripe";
import BookingSuccessClient from "./BookingSuccessClient";

async function getSessionDetails(sessionId: string) {
  try {
    if (!sessionId || !sessionId.startsWith('cs_')) return null
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
  } catch (error) {
    console.error('Failed to retrieve Stripe session:', error)
    return null
  }
}

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  let sessionId: string | undefined
  let amount: string | null = null
  let metadata: Record<string, string> | null = null

  try {
    const params = await searchParams
    sessionId = params.session_id

    if (sessionId) {
      const session = await getSessionDetails(sessionId)
      if (session) {
        amount = session.amount_total
          ? (session.amount_total / 100).toFixed(2)
          : null
        metadata = session.metadata as Record<string, string> | null
      }
    }
  } catch (error) {
    console.error('Success page error:', error)
  }

  return (
    <BookingSuccessClient
      sessionId={sessionId}
      amount={amount}
      metadata={metadata}
    />
  )
}