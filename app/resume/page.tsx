import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Mail, Phone } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Resume</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>

      <Card className="bg-neutral-800 border-neutral-700 mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">Nilkumar Patel</h2>
              <h3 className="text-lg text-neutral-300">Software Engineer</h3>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-neutral-300">
                <Mail className="h-4 w-4 mr-2 text-red-500" />
                <a href="mailto:nkp.gpt@gmail.com" className="hover:text-red-500">
                  nkp.gpt@gmail.com
                </a>
              </div>
              <div className="flex items-center text-neutral-300">
                <Phone className="h-4 w-4 mr-2 text-red-500" />
                <a href="tel:+14082072011" className="hover:text-red-500">
                  +1 408-207-2011
                </a>
              </div>
            </div>

            <p className="text-neutral-300">
              Software Engineer with expertise in full-stack development, AI/ML applications, and cloud infrastructure.
              Passionate about building scalable, efficient software solutions that solve real-world problems.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-red-500">Experience</h2>
          <div className="space-y-6">
            <ResumeItem
              title="Software Engineer"
              organization="SCU Frugal Innovation Hub"
              period="Apr 2024 - Present"
              location="Santa Clara, CA"
              points={[
                "Led 5-member team developing Flutter app with Node.js REST APIs and Firebase backend",
                "Implemented JWT authentication and achieved 30% faster API response times",
                "Developed real-time location tracking using OpenStreetMap, serving 5,000+ users",
              ]}
            />

            <ResumeItem
              title="Software Engineer"
              organization="Advancedware Technologies Pvt. Ltd."
              period="Nov 2021 - Mar 2023"
              location="Gujarat, India"
              points={[
                "Developed accounting/CRM platform using TypeScript and React with Python/Django backend",
                "Managed MVC architecture handling 100K+ daily transactions",
                "Implemented Redux for state management, improving responsiveness by 30%",
                "Enhanced PostgreSQL indexing, reducing response times by 500ms",
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-red-500">Education</h2>
          <div className="space-y-6">
            <ResumeItem
              title="Master of Science, Computer Science & Engineering"
              organization="Santa Clara University"
              period="Apr 2023 - Mar 2025"
              location="Santa Clara, CA"
              points={[
                "Relevant Coursework: Data Structures, Algorithm design & analysis, Object-oriented design, Artificial Intelligence, Machine Learning, Deep Learning",
                "Student Assistant: Provided technical support for Linux/Windows environments, managing distributed remote systems",
              ]}
            />

            <ResumeItem
              title="Bachelor of Engineering, Information Technology"
              organization="Gujarat Technological University"
              period="Jun 2018 - May 2022"
              location="Gujarat, India"
              points={["International Society of Automation Core Committee Member & Web Master (Jun 2021 - May 2022)"]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-red-500">Projects</h2>
          <div className="space-y-6">
            <ResumeItem
              title="AI Job Recommendation System"
              points={[
                "Implemented microservice architecture with hybrid recommendation engine (TF-IDF, KNN, GPT embeddings)",
                "Deployed using FastAPI, Docker, AWS Lambda, RDS, S3, CloudWatch",
              ]}
            />

            <ResumeItem
              title="nDrive: File Management"
              points={[
                "Built high-concurrency distributed model with 30% query optimization",
                "Implemented CI/CD with GitHub Actions and efficient file I/O operations",
              ]}
            />

            <ResumeItem
              title="Sustainability Credit Exchange"
              points={[
                "Developed full-stack trading platform using Django, DRF, Celery, Redis, React.js, Material-UI",
                "Created data visualizations with Recharts.js and deployed on AWS, Netlify",
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-red-500">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Programming Languages</h3>
              <p className="text-neutral-300">Python, JavaScript, TypeScript, Java, SQL, NoSQL, HTML, CSS</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Frameworks</h3>
              <p className="text-neutral-300">
                Django, React, Redux, Node.js, Spring Boot, RESTful APIs, GraphQL, Tailwind
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Databases</h3>
              <p className="text-neutral-300">PostgreSQL, MySQL, Redis, Kafka, MongoDB</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tools/Technologies</h3>
              <p className="text-neutral-300">
                AWS, GCP, Docker, Kubernetes, Git, GitHub, TensorFlow, PyTorch, NumPy, Jira
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-red-500">Certification</h2>
          <p className="text-neutral-300">AWS Certified Solutions Architect Associate</p>
        </section>
      </div>
    </div>
  )
}

function ResumeItem({
  title,
  organization,
  period,
  location,
  points,
}: {
  title: string
  organization?: string
  period?: string
  location?: string
  points: string[]
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className="flex justify-between items-start flex-wrap gap-2">
          <h3 className="font-semibold">
            {title}
            {organization ? ` - ${organization}` : ""}
          </h3>
          {period && location && (
            <div className="text-sm text-neutral-400">
              {period} | {location}
            </div>
          )}
        </div>
      </div>

      <ul className="list-disc pl-5 text-sm text-neutral-300 space-y-1">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  )
}
