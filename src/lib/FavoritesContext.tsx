"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface FavoritesContextValue {
  /** Whether we're still loading the initial set of favorites for the current session. */
  loading: boolean
  /** Whether someone is signed in at all (favoriting requires an account). */
  isSignedIn: boolean
  isFavorited: (experienceId: string) => boolean
  /** Toggles the favorite. Returns false (and does nothing) if the person isn't signed in,
   *  so the caller can redirect to login. */
  toggleFavorite: (experienceId: string) => Promise<boolean>
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    let active = true

    async function loadFavorites() {
      if (!user) {
        if (active) {
          setFavoriteIds(new Set())
          setLoading(false)
        }
        return
      }
      setLoading(true)
      const { data, error } = await supabase
        .from("favorites")
        .select("experience_id")
        .eq("user_id", user.id)

      if (!active) return
      if (!error && data) {
        setFavoriteIds(new Set(data.map((row) => row.experience_id)))
      }
      setLoading(false)
    }

    loadFavorites()
    return () => { active = false }
  }, [user])

  const isFavorited = useCallback(
    (experienceId: string) => favoriteIds.has(experienceId),
    [favoriteIds]
  )

  const toggleFavorite = useCallback(async (experienceId: string) => {
    if (!user) return false

    const currentlyFavorited = favoriteIds.has(experienceId)

    // Optimistic update
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (currentlyFavorited) next.delete(experienceId)
      else next.add(experienceId)
      return next
    })

    if (currentlyFavorited) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("experience_id", experienceId)

      if (error) {
        // Revert on failure
        setFavoriteIds((prev) => new Set(prev).add(experienceId))
        return false
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, experience_id: experienceId })

      if (error) {
        setFavoriteIds((prev) => {
          const next = new Set(prev)
          next.delete(experienceId)
          return next
        })
        return false
      }
    }

    return true
  }, [user, favoriteIds])

  return (
    <FavoritesContext.Provider
      value={{ loading, isSignedIn: !!user, isFavorited, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return ctx
}
