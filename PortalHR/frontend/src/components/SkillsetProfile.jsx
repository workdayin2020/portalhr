import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { USER_API_END_POINT } from '@/utils/constant'

const specializationOptions = ["CS/IT", "Civil", "Mech", "EEE"]
const technicalOptions = ["Java Full Stack", "MERN Stack", "DevOps"]

const questionsByCategory = {
  "Personal / Psychology / Aptitude": [
    "How do you handle stress and pressure?",
    "Describe your problem-solving approach",
    "How do you manage time effectively?",
    "What are your leadership qualities?",
    "How do you handle conflicts?",
    "Describe your communication style",
    "What motivates you?",
    "How do you adapt to change?",
    "Describe your ideal work environment",
    "What are your career goals?",
  ],
  Technical: {
    "Java Full Stack": [
      "How do you rate yourself in Core Java?",
      "Rate your expertise in Spring Boot",
      "How comfortable are you with RESTful APIs?",
      "Rate your understanding of JPA/Hibernate",
      "How well do you know Maven/Gradle?",
      "Rate your experience with Microservices",
      "How proficient are you in SQL?",
      "Rate your frontend skills (HTML/CSS/JS)",
      "How well do you understand Design Patterns?",
      "Rate your testing knowledge (JUnit/Mockito)",
    ],
    "MERN Stack": [
      "How do you rate yourself in MongoDB?",
      "Rate your expertise in Express.js",
      "How comfortable are you with React.js?",
      "Rate your Node.js knowledge",
      "How well do you know REST APIs?",
      "Rate your experience with State Management",
      "How proficient are you in JavaScript/TypeScript?",
      "Rate your understanding of NoSQL concepts",
      "How well do you know Git?",
      "Rate your testing knowledge (Jest/RTL)",
    ],
    DevOps: [
      "How do you rate yourself in Docker?",
      "Rate your expertise in Kubernetes",
      "How comfortable are you with CI/CD?",
      "Rate your AWS/Cloud knowledge",
      "How well do you know Linux?",
      "Rate your experience with Jenkins",
      "How proficient are you in Shell Scripting?",
      "Rate your understanding of Monitoring tools",
      "How well do you know Version Control?",
      "Rate your Infrastructure as Code knowledge",
    ],
  },
  "Professional / Responsibility": [
    "How do you ensure code quality?",
    "Describe your experience with Agile",
    "How do you handle deadlines?",
    "Experience with code reviews?",
    "How do you document your work?",
    "Approach to mentoring juniors?",
    "How do you stay updated with technology?",
    "Experience with client communication?",
    "How do you handle production issues?",
    "Describe your project management skills",
  ],
}

const SkillsetProfile = () => {
  const [specialization, setSpecialization] = useState("")
  const [technical, setTechnical] = useState("")
  const [questions, setQuestions] = useState({
    "Personal / Psychology / Aptitude": Array(10).fill({ question: "", rating: "" }),
    Technical: Array(10).fill({ question: "", rating: "" }),
    "Professional / Responsibility": Array(10).fill({ question: "", rating: "" }),
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`${USER_API_END_POINT}/assessment`, {
          method: "GET",
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch assessment data")
        }

        const data = await response.json()
        console.log("Fetched assessment data:", data)

        if (data.success) {
          setSpecialization(data.specialization || "")
          setTechnical(data.technical || "")

          // Initialize questions with the fetched data or empty arrays with proper structure
          const initialQuestions = {
            "Personal / Psychology / Aptitude": Array(10)
              .fill(null)
              .map((_, i) => ({
                question: questionsByCategory["Personal / Psychology / Aptitude"][i],
                rating: data.questions?.["Personal / Psychology / Aptitude"]?.[i]?.rating || "",
              })),
            Technical: Array(10)
              .fill(null)
              .map((_, i) => ({
                question: (data.technical && questionsByCategory["Technical"][data.technical]?.[i]) || "",
                rating: data.questions?.["Technical"]?.[i]?.rating || "",
              })),
            "Professional / Responsibility": Array(10)
              .fill(null)
              .map((_, i) => ({
                question: questionsByCategory["Professional / Responsibility"][i],
                rating: data.questions?.["Professional / Responsibility"]?.[i]?.rating || "",
              })),
          }
          setQuestions(initialQuestions)
        }
      } catch (error) {
        console.error("Error fetching assessment:", error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAssessmentData()
  }, []) // Remove technical from the dependency array

  const handleTechnicalChange = (value) => {
    setTechnical(value)
    // Update technical questions when technical skill changes
    setQuestions((prev) => ({
      ...prev,
      Technical: Array(10)
        .fill(null)
        .map((_, i) => ({
          question: value ? questionsByCategory["Technical"][value][i] : "",
          rating: "", // Reset rating when technical option changes
        })),
    }))
  }

  const handleRatingChange = (category, index, value) => {
    const numValue = value === "" ? "" : Math.min(10, Math.max(0, Number.parseInt(value) || 0))
    setQuestions((prev) => ({
      ...prev,
      [category]: prev[category].map((q, i) => (i === index ? { ...q, rating: numValue } : q)),
    }))
  }

  const handleSubmit = async () => {
    try {
      // Prepare the data for submission
      const submissionData = {
        specialization,
        technical,
        questions: {
          "Personal / Psychology / Aptitude": questions["Personal / Psychology / Aptitude"].map((q) => ({
            question: q.question,
            rating: q.rating,
          })),
          Technical: questions["Technical"].map((q) => ({
            question: q.question,
            rating: q.rating,
          })),
          "Professional / Responsibility": questions["Professional / Responsibility"].map((q) => ({
            question: q.question,
            rating: q.rating,
          })),
        },
      }

      console.log("Submitting data:", submissionData)

      const response = await fetch(`${USER_API_END_POINT}/assessment/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit assessment")
      }

      const data = await response.json()
      if (data.success) {
        alert("Skills assessment submitted successfully!")
      } else {
        throw new Error(data.message || "Failed to submit assessment")
      }
    } catch (error) {
      console.error("Error submitting assessment:", error)
      alert(error.message || "Failed to submit assessment. Please try again.")
    }
  }

  const renderQuestionSection = (category) => {
    const questionList =
      category === "Technical"
        ? technical
          ? questionsByCategory[category][technical]
          : []
        : questionsByCategory[category]

    return (
     
      <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
        <div className="bg-white rounded-lg shadow-sm border p-4 h-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold">{category}</span>
            <span className="text-gray-600 text-sm mx-2">10/10</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {questionList.map((question, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-1 text-sm pr-2">
                      {index + 1}. {question || "Select a technical skill"}
                    </td>
                    <td className="py-1 pl-2 w-14">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={questions[category][index]?.rating ?? ""}
                        onChange={(e) => handleRatingChange(category, index, e.target.value)}
                        className="w-14 text-center border rounded p-1 text-sm"
                        placeholder="0-10"
                        disabled={category === "Technical" && !technical}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">Error loading assessment data. Please try refreshing the page.</div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Nature of Job Interested</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
          <Select onValueChange={setSpecialization} value={specialization}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializationOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Technical</label>
          <Select onValueChange={handleTechnicalChange} value={technical}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Technical Skills" />
            </SelectTrigger>
            <SelectContent>
              {technicalOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold mb-4">Auto generated Interview Questions : Score Obtained</h3>

      <div className="flex flex-wrap -mx-2 mb-6">
        {renderQuestionSection("Personal / Psychology / Aptitude")}
        {renderQuestionSection("Technical")}
        {renderQuestionSection("Professional / Responsibility")}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Assessment
        </button>
      </div>
    </div>
  )
}

export default SkillsetProfile

