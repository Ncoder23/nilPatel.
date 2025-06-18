"use client"

import { Button } from "@/components/ui/button"
import { MoreVertical, Play } from "lucide-react"

export function RightSidebar() {
  const upNext = [
    {
      title: "nDrive: File Management",
      artist: "Java & Spring Boot",
      duration: "3:45",
      thumbnail: "N",
    },
    {
      title: "Sustainability Credit Exchange",
      artist: "Django & React",
      duration: "4:12",
      thumbnail: "S",
    },
    {
      title: "HackVok: TikTok Clone",
      artist: "Flutter & Firebase",
      duration: "2:58",
      thumbnail: "H",
    },
    {
      title: "AWS Solutions Architect",
      artist: "Cloud Certification",
      duration: "2:45",
      thumbnail: "A",
    },
    {
      title: "SCU Innovation Hub",
      artist: "Team Leadership",
      duration: "4:16",
      thumbnail: "S",
    },
    {
      title: "Advancedware Technologies",
      artist: "Full-Stack Development",
      duration: "2:41",
      thumbnail: "A",
    },
    {
      title: "Master's in CS",
      artist: "Santa Clara University",
      duration: "3:49",
      thumbnail: "M",
    },
    {
      title: "Bachelor's in IT",
      artist: "Gujarat Tech University",
      duration: "2:27",
      thumbnail: "B",
    },
    {
      title: "Bachelor's in IT",
      artist: "Gujarat Tech University",
      duration: "2:27",
      thumbnail: "B",
    },
    {
      title: "Bachelor's in IT",
      artist: "Gujarat Tech University",
      duration: "2:27",
      thumbnail: "B",
    },
    {
      title: "Bachelor's in IT",
      artist: "Gujarat Tech University",
      duration: "2:27",
      thumbnail: "B",
    },
    {
      title: "Bachelor's in IT",
      artist: "Gujarat Tech University",
      duration: "2:27",
      thumbnail: "B",
    },
    {
      title: "Bachelor's in IT",
      artist: "Gujarat Tech University",
      duration: "2:27",
      thumbnail: "B",
    },
    
  ]

  return (
    <div className="hidden lg:flex w-80 bg-black border-l border-gray-800 flex-col">


      <div className="flex-1 overflow-auto">
        {upNext.map((item, index) => (
          <div key={index} className="flex items-center p-3 hover:bg-gray-900 group cursor-pointer">
            <Button variant="ghost" size="sm" className="mr-3 opacity-0 group-hover:opacity-100 w-8 h-8 p-0">
              <Play className="w-4 h-4" />
            </Button>

            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-white font-bold">{item.thumbnail}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{item.title}</div>
              <div className="text-gray-400 text-xs truncate">{item.artist}</div>
            </div>

            <div className="text-gray-400 text-xs mr-2">{item.duration}</div>

            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 w-8 h-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* <div className="p-4 border-t border-gray-800">
        <div className="text-sm text-gray-400">Autoplay is on</div>
      </div> */}
    </div>
  )
}
