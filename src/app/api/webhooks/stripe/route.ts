import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        const bookingId = session.metadata?.bookingId
        const experienceId = session.metadata?.experienceId

        if (bookingId && bookingId !== 'pending') {
          // Update booking status to confirmed
          await supabaseAdmin
            .from('bookings')
            .update({
              status: 'confirmed',
              confirmed_at: new Date().toISOString(),
            })
            .eq('id', bookingId)

          // Create transaction record
          await supabaseAdmin
            .from('transactions')
            .insert([{
              booking_id: bookingId,
              traveler_id: session.metadata?.travelerId || '00000000-0000-0000-0000-000000000001',
              business_id: '00000000-0000-0000-0000-000000000002',
              stripe_payment_intent_id: session.payment_intent as string,
              amount: (session.amount_total || 0) / 100,
              currency: session.currency?.toUpperCase() || 'USD',
              platform_fee: ((session.amount_total || 0) / 100) * 0.1,
              host_payout: ((session.amount_total || 0) / 100) * 0.9,
              stripe_fee: 0,
              status: 'succeeded',
              payout_status: 'pending',
            }])

          // Update experience booking count
          if (experienceId) {
            await supabaseAdmin.rpc('increment_booking_count', {
              experience_id: experienceId,
            })
          }
        }

        console.log('✓ Checkout completed:', session.id)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('✓ Payment succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('✗ Payment failed:', paymentIntent.id)

        // Update booking status to canceled if we have it
        if (paymentIntent.metadata?.bookingId) {
          await supabaseAdmin
            .from('bookings')
            .update({ status: 'canceled' })
            .eq('id', paymentIntent.metadata.bookingId)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}