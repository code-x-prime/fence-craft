'use client'

import { useEffect, useRef, useState } from 'react'
import { IconPlayerPauseFilled, IconPlayerPlayFilled, IconVolume, IconVolumeOff } from '@tabler/icons-react'

export const WORKSHOP_VIDEO_URL = 'https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/video.mp4'

/**
 * Portrait (9:16) workshop clip. The frame keeps the video's own ratio so nothing is
 * cropped or stretched; it plays muted while on screen and pauses when scrolled away
 * (or when the visitor prefers reduced motion, until they press play).
 */
export function PortraitVideo({ className = '' }: { className?: string }) {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const el = video.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const el = video.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  const btn =
    'grid size-11 place-items-center rounded-lg bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25'

  return (
    <div className={`relative aspect-9/16 overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10 ${className}`}>
      <video
        ref={video}
        src={WORKSHOP_VIDEO_URL}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label="FENCECRAFT workshop video"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/60 to-transparent p-3">
        <button type="button" onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'} className={btn}>
          {playing ? <IconPlayerPauseFilled size={18} aria-hidden /> : <IconPlayerPlayFilled size={18} aria-hidden />}
        </button>
        <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Turn sound on' : 'Turn sound off'} className={btn}>
          {muted ? <IconVolumeOff size={18} aria-hidden /> : <IconVolume size={18} aria-hidden />}
        </button>
      </div>
    </div>
  )
}
