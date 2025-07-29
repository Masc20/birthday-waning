"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const photos = [
  {
    id: 1,
    src: "/gallery/birthday-cake.png",
    alt: "Birthday celebration with cake",
    caption: "Making a wish! 🎂",
  },
  {
    id: 2,
    src: "/gallery/friends-celebrating.png",
    alt: "Friends celebrating together",
    caption: "Best friends forever! 👯‍♀️",
  },
  {
    id: 3,
    src: "/gallery/birthday-presents.png",
    alt: "Birthday presents",
    caption: "So many surprises! 🎁",
  },
  {
    id: 4,
    src: "/gallery/party-decorations.png",
    alt: "Party decorations",
    caption: "Party time! 🎈",
  },
  {
    id: 5,
    src: "/gallery/birthday-dinner.png",
    alt: "Birthday dinner",
    caption: "Delicious memories! 🍽️",
  },
  {
    id: 6,
    src: "/gallery/group-photo.png",
    alt: "Group photo",
    caption: "All together! 📸",
  },
]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    const element = document.getElementById("photo-gallery")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="photo-gallery" className="py-20 px-4 bg-gradient-to-b from-ivory to-nude-rose/20">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center text-dusty-mauve mb-12 drop-shadow-lg transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Birthday Memories 📷
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <Card
              key={photo.id}
              className={`group cursor-pointer overflow-hidden bg-ivory/95 backdrop-blur-sm border-dusty-mauve/30 border-2 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-dusty-mauve/0 group-hover:bg-dusty-mauve/20 transition-colors duration-300" />
              </div>
              <div className="p-4 bg-ivory/90">
                <p className="text-dusty-mauve font-semibold text-center drop-shadow-sm">{photo.caption}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for enlarged photo */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative aspect-square max-h-[80vh]">
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <p className="text-dusty-mauve font-medium text-lg">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
