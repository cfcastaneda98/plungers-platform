import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      experienceId,
      guests,
      bookingDate,
      bookingTime,
      travelerId,
    } = body

    // Validate required fields
    if (!experienceId || !guests || !bookingDate || !bookingTime) {
      return NextResponse.json(
        { error: 'Missing required booking details' },
        { status: 400 }
      )
    }

    // Fetch experience from Supabase
    const { data: experience, error: expError } = await supabase
      .from('experiences')
      .select('*, businesses(*)')
      .eq('id', experienceId)
      .eq('status', 'active')
      .single()

    if (expError || !experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    // Calculate pricing
    const subtotal = experience.price * guests
    const platformFee = subtotal * 0.1
    const total = subtotal + platformFee

    // Create pending booking in database
    // Only create booking record if we have a real authenticated user
    let booking = null
    if (travelerId) {
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          experience_id: experienceId,
          traveler_id: travelerId,
          business_id: experience.business_id,
          status: 'pending',
          guests,
          booking_date: bookingDate,
          booking_time: bookingTime,
          total_amount: total,
          currency: 'USD',
          platform_fee: platformFee,
          host_payout: subtotal * 0.9,
        }])
        .select()
        .single()

      if (bookingError) {
        console.error('Booking error:', bookingError)
      } else {
        booking = bookingData
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: experience.title,
              description: `${guests} guest${guests > 1 ? 's' : ''} · ${bookingDate} · ${experience.city}, ${experience.country}`,
              images: experience.cover_image_url
                ? [experience.cover_image_url]
                : [],
            },
            unit_amount: Math.round(experience.price * 100),
          },
          quantity: guests,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Platform Fee',
              description: 'Plungers service fee',
            },
            unit_amount: Math.round(platformFee * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://travelplungers.com'}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://travelplungers.com'}/experiences/${experienceId}`,
      metadata: {
        experienceId,
        bookingId: booking?.id || 'pending',
        travelerId: travelerId || 'guest',
        guests: guests.toString(),
        bookingDate,
        bookingTime,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}