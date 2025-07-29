"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteracted(true)
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current || !hasInteracted) return

    if (audioRef.current.paused) {
      audioRef.current.play().catch(console.error)
    } else {
      audioRef.current.pause()
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <audio ref={audioRef} loop preload="auto" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
        <source src="/audio/happy-birthday.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className="bg-ivory/95 backdrop-blur-sm border-dusty-mauve/50 border-2 hover:bg-dusty-mauve/20 text-dusty-mauve font-semibold shadow-lg"
        disabled={!hasInteracted}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleMute}
        className="bg-ivory/95 backdrop-blur-sm border-dusty-mauve/50 border-2 hover:bg-dusty-mauve/20 text-dusty-mauve font-semibold shadow-lg"
        disabled={!hasInteracted}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}
