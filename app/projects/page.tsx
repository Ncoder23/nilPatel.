import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, MoreVertical, Clock, Eye } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      title: "AI Job Recommendation System",
      description: "Microservice architecture with hybrid recommendation engine",
      technologies: ["Python", "FastAPI", "AWS Lambda", "Docker"],
      duration: "3:39",
      views: "1.2K",
      thumbnail: "AI",
    },
    {
      title: "nDrive: File Management",
      description: "High-concurrency distributed file management system",
      technologies: ["Java", "Spring Boot", "AWS"],
      duration: "3:45",
      views: "856",
      thumbnail: "ND",
    },
    {
      title: "Sustainability Credit Exchange",
      description: "Full-stack trading platform for sustainability credits",
      technologies: ["Django", "React", "AWS", "Netlify"],
      duration: "4:12",
      views: "2.1K",
      thumbnail: "SC",
    },
    {
      title: "HackVok: Multilingual TikTok Clone",
      description: "Finalist at TikTok TechJam 2024",
      technologies: ["Flutter", "Firebase", "Node.js"],
      duration: "2:58",
      views: "3.4K",
      thumbnail: "HV",
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Projects Playlist</h1>
        <p className="text-gray-400">A collection of innovative software solutions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all group cursor-pointer"
          >
            <CardContent className="p-4">
              <div className="relative aspect-video bg-gradient-to-br from-red-900/30 to-gray-900 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{project.thumbnail}</span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                    <Play className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                  {project.duration}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-sm line-clamp-2">{project.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{project.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.slice(0, 2).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      +{project.technologies.length - 2}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <Button variant="ghost" size="sm" className="text-xs">
                  <Play className="w-3 h-3 mr-1" />
                  Play
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
