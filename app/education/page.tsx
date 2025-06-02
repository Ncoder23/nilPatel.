import { Card, CardContent } from "@/components/ui/card"

export default function EducationPage() {
  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8">Education</h1>

      <div className="space-y-8">
        <EducationCard
          institution="Santa Clara University"
          degree="Master of Science, Computer Science & Engineering"
          period="Apr 2023 - Mar 2025"
          location="Santa Clara, CA"
          courses={[
            "Data Structures",
            "Algorithm design & analysis",
            "Object-oriented design",
            "Artificial Intelligence",
            "Machine Learning",
            "Deep Learning",
          ]}
          note="Student Assistant: Provided technical support for Linux/Windows environments, managing distributed remote systems."
        />

        <EducationCard
          institution="Gujarat Technological University"
          degree="Bachelor of Engineering, Information Technology"
          period="Jun 2018 - May 2022"
          location="Gujarat, India"
          courses={[
            "Data Structures & Algorithms",
            "Database Management Systems",
            "Operating Systems",
            "Computer Networks",
            "Web Development",
          ]}
          note="International Society of Automation Core Committee Member & Web Master (Jun 2021 - May 2022)"
        />
      </div>
    </div>
  )
}

function EducationCard({
  institution,
  degree,
  period,
  location,
  courses,
  note,
}: {
  institution: string
  degree: string
  period: string
  location: string
  courses: string[]
  note?: string
}) {
  return (
    <Card className="bg-neutral-800 border-neutral-700">
      <CardContent className="p-6 space-y-4">
        <div>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h2 className="text-xl font-semibold">{institution}</h2>
            <div className="text-sm text-neutral-400">
              {period} | {location}
            </div>
          </div>
          <p className="text-lg text-red-500 mt-1">{degree}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-neutral-200 mb-2">Relevant Coursework:</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {courses.map((course, index) => (
              <div key={index} className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2"></div>
                <span className="text-sm text-neutral-300">{course}</span>
              </div>
            ))}
          </div>
        </div>

        {note && (
          <div className="pt-2 border-t border-neutral-700">
            <p className="text-sm text-neutral-300">{note}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
