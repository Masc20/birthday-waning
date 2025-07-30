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
               Happy 20th Birthday, Waniiiing! 🎉
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6 font-medium">
                First of all, I want to thank you for the wonderful friendship we've built over the years. Your kindness, support, and laughter have made my life so much brighter. 
                You've inspired me to change and do something (not gonna disclose it)
              </p>
              <p className="text-lg md:text-xl leading-relaxed font-medium">
                May this new year of your life be filled with endless adventures, beautiful moments, and dreams that come true. 
                My wish for you is that you continue to shine bright and inspire those around you, and to continue pursuing your passions (don't undang², daghan naghuwat nimo sa stage baya). 
                You deserve all the happiness in the world!
              </p>
            </div>
            <div className="mt-8 text-2xl font-semibold text-dusty-mauve">🎈 With love and best wishes 🎈</div>
            <div className="mt-2 text-lg font-medium text-dusty-mauve">-Mel</div>
          </div>
        </Card>
      </div>
    </section>
  )
}
