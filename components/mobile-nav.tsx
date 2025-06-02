"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Briefcase,
  Code,
  Download,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: Code },
    { name: "Experience", href: "/experience", icon: Briefcase },
    { name: "Skills", href: "/skills", icon: Sparkles },
    { name: "Education", href: "/education", icon: BookOpen },
    { name: "Resume", href: "/resume", icon: FileText },
  ]

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-neutral-300">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-neutral-800 border-r border-neutral-700">
          <div className="p-4 border-b border-neutral-700 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                NP
              </div>
              <div>
                <h1 className="font-bold">Nilkumar Patel</h1>
                <p className="text-xs text-neutral-400">Software Engineer</p>
              </div>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-red-600 text-white" : "text-neutral-300 hover:bg-neutral-700 hover:text-white"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}

            <div className="pt-4 mt-4 border-t border-neutral-700">
              <a
                href="/resume.pdf"
                download
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                <Download className="mr-3 h-5 w-5" />
                Download Resume
              </a>
            </div>
          </nav>

          <div className="p-4 border-t border-neutral-700">
            <div className="flex justify-center space-x-4">
              <a
                href="https://linkedin.com/in/nilkumarpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/nilkumarpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="mailto:nkp.gpt@gmail.com" className="text-neutral-400 hover:text-red-500 transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
              <a href="tel:+14082072011" className="text-neutral-400 hover:text-red-500 transition-colors">
                <Phone className="h-5 w-5" />
                <span className="sr-only">Phone</span>
              </a>
            </div>
            <div className="mt-4 text-center text-xs text-neutral-500">© 2025 Nilkumar Patel</div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
