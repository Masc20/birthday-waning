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
    alt: "Joana Angel Version",
    caption: '"One of the very small people"',
    message: "You are one of the very small people who made me realize many things big and small. Thank you is not enough for how much you opened my eyes. I will always cherish the memories we made together. Good luck on your future endeavors and lablayp nimo gurl. -Mel",
  },
  {
    id: 2,
    src: "/gallery/pacute.jpg",
    alt: "DND person",
    caption: "Rapper daw",
    message: "Happy birthday to our sleepyhead, talkative nga naay pagka rapper, independent gurlalo?, and pretty friend waningning. You're a strong and amazing girl I know.  Just stay who you are, and I  wish you all the best today and always. Enjoy your day because you deserve it☺️. And no matter how tough the world is, keep fighting. We're always here for you, no matter what happens (sabi ng naka DND HAHAHAHAHAHAHHA) -ate she",
  },
  {
    id: 3,
    src: "/gallery/meraki.jpg",
    alt: "MERAKI BAND",
    caption: "MERAKI BAND ️",
    message: "First Intrams together, I think. Nag buy tag ticket duha para makakita sa kung crush and to support the band. Our first time pud na dugay makauli, thankyouu so much bb, kay gi ubanan ko nimo kani na time to witness and to support me delulu moment. -Yang",
  },
  {
    id: 4,
    src: "/gallery/partytime.jpeg",
    alt: "Unique daw",
    caption: "Unique daw",
    message: "Happiest birthday waning , may your birthday be as cute as unique as you🎂 - ate cha",
  },
  {
    id: 5,
    src: "/gallery/meow.png",
    alt: "Meow",
    caption: "CUTIE",
    message: "Everytime makakita kag cat, imo jud e bebe. Cutie kay ka basta makakita kag cat. Katong time nga nanganak akung cat kay wajud ka duhaduha ni adto ug balay para makakita. Cutieee kaymooo, also miss na nako si sweetieeee -Yang",
  },
  {
    id: 6,
    src: "/gallery/wink-wink.jpg",
    alt: "Group photo",
    caption: "'Stay Humble'😜",
    message: "Happy birthday, Joana! May you enjoy your day as much as we enjoy your company. I wish you even more blessings in life. Always spread positive vibes. Stay pretty — and remember, not as a bully (sa akoa). -Miss Jehn",
  },
   {
    id: 7,
    src: "/gallery/linux.jpg",
    alt: "Group photo",
    caption: "Pray sad lagy panagsa ",
    message: "Marie, Wishing you the happiest of birthdays and a year filled with health, happiness, and success. Always remember to pray in times of down and trouble for courage. Be strong for reaching your dreams. Happy Birthday once again and Godbless. -Sir Rye",
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
          Gallery 📷
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
                  fill
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

      {/* Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-lg overflow-hidden shadow-xl relative w-fit max-w-[90vw]"
          >
            <div className="flex flex-col items-center w-[600px] max-w-[90vw]">
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

              {/* Loader */}
              {isImageLoading && (
                <div className="flex items-center justify-center w-[600px] h-[400px] max-w-[90vw] max-h-[80vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-dusty-mauve border-opacity-50" />
                </div>
              )}

              {/* Image */}
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

              {/* Text Content */}
              {!isImageLoading && (
                <div className="text-center px-6 py-4 w-full">
                  <p className="text-dusty-mauve font-medium text-lg w-full break-words">
                    {selectedPhoto.caption}
                  </p>
                  {selectedPhoto.message && (
                    <p className="text-dusty-mauve text-sm mt-2 w-full break-words">
                      {selectedPhoto.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
