"use client"

import type React from "react"
import { useState } from "react"
import { FaComments, FaRocket, FaHeadset, FaCheck, FaArrowLeft, FaArrowRight, FaCloudUploadAlt } from "react-icons/fa"
import {
  FaSeedling,
  FaTree,
  FaStar,
  FaGavel,
  FaLandmark,
  FaScaleBalanced,
  FaUsers,
  FaPerson,
  FaEarthAmericas,
} from "react-icons/fa6"

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    yearsExperience: "",
    experience: "",
    interests: [] as string[],
    goals: "",
    avatar: "",
  })

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const experienceLevels = [
    { value: "beginner", label: "Beginner", icon: <FaSeedling /> },
    { value: "intermediate", label: "Intermediate", icon: <FaTree /> },
    { value: "advanced", label: "Advanced", icon: <FaStar /> },
  ]

  const debateInterests = [
    { id: "policy", label: "Policy Debate", icon: <FaGavel /> },
    { id: "parliamentary", label: "Parliamentary", icon: <FaLandmark /> },
    { id: "lincoln-douglas", label: "Lincoln-Douglas", icon: <FaScaleBalanced /> },
    { id: "public-forum", label: "Public Forum", icon: <FaUsers /> },
    { id: "mock-trial", label: "Mock Trial", icon: <FaPerson /> },
    { id: "world-schools", label: "World Schools", icon: <FaEarthAmericas /> },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="relative">
        <img
          src="https://public.readdy.ai/ai/img_res/bd6b89c56c748c0d3ef0a08457105690.jpg"
          className="absolute top-0 left-0 w-full h-[400px] object-cover opacity-30"
          alt="Background pattern"
        />
        <div className="relative container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-16">
              <div className="inline-flex items-center justify-center space-x-3 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-purple-100">
                  <FaComments className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-2xl" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  D23
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                    .ai
                  </span>
                </h1>
              </div>
              <h2 className="text-5xl font-bold text-gray-800 mb-6">Begin Your Debate Journey</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join our AI-powered platform to enhance your debate skills and connect with fellow debaters worldwide
              </p>
            </header>
            <div className="flex justify-between items-center mb-16">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-semibold transition-all duration-500 ${
                      currentStep >= step
                        ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-200/50"
                        : "bg-white/80 text-gray-400 border border-gray-100"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div className="relative w-32 mx-4">
                      <div className="absolute w-full h-[2px] bg-gray-100 rounded"></div>
                      <div
                        className={`absolute w-full h-[2px] rounded transition-all duration-700 ${
                          currentStep > step
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-100"
                            : "scale-x-0"
                        }`}
                        style={{ transformOrigin: "left" }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-12 mb-12">
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Personal Information</h3>
                    <p className="text-gray-600">Help us customize your debate experience</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-3">Your Name</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 rounded-xl bg-gray-50/30 border-none focus:ring-2 focus:ring-purple-500/20 text-gray-800 placeholder:text-gray-400 transition-all duration-300 hover:bg-gray-50/50"
                        placeholder="Enter your preferred name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-3">School/Institution</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 rounded-xl bg-gray-50/50 border-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder:text-gray-400"
                        placeholder="Where do you debate?"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-3">Years of Experience</label>
                      <input
                        type="number"
                        className="w-full px-6 py-4 rounded-xl bg-gray-50/50 border-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder:text-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="How many years have you been debating?"
                        value={formData.yearsExperience}
                        onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 mt-12">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaRocket className="text-purple-600 text-2xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Why personalize?</h4>
                        <p className="text-gray-600 leading-relaxed">
                          Your profile information helps us tailor AI-powered strategies, match you with suitable
                          practice partners, and provide personalized feedback to accelerate your growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Experience Level</h3>
                    <p className="text-gray-600">Tell us about your debate journey</p>
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                    {experienceLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setFormData({ ...formData, experience: level.value })}
                        className={`group p-8 rounded-2xl transition-all duration-500 ${
                          formData.experience === level.value
                            ? "bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/50 shadow-[0_10px_40px_-15px_rgba(139,92,246,0.3)]"
                            : "bg-white/80 hover:bg-purple-50/30 border border-gray-100 hover:border-purple-200/50 hover:shadow-[0_10px_40px_-15px_rgba(139,92,246,0.1)]"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center space-y-6">
                          <div
                            className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-500 ${
                              formData.experience === level.value
                                ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
                                : "bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600"
                            }`}
                          >
                            <span className="text-3xl">{level.icon}</span>
                          </div>
                          <span className="font-semibold text-lg text-gray-800">{level.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-8 mt-12">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-6">Recent Achievements</h4>
                      <div className="space-y-4">
                        {[
                          "National Tournament Participation",
                          "Regional Competition Wins",
                          "Team Leadership Experience",
                          "Mentorship Programs",
                        ].map((achievement) => (
                          <label
                            key={achievement}
                            className="flex items-center space-x-4 p-4 rounded-xl bg-white/50 border border-gray-100 cursor-pointer hover:border-purple-200 transition-all duration-300"
                          >
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-700">{achievement}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-6">Core Strengths</h4>
                      <div className="space-y-6">
                        {[
                          { name: "Research & Analysis", level: 85 },
                          { name: "Public Speaking", level: 75 },
                          { name: "Critical Thinking", level: 90 },
                          { name: "Rebuttal Skills", level: 80 },
                        ].map((skill) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-gray-700">{skill.name}</span>
                              <span className="text-gray-500">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Debate Interests</h3>
                    <p className="text-gray-600">Select the formats you're most interested in</p>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {debateInterests.map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`group p-8 rounded-2xl transition-all duration-500 ${
                          formData.interests.includes(interest.id)
                            ? "bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 shadow-xl shadow-purple-100/50"
                            : "bg-white/50 hover:bg-purple-50/30 border-2 border-gray-100 hover:border-purple-200"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center space-y-6">
                          <div
                            className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-500 ${
                              formData.interests.includes(interest.id)
                                ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
                                : "bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600"
                            }`}
                          >
                            <span className="text-3xl">{interest.icon}</span>
                          </div>
                          <span className="font-semibold text-lg text-gray-800">{interest.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-8 mt-12">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-6">Preferred Topics</h4>
                      <div className="space-y-4">
                        {[
                          "International Relations",
                          "Economic Policy",
                          "Social Justice",
                          "Environmental Issues",
                          "Technology Ethics",
                          "Healthcare Reform",
                        ].map((topic) => (
                          <label
                            key={topic}
                            className="flex items-center space-x-4 p-4 rounded-xl bg-white/50 border border-gray-100 cursor-pointer hover:border-purple-200 transition-all duration-300"
                          >
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-700">{topic}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-6">Practice Schedule</h4>
                      <div className="space-y-4">
                        <div className="p-6 rounded-xl bg-white/50 border border-gray-100">
                          <h5 className="font-medium text-gray-800 mb-4">Preferred Time</h5>
                          <div className="space-y-3">
                            {["Weekday Evenings", "Weekend Mornings", "Weekend Afternoons"].map((time) => (
                              <label key={time} className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name="practiceTime"
                                  className="w-4 h-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-gray-700">{time}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="p-6 rounded-xl bg-white/50 border border-gray-100">
                          <h5 className="font-medium text-gray-800 mb-4">Session Duration</h5>
                          <div className="space-y-3">
                            {["30 minutes", "1 hour", "2 hours"].map((duration) => (
                              <label key={duration} className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name="sessionDuration"
                                  className="w-4 h-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-gray-700">{duration}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Set Your Goals</h3>
                    <p className="text-gray-600">Define your debate journey milestones</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-6">Short-term Goals (3 months)</h4>
                      <div className="space-y-4">
                        {[
                          "Improve speaking confidence",
                          "Master argument structure",
                          "Enhance research skills",
                          "Develop better rebuttals",
                          "Join tournament preparation",
                        ].map((goal) => (
                          <label
                            key={goal}
                            className="flex items-center space-x-4 p-4 rounded-xl bg-white/50 border border-gray-100 cursor-pointer hover:border-purple-200 transition-all duration-300"
                          >
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-700">{goal}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-6">Long-term Goals (1 year)</h4>
                      <div className="space-y-4">
                        {[
                          "Win regional competitions",
                          "Lead debate workshops",
                          "Mentor junior debaters",
                          "Qualify for nationals",
                          "Build debate portfolio",
                        ].map((goal) => (
                          <label
                            key={goal}
                            className="flex items-center space-x-4 p-4 rounded-xl bg-white/50 border border-gray-100 cursor-pointer hover:border-purple-200 transition-all duration-300"
                          >
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-700">{goal}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-12">
                    <h4 className="text-lg font-semibold text-gray-800 mb-6">Personal Statement</h4>
                    <textarea
                      className="w-full px-6 py-4 rounded-xl bg-gray-50/50 border-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder:text-gray-400"
                      rows={4}
                      placeholder="Share your specific debate goals and what you hope to achieve..."
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-8 mt-12">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-6">Weekly Commitment</h4>
                      <div className="p-6 rounded-xl bg-white/50 border border-gray-100">
                        <div className="space-y-4">
                          {["2-4 hours", "4-6 hours", "6-8 hours", "8+ hours"].map((time) => (
                            <label key={time} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="weeklyCommitment"
                                className="w-4 h-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                              />
                              <span className="text-gray-700">{time}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-6">Profile Picture</h4>
                      <label className="block w-full aspect-square rounded-xl bg-gray-50/50 border-2 border-dashed border-gray-200 cursor-pointer hover:bg-gray-50/70 transition-all duration-300">
                        <div className="flex flex-col items-center justify-center h-full">
                          <FaCloudUploadAlt className="text-4xl text-gray-400 mb-4" />
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-2">PNG, JPG or GIF (MAX. 800x800px)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                setFormData({ ...formData, avatar: reader.result as string })
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-8 py-4 bg-white text-gray-700 rounded-button hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 border border-gray-200"
                  >
                    <FaArrowLeft />
                    <span>Previous Step</span>
                  </button>
                )}
                <div className="ml-auto">
                  {currentStep < 4 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-button hover:opacity-90 transition-all duration-300 flex items-center space-x-3 shadow-[0_10px_40px_-15px_rgba(139,92,246,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.7)]"
                    >
                      <span>Continue</span>
                      <FaArrowRight />
                    </button>
                  ) : (
                    <a href="/registration-success">
                      <button
                        onClick={() => {
                          console.log("Form submitted:", formData)
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-button hover:opacity-90 transition-all duration-300 flex items-center space-x-3 shadow-xl shadow-purple-200/50"
                      >
                        <span>Complete Setup</span>
                        <FaCheck />
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <footer className="text-center">
              <div className="flex items-center justify-center space-x-3 text-gray-600">
                <FaHeadset className="text-purple-500" />
                <span>Need assistance?</span>
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Contact Support
                </a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage

