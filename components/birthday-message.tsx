"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export function BirthdayMessage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("birthday-message")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="birthday-message" className="py-20 px-4 bg-ivory">
      <div className="max-w-4xl mx-auto">
        <Card
          className={`p-8 md:p-12 bg-ivory/95 backdrop-blur-sm border-dusty-mauve/30 border-2 shadow-2xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-dusty-mauve mb-8 drop-shadow-md">
              A Special Message For You
            </h2>
            <div className="prose prose-lg max-w-none text-dusty-mauve">
              <p className="text-xl md:text-2xl leading-relaxed mb-6 font-medium">
                On this special day, we celebrate not just another year of your life, but another year of the joy,
                laughter, and love you bring to everyone around you.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6 font-medium">
                Your kindness lights up every room you enter, your smile brightens even the cloudiest days, and your
                friendship is a gift that keeps on giving. Today, we honor the amazing person you are and all the
                wonderful memories we've shared together.
              </p>
              <p className="text-lg md:text-xl leading-relaxed font-medium">
                May this new year of your life be filled with endless adventures, beautiful moments, and dreams that
                come true. You deserve all the happiness in the world!
              </p>
            </div>
            <div className="mt-8 text-2xl font-semibold text-dusty-mauve">🎈 With love and best wishes 🎈</div>
          </div>
        </Card>
      </div>
    </section>
  )
}
