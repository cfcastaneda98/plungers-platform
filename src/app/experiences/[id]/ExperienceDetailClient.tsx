"use client";

import { useState } from "react";
import Link from "next/link";
import MediaGallery from "@/components/ui/MediaGallery";
import {
  MapPin, Clock, Users, Star, Check, X,
  Globe, Calendar, Loader2
} from "lucide-react";
import { Experience } from "@/lib/types";
import dynamic from "next/dynamic"



const ExperienceMap = dynamic(
  () => import("@/components/ui/ExperienceMap"),
  { ssr: false }
)
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

    // Normalize businesses — Supabase sometimes returns array or object
  const business: BusinessData | null = experience.businesses
    ? Array.isArray(experience.businesses)
      ? experience.businesses[0] ?? null
      : experience.businesses
    : null

  return (
    <main className="min-h-screen bg-white">

      {/* Media Gallery */}
      <MediaGallery
        coverImage={heroImage}
        images={experience.image_urls || []}
        videos={experience.video_urls || []}
        title={experience.title}
      />

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

            {/* Host Info & Social Links */}
            {business && (
              <div className="mb-8 p-6 bg-[#f4fafa] rounded-2xl border border-[#e0f0ef]">
                <h2
                  className="text-xl font-black text-[#062626] mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  About your host
                </h2>
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#006f6b] flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-xl">
                      {business.business_name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-[#062626] text-base mb-1">
                      {business.business_name}
                    </h3>
                    {business.city && (
                      <div className="flex items-center gap-1.5 text-[#006f6b] text-xs font-medium mb-2">
                        <MapPin size={11} />
                        <span>{business.city}{business.country ? `, ${business.country}` : ""}</span>
                      </div>
                    )}
                    {business.description && (
                      <p className="text-[#062626]/60 text-sm font-medium leading-relaxed">
                        {business.description}
                      </p>
                    )}
                  </div>
                </div>
                {(business.instagram_url || business.facebook_url || business.tiktok_url || business.twitter_url || business.youtube_url) && (
                  <div>
                    <p className="text-xs font-black text-[#062626]/40 uppercase tracking-wider mb-3">
                      Follow on social media
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {business.instagram_url && (
                        <a href={business.instagram_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white hover:bg-pink-50 border border-[#e0f0ef] hover:border-pink-400 text-[#062626] hover:text-pink-600 font-bold text-xs px-4 py-2.5 rounded-full transition-all duration-200">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                          Instagram
                        </a>
                      )}
                      {business.facebook_url && (
                        <a href={business.facebook_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white hover:bg-blue-50 border border-[#e0f0ef] hover:border-blue-500 text-[#062626] hover:text-blue-600 font-bold text-xs px-4 py-2.5 rounded-full transition-all duration-200">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          Facebook
                        </a>
                      )}
                      {business.tiktok_url && (
                        <a href={business.tiktok_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-[#e0f0ef] hover:border-gray-800 text-[#062626] hover:text-gray-900 font-bold text-xs px-4 py-2.5 rounded-full transition-all duration-200">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                          TikTok
                        </a>
                      )}
                      {business.twitter_url && (
                        <a href={business.twitter_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-[#e0f0ef] hover:border-gray-800 text-[#062626] hover:text-gray-900 font-bold text-xs px-4 py-2.5 rounded-full transition-all duration-200">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          X (Twitter)
                        </a>
                      )}
                      {business.youtube_url && (
                        <a href={business.youtube_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white hover:bg-red-50 border border-[#e0f0ef] hover:border-red-500 text-[#062626] hover:text-red-600 font-bold text-xs px-4 py-2.5 rounded-full transition-all duration-200">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                          YouTube
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
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