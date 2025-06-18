"use client"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SkipBack, Play, SkipForward, Shuffle, Repeat, Volume2, Cast, List, Maximize2, Pause } from "lucide-react"
import { createClient } from "@/lib/supabase"
import type { Song } from "@/lib/supabase"
import { usePathname } from "next/navigation"
import { usePlayer } from "./player-context"

const SONGS_PER_PAGE = 10

export  function BottomPlayer() {
  const supabase = createClient();
  const pathname = usePathname();
  const { setPlayerRef } = usePlayer();
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
  const hasPlayedWelcome = useRef(false)

  useEffect(() => {
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("Supabase Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    fetchInitialSongs()
  }, [])

  // Clear session data when user leaves the website
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('hasPlayedWelcome')
      localStorage.removeItem('welcomeTrackTimestamp')
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User is leaving the page (tab switch, minimize, etc.)
        localStorage.removeItem('hasPlayedWelcome')
        localStorage.removeItem('welcomeTrackTimestamp')
      }
    }

    // Listen for page unload/close
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    // Listen for tab visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Expose player functions through context
  useEffect(() => {
    setPlayerRef({
      playSpecificSong,
      playWelcomeTrack,
      resetWelcomeTrack,
      clearSessionData,
      setPlayerRef: () => {} // This is just to satisfy the interface
    })
  }, [songs, setPlayerRef])

  // Check if welcome track should play (with time-based reset)
  const shouldPlayWelcomeTrack = () => {
    const hasPlayed = localStorage.getItem('hasPlayedWelcome')
    const timestamp = localStorage.getItem('welcomeTrackTimestamp')
    
    if (!hasPlayed) return true
    
    // If timestamp exists, check if more than 30 minutes have passed
    if (timestamp) {
      const lastPlayed = parseInt(timestamp)
      const now = Date.now()
      const thirtyMinutes = 30 * 60 * 1000 // 30 minutes in milliseconds
      
      if (now - lastPlayed > thirtyMinutes) {
        // More than 30 minutes have passed, allow welcome track to play again
        localStorage.removeItem('hasPlayedWelcome')
        localStorage.removeItem('welcomeTrackTimestamp')
        return true
      }
    }
    
    return false
  }

  // Mark welcome track as played with timestamp
  const markWelcomeTrackAsPlayed = () => {
    localStorage.setItem('hasPlayedWelcome', 'true')
    localStorage.setItem('welcomeTrackTimestamp', Date.now().toString())
  }

  // Check if we should play welcome track on home page
  useEffect(() => {
    if (pathname === "/" && songs.length > 0 && !hasPlayedWelcome.current) {
      // Check if we should play welcome track
      if (shouldPlayWelcomeTrack()) {
        hasPlayedWelcome.current = true;
        markWelcomeTrackAsPlayed();
        // Play welcome track immediately since songs are loaded
        playWelcomeTrack();
      }
    }
  }, [pathname, songs]);

  const playWelcomeTrack = async () => {
    try {
      // First try to find a song with "Welcome" in the title
      const welcomeSong = songs.find(song => 
        song.title.toLowerCase().includes('welcome')
      );
      
      if (welcomeSong) {
        setCurrentSong(welcomeSong);
        setIsPlaying(true);
        return;
      }

      // If no welcome song found, try to fetch it specifically
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', '%welcome%')
        .single();

      if (error) {
        console.log("No welcome song found, playing first available song");
        if (songs.length > 0) {
          setCurrentSong(songs[0]);
          setIsPlaying(true);
        }
        return;
      }

      if (data) {
        // Add to songs array if not already there
        const existingSong = songs.find(s => s.id === data.id);
        if (!existingSong) {
          setSongs(prev => [data, ...prev]);
        }
        setCurrentSong(data);
        setIsPlaying(true);
      } else {
        // If no welcome song found in database, play first available song
        if (songs.length > 0) {
          setCurrentSong(songs[0]);
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error playing welcome track:', error);
      // Fallback to first song
      if (songs.length > 0) {
        setCurrentSong(songs[0]);
        setIsPlaying(true);
      }
    }
  }

  const fetchInitialSongs = async () => {
    console.log("Fetching initial songs...")
    setIsLoading(true)
    setError(null)
    
    try {
      // First, let's verify the connection

      const { data: songs, error: testError } = await supabase.from('songs').select('*')
      
      console.log("Songs query result:", songs, testError)

      if (testError) {
        console.error("Supabase error:", testError.message)
        setError(testError.message)
        throw testError
      }

      if (!songs || songs.length === 0) {
        console.log("No songs found in the database")
        setError("No songs found in the database")
        return
      }
      
      setSongs(songs)
      setHasMore(songs.length === SONGS_PER_PAGE)
      
      // Don't automatically set the first song - let the welcome track logic handle it
      // Only set a current song if we're not on the home page or if welcome track has already been played
      const isOnHomePage = pathname === "/"
      
      if (!isOnHomePage || !shouldPlayWelcomeTrack()) {
        if (songs && songs.length > 0) {
          console.log("Setting current song:", songs[0])
          setCurrentSong(songs[0])
        }
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
      const supabase = createClient();
      
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

  const playSpecificSong = async (songTitle: string) => {
    try {
      // First check if the song is already in our loaded songs
      const existingSong = songs.find(song => 
        song.title.toLowerCase().includes(songTitle.toLowerCase())
      );
      
      if (existingSong) {
        setCurrentSong(existingSong);
        setIsPlaying(true);
        return;
      }

      // If not found, fetch it from the database
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${songTitle}%`)
        .single();

      if (error) {
        console.error('Song not found:', songTitle);
        return;
      }

      if (data) {
        // Add to songs array if not already there
        const existingSongInArray = songs.find(s => s.id === data.id);
        if (!existingSongInArray) {
          setSongs(prev => [data, ...prev]);
        }
        setCurrentSong(data);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing specific song:', error);
    }
  }

  const resetWelcomeTrack = () => {
    localStorage.removeItem('hasPlayedWelcome')
    localStorage.removeItem('welcomeTrackTimestamp')
    hasPlayedWelcome.current = false
  }

  const clearSessionData = () => {
    localStorage.removeItem('hasPlayedWelcome')
    localStorage.removeItem('welcomeTrackTimestamp')
    hasPlayedWelcome.current = false
  }

  return (
    <div className="bg-black border-t border-gray-800 p-4">
      
      {isLoading && (
        <div className="text-gray-500 text-sm mb-2">
          Loading...
        </div>
      )}
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
