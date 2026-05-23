"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin, Clock, Users, Star,
  ChevronLeft, Check, X,
  Globe, Calendar, Loader2
} from "lucide-react";
import { Experience } from "@/lib/types";
import dynamic from "next/dynamic"


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

interface Props {
  experience: Experience
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
        travelerId: null,
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

  const heroImage =
    experience.cover_image_url ||
    CATEGORY_IMAGES[experience.category] ||
    CATEGORY_IMAGES['default']

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Image */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <img
          src={heroImage}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-24 left-6 sm:left-10 lg:left-16">
          <Link
            href="/experiences"
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold text-sm px-4 py-2 rounded-full transition-all"
          >
            <ChevronLeft size={16} />
            Back
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-6 left-6 sm:left-10 lg:left-16">
          <span className="bg-[#062626]/80 backdrop-blur-sm text-[#89e3d5] text-xs font-bold px-4 py-2 rounded-full">
            {experience.category}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column — Details */}
          <div className="lg:col-span-2">

            {/* Title & Meta */}
            <div className="mb-8">
              <h1
                className="text-3xl sm:text-4xl font-black text-[#062626] mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {experience.title}
              </h1>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[#062626]/60">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#006f6b]" />
                  {experience.city}, {experience.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-[#006f6b]" />
                  {formatDuration(experience.duration_minutes)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={15} className="text-[#006f6b]" />
                  Up to {experience.max_guests} guests
                </span>
                {experience.languages && (
                  <span className="flex items-center gap-1.5">
                    <Globe size={15} className="text-[#006f6b]" />
                    {experience.languages.join(', ')}
                  </span>
                )}
              </div>
            </div>

            {/* Rating Bar */}
            <div className="flex items-center gap-4 p-5 bg-[#f4fafa] rounded-2xl border border-[#e0f0ef] mb-8">
              <div className="text-center">
                <div className="text-4xl font-black text-[#006f6b]">
                  {experience.average_rating.toFixed(1)}
                </div>
                <div className="text-xs text-[#062626]/50 font-medium mt-1">
                  Rating
                </div>
              </div>
              <div className="w-px h-12 bg-[#e0f0ef]" />
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className="text-[#9d691d]"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#062626]/60 font-medium">
                  Based on {experience.total_reviews} reviews
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2
                className="text-xl font-black text-[#062626] mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                About this experience
              </h2>
              <p className="text-[#062626]/70 leading-relaxed font-medium">
                {experience.description}
              </p>
            </div>

            {/* What's Included */}
            {experience.includes && experience.includes.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-xl font-black text-[#062626] mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  What&apos;s included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {experience.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#006f6b]/10 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-[#006f6b]" />
                      </div>
                      <span className="text-sm font-medium text-[#062626]/70">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Not Included */}
            {experience.excludes && experience.excludes.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-xl font-black text-[#062626] mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Not included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {experience.excludes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <X size={12} className="text-red-400" />
                      </div>
                      <span className="text-sm font-medium text-[#062626]/70">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {experience.requirements && experience.requirements.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-xl font-black text-[#062626] mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {experience.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm font-medium text-[#062626]/70"
                    >
                      <span className="text-[#006f6b] font-black mt-0.5">·</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Location */}
            <div className="mb-8">
              <h2
                className="text-xl font-black text-[#062626] mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Location
              </h2>
              <div className="flex items-center gap-2 text-[#062626]/60 font-medium mb-4">
                <MapPin size={16} className="text-[#006f6b]" />
                <span>{experience.location}</span>
              </div>
              {experience.latitude && experience.longitude ? (
                <ExperienceMap
                    experiences={[experience]}
                    height="300px"
                    zoom={13}
                    center={{
                    lat: experience.latitude,
                    lng: experience.longitude,
                    }}
                />
                ) : (
                <div className="w-full h-64 bg-[#f4fafa] rounded-2xl border border-[#e0f0ef] flex items-center justify-center">
                    <div className="text-center">
                    <MapPin size={32} className="text-[#006f6b] mx-auto mb-2" />
                    <p className="text-[#062626]/40 text-sm font-medium">
                        Location not available
                    </p>
                    </div>
                </div>
                )}
            </div>
          </div>

          {/* Right Column — Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-[#e0f0ef] rounded-2xl shadow-xl overflow-hidden">

                {/* Price Header */}
                <div className="bg-[#062626] p-6">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-white/60 text-sm font-medium">from</span>
                    <span className="text-4xl font-black text-white">
                      ${experience.price}
                    </span>
                    <span className="text-white/60 text-sm font-medium">
                      / person
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-[#006f6b] text-white text-xs font-black px-2 py-0.5 rounded">
                      {experience.average_rating.toFixed(1)}
                    </div>
                    <Star size={12} fill="currentColor" className="text-[#9d691d]" />
                    <span className="text-white/60 text-xs font-medium">
                      ({experience.total_reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="p-6 space-y-4">

                  {/* Date Picker */}
                  <div>
                    <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                      Select Date
                    </label>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006f6b]"
                      />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b]"
                      />
                    </div>
                  </div>

                  {/* Guest Counter */}
                  <div>
                    <label className="text-xs font-black text-[#062626] uppercase tracking-wider mb-2 block">
                      Guests
                    </label>
                    <div className="flex items-center gap-3 bg-[#f4fafa] border border-[#e0f0ef] rounded-xl p-3">
                      <button
                        onClick={() => setGuests(Math.max(experience.min_guests, guests - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-[#e0f0ef] hover:border-[#006f6b] flex items-center justify-center font-black text-[#062626] transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-black text-[#062626]">
                        {guests} {guests === 1 ? 'guest' : 'guests'}
                      </span>
                      <button
                        onClick={() => setGuests(Math.min(experience.max_guests, guests + 1))}
                        className="w-8 h-8 rounded-full bg-white border border-[#e0f0ef] hover:border-[#006f6b] flex items-center justify-center font-black text-[#062626] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-[#062626]/40 font-medium mt-1">
                      Min {experience.min_guests} — Max {experience.max_guests} guests
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-[#f4fafa] rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm font-medium text-[#062626]/60">
                      <span>${experience.price} × {guests} {guests === 1 ? 'guest' : 'guests'}</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-[#062626]/60">
                      <span>Platform fee</span>
                      <span>${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-[#e0f0ef] pt-2 flex justify-between font-black text-[#062626]">
                      <span>Total</span>
                      <span>${(totalPrice * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  {bookingError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 text-sm font-medium">{bookingError}</p>
                    </div>
                  )}
                  <button
                    className="w-full bg-[#006f6b] hover:bg-[#00534d] active:bg-[#062626] disabled:opacity-60 text-white font-black py-4 rounded-xl transition-colors duration-200 text-base tracking-wide shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    onClick={handleBooking}
                    disabled={bookingLoading || !selectedDate}
                  >
                    {bookingLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : !selectedDate ? (
                      "Select a Date First"
                    ) : (
                      "Book Now →"
                    )}
                  </button>

                  <p className="text-center text-xs text-[#062626]/40 font-medium">
                    You won&apos;t be charged yet
                  </p>
                </div>
              </div>

              {/* Need Help */}
              <div className="mt-4 p-4 bg-[#f4fafa] rounded-2xl border border-[#e0f0ef] text-center">
                <p className="text-sm font-bold text-[#062626] mb-1">
                  Need help?
                </p>
                <p className="text-xs text-[#062626]/50 font-medium">
                  Our team is available 24/7 to assist you
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Experiences */}
        {similarExperiences.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#e0f0ef]">
            <h2
              className="text-2xl font-black text-[#062626] mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Similar experiences you might like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarExperiences.map((exp) => (
                <Link
                  key={exp.id}
                  href={`/experiences/${exp.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e0f0ef]"
                >
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={
                        exp.cover_image_url ||
                        CATEGORY_IMAGES[exp.category] ||
                        CATEGORY_IMAGES['default']
                      }
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-[#006f6b] text-xs mb-2 font-medium">
                      <MapPin size={11} />
                      <span>{exp.city}, {exp.country}</span>
                    </div>
                    <h3 className="font-bold text-[#062626] text-sm leading-snug mb-2 group-hover:text-[#006f6b] transition-colors line-clamp-2">
                      {exp.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="bg-[#006f6b] text-white text-xs font-black px-2 py-0.5 rounded">
                          {exp.average_rating.toFixed(1)}
                        </div>
                        <Star size={11} fill="currentColor" className="text-[#9d691d]" />
                      </div>
                      <span className="text-sm font-black text-[#062626]">
                        from ${exp.price}
                      </span>
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