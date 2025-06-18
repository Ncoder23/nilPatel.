"use client"
import { Button } from "@/components/ui/button"
import { usePlayer } from "./player-context"
import { Play, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

export function TestWelcomeButton() {
  const { playWelcomeTrack, resetWelcomeTrack, clearSessionData } = usePlayer()
  const [sessionStatus, setSessionStatus] = useState<string>("")

  useEffect(() => {
    const updateSessionStatus = () => {
      const hasPlayed = localStorage.getItem('hasPlayedWelcome')
      const timestamp = localStorage.getItem('welcomeTrackTimestamp')
      
      if (!hasPlayed) {
        setSessionStatus("Ready to play welcome track")
      } else if (timestamp) {
        const lastPlayed = parseInt(timestamp)
        const now = Date.now()
        const thirtyMinutes = 30 * 60 * 1000
        const timeLeft = Math.max(0, thirtyMinutes - (now - lastPlayed))
        const minutesLeft = Math.ceil(timeLeft / (60 * 1000))
        
        if (timeLeft > 0) {
          setSessionStatus(`Welcome track played ${minutesLeft} min ago`)
        } else {
          setSessionStatus("Ready to play welcome track (time expired)")
        }
      } else {
        setSessionStatus("Welcome track played")
      }
    }

    updateSessionStatus()
    const interval = setInterval(updateSessionStatus, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleTestWelcome = () => {
    // Reset the welcome track flag
    resetWelcomeTrack()
    // Trigger the welcome track
    setTimeout(() => {
      playWelcomeTrack()
    }, 100)
  }

  const handleClearSession = () => {
    clearSessionData()
    // Force re-render
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-400">{sessionStatus}</span>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleTestWelcome}
        className="text-xs"
      >
        <Play className="w-3 h-3 mr-1" />
        Test Welcome
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleClearSession}
        className="text-xs"
      >
        <RefreshCw className="w-3 h-3 mr-1" />
        Clear Session
      </Button>
    </div>
  )
} 