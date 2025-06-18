"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Library, Plus, Heart, TrendingUp, User, Briefcase, GraduationCap, FileText, Music, Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  const portfolioSections = [
    { name: "About Me", href: "/", icon: User },
    { name: "Projects", href: "/projects", icon: TrendingUp },
    { name: "Experience", href: "/experience", icon: Briefcase },
    { name: "Skills", href: "/skills", icon: Heart },
    { name: "Education", href: "/education", icon: GraduationCap },
    { name: "Resume", href: "/resume", icon: FileText },
    // { name: "Songs", href: "/songs", icon: Music },
  ]

  return (
    <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
      

      <div className="px-4 py-2 space-y-1">
        {portfolioSections.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-900"
              }`}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </div>

      <div className="px-4 py-2 space-y-1 text-sm text-gray-500">
        <div className="px-3 py-1">Connect with Me</div>
        <div className="space-y-1">
          <Link href="mailto:nkp.gpt@gmail.com" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              <Mail className="w-4 h-4 mr-2" />
              nkp.gpt@gmail.com
            </Button>
          </Link>
          <Link href="https://github.com/Ncoder23" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              <Github className="w-4 h-4 mr-2" />
              github.com/Ncoder23
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/patel-nilkumar/" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              <Linkedin className="w-4 h-4 mr-2" />
              <span className="text-xs/4">linkedin.com/in/patel-nilkumar</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
