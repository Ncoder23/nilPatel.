"use client"

import { Search, Cast, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-black border-b border-gray-800">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="p-2">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>

        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">NP</span>
          </div>
          <span className="font-semibold text-lg">Code Rhapsody</span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects, skills, experience..."
            className="pl-10 bg-gray-900 border-gray-700 focus:border-red-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Cast className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full bg-purple-600 p-0">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
