import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import { HomePageClient } from "@/components/home-page-client"
import { TestWelcomeButton } from "@/components/test-welcome-button"

export default function Home() {
  return (
    <HomePageClient>
      <div className="p-6 space-y-6">

        {/* Profile Section */}
        <div className="relative">
          <div className="bg-gradient-to-br from-red-900/20 to-black rounded-lg border border-red-500/30 overflow-hidden">
            
              <div className="p-6 text-left ">
                
              <p className="text-gray-300 mb-4">
                I'm a passionate Software Engineer with expertise in building scalable applications and microservices.
                My journey in technology has led me to work on diverse projects ranging from AI-powered systems to
                distributed file management solutions.
              </p>
              <p className="text-gray-300">
                I specialize in full-stack development with a focus on creating efficient, maintainable, and
                user-friendly applications. My experience spans across various technologies and frameworks,
                allowing me to adapt quickly to new challenges and deliver high-quality solutions.
              </p>
                
              </div>
            
          </div>
        </div>

        {/* About Content */}
        <div className="space-y-6">
          

          

          {/* Skills Overview */}
          <Card className="bg-gradient-to-br from-red-900/20 to-black">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Full Stack Development",
                  "Microservices",
                  "Cloud Architecture",
                  "AI/ML",
                  "System Design",
                  "DevOps",
                  "Database Design",
                  "API Development"
                ].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gradient-to-br from-red-900/20 to-black rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </HomePageClient>
  )
}
