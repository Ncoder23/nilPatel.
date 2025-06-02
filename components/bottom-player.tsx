"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SkipBack, Play, SkipForward, Shuffle, Repeat, Volume2, Cast, List, Maximize2, Pause } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Song } from "@/lib/supabase"

const SONGS_PER_PAGE = 10

export function BottomPlayer() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [currentPage, setCurrentPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("Supabase Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    fetchInitialSongs()
  }, [])

  const fetchInitialSongs = async () => {
    console.log("Fetching initial songs...")
    setIsLoading(true)
    setError(null)
    
    try {
      // First, let's verify the connection
      const { data: testData, error: testError } = await supabase
        .from('songs')
        .select('count')
      
      console.log("Test query result:", testData, testError)

      // Now fetch the actual songs
      const { data, error } = await supabase
        .from('songs')
        .select('*')
      
      console.log("Songs query result:", data, error)

      if (error) {
        console.error("Supabase error:", error)
        setError(error.message)
        throw error
      }

      if (!data || data.length === 0) {
        console.log("No songs found in the database")
        setError("No songs found in the database")
        return
      }
      
      setSongs(data)
      setHasMore(data.length === SONGS_PER_PAGE)
      
      if (data && data.length > 0) {
        console.log("Setting current song:", data[0])
        setCurrentSong(data[0])
      }
    } catch (error) {
      console.error("Error in fetchInitialSongs:", error)
      setError(error instanceof Error ? error.message : "An error occurred while fetching songs")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMoreSongs = async () => {
    if (!hasMore) return

    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(
          currentPage * SONGS_PER_PAGE,
          (currentPage + 1) * SONGS_PER_PAGE - 1
        )

      if (error) throw error

      if (data && data.length > 0) {
        setSongs(prev => [...prev, ...data])
        setCurrentPage(prev => prev + 1)
        setHasMore(data.length === SONGS_PER_PAGE)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching more songs:', error)
    }
  }

  const fetchSpecificSong = async (songId: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('id', songId)
        .single()

      if (error) throw error

      if (data) {
        // Check if the song is already in our loaded songs
        const existingSongIndex = songs.findIndex(s => s.id === songId)
        if (existingSongIndex === -1) {
          // If not, add it to our songs array
          setSongs(prev => [data, ...prev])
        }
        setCurrentSong(data)
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Error fetching specific song:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const playNext = async () => {
    if (!currentSong || songs.length === 0) return

    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    
    // If we're near the end of the loaded songs, fetch more
    if (currentIndex >= songs.length - 2 && hasMore) {
      await fetchMoreSongs()
    }

    const nextIndex = (currentIndex + 1) % songs.length
    setCurrentSong(songs[nextIndex])
    setIsPlaying(true)
  }

  const playPrevious = () => {
    if (!currentSong || songs.length === 0) return
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    setCurrentSong(songs[prevIndex])
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-black border-t border-gray-800 p-4">
      {error && (
        <div className="text-red-500 text-sm mb-2">
          Error: {error}
        </div>
      )}
      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={playNext}
          autoPlay={isPlaying}
        />
      )}
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-3 w-1/4">
          {currentSong && (
            <>
              <div className="min-w-0">
                <div className="font-medium text-sm truncate">{currentSong.title}</div>
              </div>
            </>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-1/2">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={playPrevious}>
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              size="sm"
              className="w-8 h-8 rounded-full bg-white text-black hover:bg-gray-200 p-0"
              onClick={togglePlay}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={playNext}>
              <SkipForward className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              className="flex-1"
              onValueChange={(value) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = value[0]
                  setCurrentTime(value[0])
                }
              }}
            />
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume and Options */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <Button variant="ghost" size="sm">
            <List className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Cast className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-20"
              onValueChange={handleVolumeChange}
            />
          </div>
          <Button variant="ghost" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
