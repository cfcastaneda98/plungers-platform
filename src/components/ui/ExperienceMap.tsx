"use client";

import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

interface MapExperience {
  id: string
  title: string
  city: string
  country: string
  price: number
  average_rating: number
  latitude: number | null
  longitude: number | null
  cover_image_url: string | null
  category: string
}

interface ExperienceMapProps {
  experiences: MapExperience[]
  height?: string
  zoom?: number
  center?: { lat: number; lng: number }
}

const CATEGORY_IMAGES: { [key: string]: string } = {
  'Food & Drink': 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=200&q=80',
  'Outdoor Adventures': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&q=80',
  'Arts & Crafts': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&q=80',
  'Music & Shows': 'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=200&q=80',
  'Water Sports': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80',
  'default': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&q=80',
}

function MarkerWithInfo({ experience }: { experience: MapExperience }) {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoOpen, setInfoOpen] = useState(false)

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: experience.latitude!, lng: experience.longitude! }}
        onClick={() => setInfoOpen(true)}
      >
        <Pin
          background="#006f6b"
          borderColor="#062626"
          glyphColor="#ffffff"
        />
      </AdvancedMarker>

      {infoOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setInfoOpen(false)}
          maxWidth={220}
        >
          <Link href={`/experiences/${experience.id}`}>
            <div className="overflow-hidden rounded-lg">
              <img
                src={
                  experience.cover_image_url ||
                  CATEGORY_IMAGES[experience.category] ||
                  CATEGORY_IMAGES['default']
                }
                alt={experience.title}
                className="w-full h-24 object-cover"
              />
              <div className="p-2">
                <p className="font-bold text-[#062626] text-xs leading-tight mb-1 line-clamp-2">
                  {experience.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={10} fill="#9d691d" className="text-[#9d691d]" />
                    <span className="text-xs font-bold text-[#006f6b]">
                      {experience.average_rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#062626]">
                    from ${experience.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </InfoWindow>
      )}
    </>
  )
}

export default function ExperienceMap({
  experiences,
  height = "400px",
  zoom = 3,
  center = { lat: 20, lng: 0 },
}: ExperienceMapProps) {
  // Filter only experiences with coordinates
  const mappable = experiences.filter(
    (exp) => exp.latitude !== null && exp.longitude !== null
  )

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden border border-[#e0f0ef]">
      {mappable.length === 0 ? (
        <div className="w-full h-full bg-[#f4fafa] flex flex-col items-center justify-center gap-3">
          <MapPin size={32} className="text-[#006f6b]" />
          <p className="text-[#062626]/40 text-sm font-medium">
            No location data available yet
          </p>
        </div>
      ) : (
        <Map
          mapId="plungers-map"
          defaultZoom={zoom}
          defaultCenter={center}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={true}
          style={{ width: "100%", height: "100%" }}
        >
          {mappable.map((exp) => (
            <MarkerWithInfo key={exp.id} experience={exp} />
          ))}
        </Map>
      )}
    </div>
  )
}