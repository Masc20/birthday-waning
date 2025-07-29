"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const photos = [
  {
    id: 1,
    src: "/gallery/pic1.jpeg",
    alt: "Joana Angle Version",
    caption: "Angel Version nimo oh! 😇",
  },
  {
    id: 2,
    src: "/gallery/Alltogether.jpg",
    alt: "Friends together",
    caption: "Best friends 👯‍♀️",
  },
  {
    id: 3,
    src: "/gallery/nurse.jpg",
    alt: "Nurse version",
    caption: "Nurse Version 👩‍⚕ ️",
  },
  {
    id: 4,
    src: "/gallery/partytime.jpeg",
    alt: "Party decorations",
    caption: "Ari ni baga nang nawng nimo😂",
  },
  {
    id: 5,
    src: "/gallery/hagbayarn.jpg",
    alt: "Waning way tug",
    caption: "Pagbinuntagay pa 😪",
  },
  {
    id: 6,
    src: "/gallery/wink-wink.jpg",
    alt: "Group photo",
    caption: "'wink'😜",
  },
]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedPhoto(null)
      }
    }

    if (selectedPhoto) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [selectedPhoto])


  return (
    <section id="photo-gallery" className="py-20 px-4 bg-gradient-to-b from-ivory to-nude-rose/20">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center text-dusty-mauve mb-12 drop-shadow-lg transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
         Memories 📷
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
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  layout="fill"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
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
          <div
            ref={modalRef}
            className="bg-white rounded-lg overflow-hidden shadow-xl relative"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white"
              onClick={() => {
                setSelectedPhoto(null)
                setIsImageLoading(true)
              }}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Loader while image loads */}
            {isImageLoading && (
              <div className="flex items-center justify-center w-[600px] h-[400px] max-w-[90vw] max-h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-dusty-mauve border-opacity-50" />
              </div>
            )}

            {/* Image */}
            <div className="mx-auto">
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                width={600}
                height={600}
                className={`object-contain max-w-[90vw] max-h-[80vh] w-auto h-auto transition-opacity duration-300 ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsImageLoading(false)}
              />
            </div>

            {/* Caption */}
            {!isImageLoading && (
              <div className="text-center px-6 py-4 bg-white">
                <p className="text-dusty-mauve font-medium text-lg">
                  {selectedPhoto.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
