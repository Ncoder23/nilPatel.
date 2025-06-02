import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ExperiencePage() {
  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8">Experience</h1>

      <div className="space-y-8">
        <ExperienceCard
          company="SCU Frugal Innovation Hub"
          role="Software Engineer"
          period="Apr 2024 - Present"
          location="Santa Clara, CA"
          description={[
            "Led 5-member team developing Flutter app with Node.js REST APIs and Firebase backend",
            "Implemented JWT authentication and achieved 30% faster API response times",
            "Developed real-time location tracking using OpenStreetMap, serving 5,000+ users",
            "Utilized Provider MVVM architecture and implemented QA with Jest and Supertest",
          ]}
          technologies={["Flutter", "Node.js", "Firebase", "JWT", "OpenStreetMap", "Jest", "Supertest"]}
        />

        <ExperienceCard
          company="Advancedware Technologies Pvt. Ltd."
          role="Software Engineer"
          period="Nov 2021 - Mar 2023"
          location="Gujarat, India"
          description={[
            "Developed accounting/CRM platform using TypeScript and React with Python/Django backend",
            "Managed MVC architecture handling 100K+ daily transactions",
            "Implemented Redux for state management, improving responsiveness by 30%",
            "Optimized React Context API and developed secure Django RESTful APIs",
            "Enhanced PostgreSQL indexing, reducing response times by 500ms",
            "Created ETL pipelines using Google Cloud Tasks, processing 1M+ records with 20% efficiency increase",
            "Implemented CI/CD workflows for streamlined deployment",
          ]}
          technologies={[
            "TypeScript",
            "React",
            "Python",
            "Django",
            "Redux",
            "PostgreSQL",
            "Google Cloud Tasks",
            "CI/CD",
          ]}
        />

        <ExperienceCard
          company="Santa Clara University"
          role="Student Assistant"
          period="Apr 2023 - Present"
          location="Santa Clara, CA"
          description={[
            "Provided technical support for Linux/Windows environments",
            "Managed distributed remote systems",
            "Assisted students and faculty with technical issues",
            "Maintained and updated lab equipment and software",
          ]}
          technologies={["Linux", "Windows", "Remote Systems Management"]}
        />
      </div>
    </div>
  )
}

function ExperienceCard({
  company,
  role,
  period,
  location,
  description,
  technologies,
}: {
  company: string
  role: string
  period: string
  location: string
  description: string[]
  technologies: string[]
}) {
  return (
    <Card className="bg-neutral-800 border-neutral-700">
      <CardContent className="p-6 space-y-4">
        <div>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h2 className="text-xl font-semibold">
              {role} - {company}
            </h2>
            <div className="text-sm text-neutral-400">
              {period} | {location}
            </div>
          </div>
        </div>

        <ul className="list-disc pl-5 text-neutral-300 space-y-2">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-neutral-700 text-neutral-200 border-neutral-600">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
