"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SkipBack, Play, SkipForward, Shuffle, Repeat, Volume2, Cast, List, Maximize2 } from "lucide-react"

export function BottomPlayer() {
  return (
    <div className="bg-black border-t border-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-3 w-1/4">
          <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">AI</span>
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">AI Job Recommendation System</div>
            <div className="text-gray-400 text-xs truncate">Nilkumar Patel</div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-1/2">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button size="sm" className="w-8 h-8 rounded-full bg-white text-black hover:bg-gray-200 p-0">
              <Play className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <SkipForward className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400">0:01</span>
            <Slider value={[5]} max={100} step={1} className="flex-1" />
            <span className="text-xs text-gray-400">3:39</span>
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
            <Slider value={[70]} max={100} step={1} className="w-20" />
          </div>
          <Button variant="ghost" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
