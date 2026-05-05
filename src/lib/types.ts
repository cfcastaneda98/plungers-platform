export type Role = 'traveler' | 'business' | 'admin' | 'super_admin'

export type BusinessStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

export type ExperienceStatus = 'draft' | 'active' | 'inactive' | 'suspended'

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'canceled' 
  | 'completed' 
  | 'refunded'

export type TransactionStatus = 
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'
  | 'disputed'

export type PayoutStatus = 
  | 'pending'
  | 'scheduled'
  | 'paid'
  | 'failed'
  | 'canceled'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: Role
  created_at: string
  updated_at: string
}

export interface Business {
  id: string
  owner_id: string
  business_name: string
  description: string | null
  email: string
  phone: string | null
  website: string | null
  location: string | null
  city: string | null
  country: string | null
  category: string | null
  logo_url: string | null
  cover_url: string | null
  status: BusinessStatus
  stripe_account_id: string | null
  stripe_verified: boolean
  identity_verified: boolean
  rejection_reason: string | null
  approved_at: string | null
  approved_by: string | null
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  business_id: string
  title: string
  description: string
  category: string
  location: string
  city: string
  country: string
  address: string | null
  latitude: number | null
  longitude: number | null
  price: number
  currency: string
  duration_minutes: number
  max_guests: number
  min_guests: number
  languages: string[]
  includes: string[] | null
  excludes: string[] | null
  requirements: string[] | null
  cover_image_url: string | null
  image_urls: string[]
  status: ExperienceStatus
  is_featured: boolean
  total_bookings: number
  average_rating: number
  total_reviews: number
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  experience_id: string
  traveler_id: string
  business_id: string
  status: BookingStatus
  guests: number
  booking_date: string
  booking_time: string
  total_amount: number
  currency: string
  platform_fee: number
  host_payout: number
  special_requests: string | null
  cancellation_reason: string | null
  canceled_at: string | null
  canceled_by: string | null
  confirmed_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  booking_id: string
  traveler_id: string
  business_id: string
  stripe_payment_intent_id: string | null
  stripe_charge_id: string | null
  stripe_transfer_id: string | null
  stripe_refund_id: string | null
  amount: number
  currency: string
  platform_fee: number
  host_payout: number
  stripe_fee: number
  refund_amount: number
  status: TransactionStatus
  payout_status: PayoutStatus
  payout_date: string | null
  failure_reason: string | null
  notes: string | null
  created_at: string
  updated_at: string
}