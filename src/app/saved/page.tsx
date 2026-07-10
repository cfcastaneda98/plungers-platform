import { redirect } from 'next/navigation'

// Saved experiences now live as a tab on the dashboard rather than their
// own page — this redirect just keeps any existing /saved links working.
export default function SavedPage() {
  redirect('/dashboard?tab=saved')
}
