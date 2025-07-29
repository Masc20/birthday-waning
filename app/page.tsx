import { HeroSection } from "@/components/hero-section"
import { PhotoGallery } from "@/components/photo-gallery"
import { BirthdayMessage } from "@/components/birthday-message"
import { MusicPlayer } from "@/components/music-player"

export default function BirthdayPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <MusicPlayer />
      <HeroSection />
      <BirthdayMessage />
      <PhotoGallery />
    </main>
  )
}
