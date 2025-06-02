import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, MoreVertical, ThumbsUp, Share, Download } from "lucide-react"

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      {/* Featured Project Video */}
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-red-900/20 to-black rounded-lg border border-red-500/30 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Job Recommendation System</h1>
                <p className="text-gray-400">Nilkumar Patel • 2024</p>
              </div>
            </div>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Play className="w-4 h-4 mr-2" />
                View Project
              </Button>
              <Button size="sm" variant="ghost">
                <ThumbsUp className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Share className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <Button size="sm" variant="ghost">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Project Description */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">AI Job Recommendation System</h2>
          <p className="text-gray-400">Nilkumar Patel • 2024 • Microservice Architecture</p>
        </div>

        <p className="text-gray-300">
          A sophisticated job recommendation system using a hybrid approach combining TF-IDF, KNN, and GPT embeddings.
          Built with microservice architecture for scalability and deployed using Docker containers on AWS Lambda.
        </p>

        <div className="flex flex-wrap gap-2">
          {["Python", "FastAPI", "Docker", "AWS Lambda", "RDS", "S3", "CloudWatch"].map((tech) => (
            <span key={tech} className="px-2 py-1 bg-gray-800 rounded-full text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* More Projects Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">More from Nilkumar Patel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectCard
            title="nDrive: File Management"
            description="High-concurrency distributed system"
            technologies={["Java", "Spring Boot", "AWS"]}
            duration="3:45"
          />
          <ProjectCard
            title="Sustainability Credit Exchange"
            description="Full-stack trading platform"
            technologies={["Django", "React", "AWS"]}
            duration="4:12"
          />
          <ProjectCard
            title="HackVok: TikTok Clone"
            description="Multilingual video platform"
            technologies={["Flutter", "Firebase", "Node.js"]}
            duration="2:58"
          />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  title,
  description,
  technologies,
  duration,
}: {
  title: string
  description: string
  technologies: string[]
  duration: string
}) {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="aspect-video bg-gradient-to-br from-red-900/20 to-gray-900 rounded mb-3 flex items-center justify-center relative">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">{title.charAt(0)}</span>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 px-1 rounded text-xs">{duration}</div>
        </div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-gray-400 mb-2">{description}</p>
        <div className="flex flex-wrap gap-1">
          {technologies.slice(0, 2).map((tech) => (
            <span key={tech} className="px-1 py-0.5 bg-gray-800 rounded text-xs">
              {tech}
            </span>
          ))}
          {technologies.length > 2 && (
            <span className="px-1 py-0.5 bg-gray-800 rounded text-xs">+{technologies.length - 2}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
