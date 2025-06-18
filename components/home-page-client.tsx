"use client"
import { useEffect, useRef } from "react"
import { usePlayer } from "./player-context"

interface HomePageClientProps {
  children: React.ReactNode
}

export function HomePageClient({ children }: HomePageClientProps) {
  // Removed automatic welcome track trigger - now handled by BottomPlayer
  return <>{children}</>
} 