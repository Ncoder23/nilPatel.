import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SkillsPage() {
  const skills = {
    languages: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "NoSQL", "HTML", "CSS"],
    frameworks: ["Django", "React", "Redux", "Node.js", "Spring Boot", "RESTful APIs", "GraphQL", "Tailwind"],
    databases: ["PostgreSQL", "MySQL", "Redis", "Kafka", "MongoDB"],
    tools: ["AWS", "GCP", "Docker", "Kubernetes", "Git", "GitHub", "TensorFlow", "PyTorch", "NumPy", "Jira"],
  }

  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8">Skills</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillCard title="Programming Languages" skills={skills.languages} />
        <SkillCard title="Frameworks & Libraries" skills={skills.frameworks} />
        <SkillCard title="Databases & Messaging" skills={skills.databases} />
        <SkillCard title="Tools & Technologies" skills={skills.tools} />
      </div>

      <div className="mt-8">
        <Card className="bg-neutral-800 border-neutral-700 overflow-hidden">
          <div className="border-l-4 border-red-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Certification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.4 12L17.2 8.2L15.8 6.8L12 10.6L8.2 6.8L6.8 8.2L10.6 12L6.8 15.8L8.2 17.2L12 13.4L15.8 17.2L17.2 15.8L13.4 12Z"
                      fill="#FF9900"
                    />
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                      fill="#232F3E"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">AWS Certified Solutions Architect Associate</h3>
                  <p className="text-sm text-neutral-400">Amazon Web Services</p>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}

function SkillCard({ title, skills }: { title: string; skills: string[] }) {
  return (
    <Card className="bg-neutral-800 border-neutral-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} className="bg-neutral-700 hover:bg-neutral-600 text-neutral-200 border-none">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
