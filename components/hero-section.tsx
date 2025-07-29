"use client"

import { useState, useEffect } from "react"
import { Heart, Sparkles } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ivory via-nude-rose to-dusty-mauve">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-dusty-mauve/30 animate-float-${i % 4}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${Math.random() * 20 + 15}px`,
            }}
          />
        ))}
      </div>

      {/* Sparkles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={i}
            className={`absolute text-nude-rose/40 animate-sparkle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              fontSize: `${Math.random() * 15 + 10}px`,
            }}
          />
        ))}
      </div>

      <div
        className={`text-center z-10 px-4 transition-all duration-2000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-6xl md:text-8xl font-bold text-dusty-mauve mb-6 animate-bounce-slow drop-shadow-lg">
          🎉 Happy Birthday! 🎉
        </h1>
        <p className="text-2xl md:text-3xl text-dusty-mauve font-semibold mb-8 drop-shadow-md bg-ivory/60 rounded-lg px-6 py-3">
          Celebrating another year of wonderful you!
        </p>
        <div className="animate-pulse">
          <div className="inline-block bg-dusty-mauve/40 backdrop-blur-sm rounded-full px-8 py-4 border-2 border-dusty-mauve/30">
            <span className="text-dusty-mauve font-bold text-lg drop-shadow-sm">🎂 Make a wish! 🎂</span>
          </div>
        </div>
      </div>
    </section>
  )
}
