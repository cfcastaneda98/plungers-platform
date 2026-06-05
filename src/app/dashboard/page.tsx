import { createClient } from '@supabase/supabase-js'
import DashboardClient from './DashboardClient'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  return <DashboardClient />
}