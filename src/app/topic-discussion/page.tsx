"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  FaArrowLeft,
  FaCog,
  FaTimes,
  FaMicrophone,
  FaMicrophoneSlash,
  FaHandPaper,
  FaReply,
  FaQuoteRight,
  FaStar,
  FaExpandAlt,
  FaChevronUp,
  FaChevronDown,
  FaFilePdf,
  FaFileAlt,
  FaChartBar,
  FaPlus,
  FaCloudUploadAlt,
} from "react-icons/fa"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

const TopicDiscussionRoom: React.FC = () => {
  const [messageInput, setMessageInput] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [currentPhase, setCurrentPhase] = useState("Opening Arguments")
  const [remainingTime, setRemainingTime] = useState(300)
  const [showSettings, setShowSettings] = useState(false)
  const [showResourcePanel, setShowResourcePanel] = useState(true)
  const [showAddResource, setShowAddResource] = useState(false)
  const [newResource, setNewResource] = useState({
    title: "",
    type: "",
    source: "",
    file: null as File | null,
    description: "",
  })

  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!newResource.title || !newResource.type || !newResource.source || !newResource.description) {
      return
    }

    // Here you would typically handle the file upload and form submission
    console.log("New Resource:", newResource)

    // Reset form and close modal
    setNewResource({
      title: "",
      type: "",
      source: "",
      file: null,
      description: "",
    })
    setShowAddResource(false)
  }

  const [currentSpeaker, setCurrentSpeaker] = useState("Dr. Sarah Chen")
  const [showVotingPanel, setShowVotingPanel] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages] = useState([
    {
      id: 1,
      user: "Dr. Sarah Chen",
      role: "Pro",
      content:
        "AI in healthcare has shown remarkable potential for improving diagnostic accuracy. Studies indicate a 95% accuracy rate in early disease detection.",
      timestamp: "14:30",
      type: "argument",
    },
    {
      id: 2,
      user: "Prof. James Wilson",
      role: "Con",
      content:
        "While accuracy is important, we must consider the ethical implications of AI making critical healthcare decisions. Human oversight remains crucial.",
      timestamp: "14:32",
      type: "rebuttal",
    },
    {
      id: 3,
      user: "Dr. Sarah Chen",
      role: "Pro",
      content:
        "Human oversight is indeed maintained in all AI healthcare implementations. AI serves as a support tool, not a replacement for medical professionals.",
      timestamp: "14:35",
      type: "argument",
    },
  ])

  const [participants] = useState([
    {
      name: "Dr. Sarah Chen",
      role: "Pro",
      status: "Speaking",
      rating: 4.9,
      badges: ["Healthcare Expert", "AI Specialist"],
      avatar: "SC",
    },
    {
      name: "Prof. James Wilson",
      role: "Con",
      status: "Next",
      rating: 4.8,
      badges: ["Ethics Committee", "Research Lead"],
      avatar: "JW",
    },
    {
      name: "Dr. Emily Thompson",
      role: "Moderator",
      status: "Active",
      rating: 4.9,
      badges: ["Senior Moderator"],
      avatar: "ET",
    },
  ])

  const [resources] = useState([
    {
      title: "AI in Healthcare: 2025 Report",
      type: "PDF",
      source: "WHO Digital Health Division",
      added: "2 hours ago",
    },
    {
      title: "Medical AI Ethics Guidelines",
      type: "Document",
      source: "International Medical Board",
      added: "1 hour ago",
    },
    {
      title: "Healthcare AI Implementation Studies",
      type: "Research",
      source: "Global Health Tech Journal",
      added: "30 minutes ago",
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const chartDom = document.getElementById("votingChart")
    if (chartDom) {
      const chart = (window as any).echarts?.init(chartDom)
      if (chart) {
        const option = {
          animation: false,
          color: ["#7C3AED", "#4F46E5"],
          tooltip: {
            trigger: "axis",
          },
          grid: {
            top: 10,
            right: 10,
            bottom: 20,
            left: 30,
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: ["Argument Quality", "Evidence Use", "Rebuttal", "Overall"],
            axisLabel: {
              interval: 0,
              rotate: 30,
            },
          },
          yAxis: {
            type: "value",
            max: 10,
          },
          series: [
            {
              name: "Pro",
              type: "bar",
              data: [8.5, 9.0, 8.7, 8.7],
            },
            {
              name: "Con",
              type: "bar",
              data: [8.3, 8.8, 8.9, 8.6],
            },
          ],
        }
        chart.setOption(option)
      }
    }
  }, [])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("")
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
                <FaArrowLeft />
              </Link>
              <h1 className="text-xl font-bold text-gray-800">AI Ethics in Healthcare: Implementation & Oversight</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-xl font-mono text-purple-600">{formatTime(remainingTime)}</div>
              <div>
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <FaCog />
                </button>
                {showSettings && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-3xl p-8 w-[480px] max-h-[90vh] overflow-y-auto">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Settings</h3>
                        <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
                          <FaTimes />
                        </button>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">Audio & Video</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Microphone</span>
                              <select className="bg-gray-50 rounded-xl px-4 py-2 text-gray-700">
                                <option>Default Microphone</option>
                                <option>External Microphone</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Speaker</span>
                              <select className="bg-gray-50 rounded-xl px-4 py-2 text-gray-700">
                                <option>Default Speaker</option>
                                <option>External Speaker</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">Notifications</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Sound Alerts</span>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                                <input type="checkbox" className="sr-only" id="sound-toggle" />
                                <div className="w-6 h-6 absolute left-0 bg-white rounded-full transition-transform duration-200 transform translate-x-0"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Desktop Notifications</span>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-purple-600">
                                <input type="checkbox" className="sr-only" id="desktop-toggle" defaultChecked />
                                <div className="w-6 h-6 absolute left-0 bg-white rounded-full transition-transform duration-200 transform translate-x-6"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">Display</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Language</span>
                              <select className="bg-gray-50 rounded-xl px-4 py-2 text-gray-700">
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Theme</span>
                              <select className="bg-gray-50 rounded-xl px-4 py-2 text-gray-700">
                                <option>Light</option>
                                <option>Dark</option>
                                <option>System</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Font Size</span>
                              <select className="bg-gray-50 rounded-xl px-4 py-2 text-gray-700">
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">Keyboard Shortcuts</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between text-gray-600">
                              <span>Toggle Mute</span>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded">Ctrl + M</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-600">
                              <span>Raise Hand</span>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded">Ctrl + H</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-600">
                              <span>Send Message</span>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded">Ctrl + Enter</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-8">
                        <button
                          onClick={() => setShowSettings(false)}
                          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-button hover:bg-gray-200 transition-all whitespace-nowrap"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            // Handle save changes
                            setShowSettings(false)
                          }}
                          className="px-6 py-2.5 bg-purple-600 text-white rounded-button hover:bg-purple-700 transition-all whitespace-nowrap"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-purple-100/20 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Participants</h3>
              <div className="space-y-4">
                {participants.map((participant, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                        {participant.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{participant.name}</div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-sm ${participant.role === "Pro" ? "text-green-600" : participant.role === "Con" ? "text-red-600" : "text-purple-600"}`}
                          >
                            {participant.role}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{participant.status}</span>
                        </div>
                      </div>
                      {participant.status === "Speaking" && (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {participant.badges.map((badge, badgeIndex) => (
                        <span key={badgeIndex} className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-purple-100/20 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Discussion</h2>
                  <p className="text-gray-600">Current Phase: {currentPhase}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isMuted ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                    } hover:bg-gray-200 transition-all cursor-pointer`}
                  >
                    {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                  </button>
                  <button
                    onClick={() => setIsHandRaised(!isHandRaised)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isHandRaised ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600"
                    } hover:bg-gray-200 transition-all cursor-pointer`}
                  >
                    <FaHandPaper />
                  </button>
                </div>
              </div>
              <div className="h-[500px] overflow-y-auto mb-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-800">{message.user}</span>
                        <span className={`text-sm ${message.role === "Pro" ? "text-green-600" : "text-red-600"}`}>
                          {message.role}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="text-gray-400 hover:text-purple-600 transition-colors">
                        <FaReply />
                      </button>
                      <button className="text-gray-400 hover:text-purple-600 transition-colors">
                        <FaQuoteRight />
                      </button>
                      <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                        <FaStar />
                      </button>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your argument..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-button hover:bg-purple-700 transition-all cursor-pointer whitespace-nowrap"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-purple-100/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Live Voting Results</h3>
                <button onClick={() => setShowVotingPanel(!showVotingPanel)} className="text-purple-600">
                  <FaExpandAlt />
                </button>
              </div>
              <div className="h-64" id="votingChart"></div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-purple-100/20 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Resources</h3>
                <button
                  onClick={() => setShowResourcePanel(!showResourcePanel)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showResourcePanel ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              {showResourcePanel && (
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                          {resource.type === "PDF" ? (
                            <FaFilePdf />
                          ) : resource.type === "Document" ? (
                            <FaFileAlt />
                          ) : (
                            <FaChartBar />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{resource.title}</div>
                          <div className="text-sm text-gray-600">{resource.source}</div>
                          <div className="text-xs text-gray-500 mt-1">Added {resource.added}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <>
                    <button
                      onClick={() => setShowAddResource(true)}
                      className="w-full px-4 py-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-all cursor-pointer"
                    >
                      <FaPlus className="inline mr-2" />
                      Add Resource
                    </button>

                    {showAddResource && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-3xl p-8 w-[480px] max-h-[90vh] overflow-y-auto">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Add New Resource</h3>
                            <button
                              onClick={() => setShowAddResource(false)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <FaTimes />
                            </button>
                          </div>

                          <form onSubmit={handleResourceSubmit} className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Title</label>
                              <input
                                type="text"
                                value={newResource.title}
                                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                              <div className="relative">
                                <select
                                  value={newResource.type}
                                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20 appearance-none"
                                  required
                                >
                                  <option value="">Select Type</option>
                                  <option value="PDF">PDF</option>
                                  <option value="Document">Document</option>
                                  <option value="Research">Research</option>
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                  <FaChevronDown className="text-gray-400" />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                              <input
                                type="text"
                                value={newResource.source}
                                onChange={(e) => setNewResource({ ...newResource, source: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">File Upload</label>
                              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setNewResource({ ...newResource, file: e.target.files[0] })
                                    }
                                  }}
                                  className="hidden"
                                  id="file-upload"
                                  accept=".pdf,.doc,.docx,.txt"
                                />
                                <label
                                  htmlFor="file-upload"
                                  className="cursor-pointer text-purple-600 hover:text-purple-700"
                                >
                                  <FaCloudUploadAlt className="text-2xl mb-2 mx-auto" />
                                  <p>Click to upload or drag and drop</p>
                                  <p className="text-sm text-gray-500">PDF, DOC, DOCX, TXT (Max 10MB)</p>
                                </label>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                              <textarea
                                value={newResource.description}
                                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                                rows={4}
                                required
                              ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 mt-8">
                              <button
                                type="button"
                                onClick={() => setShowAddResource(false)}
                                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-button hover:bg-gray-200 transition-all whitespace-nowrap"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-6 py-2.5 bg-purple-600 text-white rounded-button hover:bg-purple-700 transition-all whitespace-nowrap"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicDiscussionRoom

