"use client"
import { createContext, useContext, useRef } from "react"

interface PlayerContextType {
  playSpecificSong: (songTitle: string) => Promise<void>
  playWelcomeTrack: () => Promise<void>
  resetWelcomeTrack: () => void
  clearSessionData: () => void
  setPlayerRef: (ref: PlayerContextType | null) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const playerRef = useRef<PlayerContextType | null>(null)

  const playSpecificSong = async (songTitle: string) => {
    if (playerRef.current?.playSpecificSong) {
      await playerRef.current.playSpecificSong(songTitle)
    }
  }

  const playWelcomeTrack = async () => {
    if (playerRef.current?.playWelcomeTrack) {
      await playerRef.current.playWelcomeTrack()
    }
  }

  const resetWelcomeTrack = () => {
    if (playerRef.current?.resetWelcomeTrack) {
      playerRef.current.resetWelcomeTrack()
    }
  }

  const clearSessionData = () => {
    if (playerRef.current?.clearSessionData) {
      playerRef.current.clearSessionData()
    }
  }

  const setPlayerRef = (ref: PlayerContextType | null) => {
    playerRef.current = ref
  }

  return (
    <PlayerContext.Provider value={{ playSpecificSong, playWelcomeTrack, resetWelcomeTrack, clearSessionData, setPlayerRef }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
} 