"use client"

import { Search, Cast, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="flex items-center justify-between px-2 sm:px-4 py-2 bg-black border-b border-gray-800 h-14 sm:h-16">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-2 sm:space-x-3 min-w-fit">
        <Button variant="ghost" size="icon" className="p-2 h-10 w-10 flex items-center justify-center">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>
        <Link href="/" className="flex items-center">
          <span className="font-semibold text-lg sm:text-xl text-red-500 leading-none">nCoder</span>
        </Link>
      </div>

      {/* Center: Search Bar (hidden on mobile) */}
      <div className="flex-1 hidden sm:flex items-center justify-center mx-2 sm:mx-8">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects, skills, experience..."
            className="pl-10 bg-gray-900 border-gray-700 focus:border-red-500 h-10 text-base"
          />
        </div>
      </div>

      {/* Right: (Optional future actions) */}
      {/* <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Cast className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full bg-purple-600 p-0">
          <User className="w-4 h-4" />
        </Button>
      </div> */}
    </header>
  )
}
