"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, X, Maximize2 } from "lucide-react";

interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail: string;
}

interface MediaGalleryProps {
  coverImage: string;
  images: string[];
  videos: string[];
  title: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  return match ? match[1] : null;
}

function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : "";
}

function getYouTubeEmbed(url: string): string {
  const id = getYouTubeId(url);
  return id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    : "";
}

export default function MediaGallery({
  coverImage,
  images,
  videos,
  title,
}: MediaGalleryProps) {
  // Build media items array — cover first, then videos, then images
  const mediaItems: MediaItem[] = [
    { type: "image" as const, url: coverImage, thumbnail: coverImage },
    ...videos.map((v) => ({
      type: "video" as const,
      url: v,
      thumbnail: getYouTubeThumbnail(v),
    })),
    ...images
      .filter((img) => img !== coverImage)
      .map((img) => ({
        type: "image" as const,
        url: img,
        thumbnail: img,
      })),
  ].slice(0, 7) // Max 7 items (1 cover + 1 video + 5 images)

  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const activeItem = mediaItems[activeIndex]

 const goNext = () => {
  setActiveIndex((prev) => (prev + 1) % mediaItems.length)
}

const goPrev = () => {
  setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
}

  return (
    <>
      <div className="w-full">
        {/* Main Viewer */}
        <div className="relative w-full h-[55vh] bg-[#062626] overflow-hidden group">
          {activeItem.type === "video" ? (
            <iframe
              src={getYouTubeEmbed(activeItem.url)}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={activeItem.url}
                alt={`${title} - ${activeIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </>
          )}

          {/* Navigation Arrows */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            {/* Back button */}
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold text-sm px-4 py-2 rounded-full transition-all"
            >
              <ChevronLeft size={16} />
              Back
            </button>

            {/* Counter + Fullscreen */}
            <div className="flex items-center gap-2">
              <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {activeIndex + 1} / {mediaItems.length}
              </span>
              {activeItem.type === "image" && (
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-all"
                >
                  <Maximize2 size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-[#062626]/80 backdrop-blur-sm text-[#89e3d5] text-xs font-bold px-4 py-2 rounded-full">
              {activeItem.type === "video" ? "▶ Video" : "Photo"}
            </span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {mediaItems.length > 1 && (
          <div className="bg-[#062626] px-4 py-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide max-w-7xl mx-auto">
              {mediaItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                    i === activeIndex
                      ? "ring-2 ring-[#89e3d5] opacity-100 scale-105"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={item.thumbnail}
                    alt={`Media ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Video play overlay */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                        <Play size={10} fill="currentColor" className="text-[#062626] ml-0.5" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && activeItem.type === "image" && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={20} />
          </button>

          {/* Lightbox Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={activeItem.url}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Lightbox Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-full">
            {activeIndex + 1} / {mediaItems.length}
          </div>
        </div>
      )}
    </>
  )
}