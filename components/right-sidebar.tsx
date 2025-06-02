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
    <div className="w-80 bg-black border-l border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        {/* <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <button className="text-white font-medium border-b-2 border-white pb-2">UP NEXT</button>
            <button className="text-gray-400 pb-2">SKILLS</button>
            <button className="text-gray-400 pb-2">RELATED</button>
          </div>
          <Button variant="outline" size="sm" className="border-gray-600">
            Save
          </Button>
        </div> */}
{/* 
        <div className="text-sm text-gray-400 mb-2">Playing from</div>
        <div className="font-medium">Portfolio Highlights</div> */}

        {/* <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            <div className="font-medium">Autoplay</div>
            <div className="text-gray-400">Add similar content to the end of the queue</div>
          </div>
          <div className="w-10 h-6 bg-blue-600 rounded-full flex items-center justify-end pr-1">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div> */}
      </div>

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
