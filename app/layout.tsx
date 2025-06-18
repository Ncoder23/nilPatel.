import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { BottomPlayer } from "@/components/bottom-player"
import { PlayerProvider } from "@/components/player-context"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nil Patel ",
  description: "Software Engineer portfolio showcasing projects, skills, and experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PlayerProvider>
            <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto bg-black">{children}</main>
                <RightSidebar />
              </div>
              <BottomPlayer />
              
            </div>
          </PlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
