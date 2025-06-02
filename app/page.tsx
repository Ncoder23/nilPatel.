import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <div className="relative">
        <div className="bg-gradient-to-br from-red-900/20 to-black rounded-lg border border-red-500/30 overflow-hidden">
          
            <div className="p-6 text-left ">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
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

        {/* Contact & Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-red-900/20 to-black">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@example.com
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Github className="w-4 h-4 mr-2" />
                  github.com/nilkumar
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Linkedin className="w-4 h-4 mr-2" />
                  linkedin.com/in/nilkumar
                </Button>
              </div>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </div>
  )
}
