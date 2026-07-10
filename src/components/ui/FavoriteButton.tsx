"use client";

import { Heart } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useFavorites } from "@/lib/FavoritesContext";

interface FavoriteButtonProps {
  experienceId: string
  /** "card" = small circle for grid cards (default). "detail" = larger circle for the gallery overlay. */
  size?: "card" | "detail"
}

export default function FavoriteButton({ experienceId, size = "card" }: FavoriteButtonProps) {
  const { isFavorited, toggleFavorite, isSignedIn } = useFavorites();
  const router = useRouter();
  const pathname = usePathname();
  const favorited = isFavorited(experienceId);
  const dimension = size === "detail" ? 40 : 32;
  const iconSize = size === "detail" ? 19 : 15;

  async function handleClick(e: React.MouseEvent) {
    // Cards wrap this button in a <Link> — stop the click from bubbling up
    // and triggering navigation.
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    await toggleFavorite(experienceId);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? "Remove from saved" : "Save experience"}
      aria-pressed={favorited}
      style={{
        width: `${dimension}px`,
        height: `${dimension}px`,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(6,38,38,0.45)",
        backdropFilter: "blur(4px)",
        transition: "background-color 0.2s, transform 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)" }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)" }}
    >
      <Heart
        size={iconSize}
        color={favorited ? "#e0524a" : "white"}
        fill={favorited ? "#e0524a" : "none"}
        strokeWidth={2}
      />
    </button>
  );
}
