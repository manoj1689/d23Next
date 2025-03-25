"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  FaArrowLeft,
  FaCog,
  FaSignOutAlt,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaDesktop,
  FaHandPaper,
  FaPhoneSlash,
  FaThumbsUp,
  FaThumbsDown,
  FaStar,
  FaFlag,
} from "react-icons/fa"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

export default function GroupDebateRoom() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [currentSpeaker, setCurrentSpeaker] = useState("Sarah Mitchell")
  const [timeRemaining, setTimeRemaining] = useState(300)
  const [activeTab, setActiveTab] = useState("chat")
  const [showControls, setShowControls] = useState(true)
  const [reactions, setReactions] = useState({
    likes: 24,
    dislikes: 3,
    stars: 12,
  })

  const handleReaction = (type: "likes" | "dislikes" | "stars") => {
    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }))
  }

  const participants = [
    { id: 1, name: "Sarah Mitchell", role: "Team Alpha", score: 85, speaking: true, team: 1 },
    { id: 2, name: "Michael Anderson", role: "Team Beta", score: 82, speaking: false, team: 2 },
    { id: 3, name: "Emily Richardson", role: "Team Alpha", score: 78, speaking: false, team: 1 },
    { id: 4, name: "James Thompson", role: "Team Beta", score: 80, speaking: false, team: 2 },
    { id: 5, name: "Dr. Rachel Bennett", role: "Moderator", score: null, speaking: false, team: 0 },
    { id: 6, name: "David Chen", role: "Team Gamma", score: 88, speaking: false, team: 3 },
    { id: 7, name: "Sophie Williams", role: "Team Gamma", score: 84, speaking: false, team: 3 },
    { id: 8, name: "Alex Rodriguez", role: "Team Delta", score: 86, speaking: false, team: 4 },
    { id: 9, name: "Isabella Martinez", role: "Team Delta", score: 83, speaking: false, team: 4 },
  ]

  const chatMessages = [
    { id: 1, user: "Emily Richardson", message: "Excellent point about renewable energy sources", time: "14:32" },
    { id: 2, user: "James Thompson", message: "Would like to address the economic impact", time: "14:33" },
    { id: 3, user: "Michael Anderson", message: "Looking forward to the cross-examination", time: "14:34" },
  ]

  // Chart options for ECharts
  const scoreChartOption = {
    animation: false,
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Team Alpha", "Team Beta", "Team Gamma", "Team Delta"],
      top: "0%",
      textStyle: {
        color: "#666",
      },
    },
    grid: {
      top: "15%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Opening", "Arguments", "Rebuttal", "Closing"],
      axisLabel: {
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      max: 100,
      axisLabel: {
        color: "#666",
      },
    },
    series: [
      {
        name: "Team Alpha",
        type: "line",
        data: [75, 82, 85, 88],
        smooth: true,
        lineStyle: {
          color: "#8B5CF6",
        },
        itemStyle: {
          color: "#8B5CF6",
        },
      },
      {
        name: "Team Beta",
        type: "line",
        data: [70, 78, 82, 85],
        smooth: true,
        lineStyle: {
          color: "#EC4899",
        },
        itemStyle: {
          color: "#EC4899",
        },
      },
      {
        name: "Team Gamma",
        type: "line",
        data: [72, 80, 84, 87],
        smooth: true,
        lineStyle: {
          color: "#10B981",
        },
        itemStyle: {
          color: "#10B981",
        },
      },
      {
        name: "Team Delta",
        type: "line",
        data: [68, 76, 83, 86],
        smooth: true,
        lineStyle: {
          color: "#F59E0B",
        },
        itemStyle: {
          color: "#F59E0B",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <header className="py-4 flex items-center justify-between border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">
              Future of Artificial Intelligence: Ethics and Innovation
            </h1>
            <span className="text-purple-600 text-sm">Multi-Team Group Debate</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <FaCog className="text-xl" />
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        </header>

        <main className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <div className="bg-white rounded-3xl p-8 mb-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src="https://public.readdy.ai/ai/img_res/c4d9896b9a678b88bbb76a1f91a8e01b.jpg"
                        alt="Current speaker"
                        width={640}
                        height={360}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-white text-sm font-medium">Sarah Mitchell</span>
                          </div>
                          <span className="text-white text-xs bg-purple-600/80 px-3 py-1 rounded-full">Speaking</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src="https://public.readdy.ai/ai/img_res/a4db19c0abe24f133b975437dbefeaeb.jpg"
                        alt="Team Beta"
                        width={640}
                        height={360}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-white text-sm font-medium">Michael Anderson</span>
                          </div>
                          <span className="text-white text-xs bg-blue-600/80 px-3 py-1 rounded-full">Team Beta</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src="https://public.readdy.ai/ai/img_res/628b8a86551f2a4537a29969d0eb394f.jpg"
                        alt="Team Gamma"
                        width={640}
                        height={360}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-white text-sm font-medium">David Chen</span>
                          </div>
                          <span className="text-white text-xs bg-green-600/80 px-3 py-1 rounded-full">Team Gamma</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src="https://public.readdy.ai/ai/img_res/9055bbbdb0b9f6e5b9eb9864ce56881f.jpg"
                        alt="Team Delta"
                        width={640}
                        height={360}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-white text-sm font-medium">Isabella Martinez</span>
                          </div>
                          <span className="text-white text-xs bg-yellow-600/80 px-3 py-1 rounded-full">Team Delta</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src="https://public.readdy.ai/ai/img_res/6105a1ba8735da44f8a826dba3569cca.jpg"
                      alt="Group Discussion"
                      width={640}
                      height={360}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-white text-sm font-medium">Group Discussion</span>
                        </div>
                        <span className="text-white text-xs bg-gray-600/80 px-3 py-1 rounded-full">Live</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-700 font-medium">Live Session</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`flex flex-col items-center justify-center p-4 ${
                        isMuted ? "bg-red-50 text-red-600" : "bg-white text-purple-600"
                      } rounded-xl hover:shadow-md transition-all duration-300 rounded-button whitespace-nowrap`}
                    >
                      {isMuted ? (
                        <FaMicrophoneSlash className="text-xl mb-2" />
                      ) : (
                        <FaMicrophone className="text-xl mb-2" />
                      )}
                      <span className="text-xs font-medium">{isMuted ? "Unmute" : "Mute"}</span>
                    </button>

                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`flex flex-col items-center justify-center p-4 ${
                        !isVideoOn ? "bg-red-50 text-red-600" : "bg-white text-purple-600"
                      } rounded-xl hover:shadow-md transition-all duration-300 rounded-button whitespace-nowrap`}
                    >
                      {isVideoOn ? <FaVideo className="text-xl mb-2" /> : <FaVideoSlash className="text-xl mb-2" />}
                      <span className="text-xs font-medium">{isVideoOn ? "Stop Video" : "Start Video"}</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-4 bg-white text-purple-600 rounded-xl hover:shadow-md transition-all duration-300 rounded-button whitespace-nowrap">
                      <FaDesktop className="text-xl mb-2" />
                      <span className="text-xs font-medium">Share</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-4 bg-white text-purple-600 rounded-xl hover:shadow-md transition-all duration-300 rounded-button whitespace-nowrap">
                      <FaHandPaper className="text-xl mb-2" />
                      <span className="text-xs font-medium">Raise Hand</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-4 bg-red-50 text-red-600 rounded-xl hover:shadow-md transition-all duration-300 rounded-button whitespace-nowrap">
                      <FaPhoneSlash className="text-xl mb-2" />
                      <span className="text-xs font-medium">Leave</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab("chat")}
                    className={`flex-1 py-4 text-center transition-colors ${
                      activeTab === "chat"
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => setActiveTab("arguments")}
                    className={`flex-1 py-4 text-center transition-colors ${
                      activeTab === "arguments"
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Arguments
                  </button>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={`flex-1 py-4 text-center transition-colors ${
                      activeTab === "notes"
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab("rules")}
                    className={`flex-1 py-4 text-center transition-colors ${
                      activeTab === "rules"
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Rules
                  </button>
                </div>

                <div className="min-h-[400px]">
                  {activeTab === "chat" && (
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div key={message.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-900 font-medium">{message.user}</span>
                            <span className="text-sm text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-gray-700">{message.message}</p>
                        </div>
                      ))}
                      <div className="mt-4">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "arguments" && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-gray-900 font-medium mb-2">Team Alpha Arguments</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>AI development should prioritize human safety and ethical guidelines</li>
                          <li>Transparent AI decision-making processes are essential</li>
                          <li>Global cooperation needed for AI governance</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-gray-900 font-medium mb-2">Team Beta Arguments</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Innovation speed shouldn't be compromised by excessive regulation</li>
                          <li>Market-driven AI development ensures practical applications</li>
                          <li>Competition drives better AI solutions</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-gray-900 font-medium mb-2">Team Gamma Arguments</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Balance between innovation and regulation is achievable</li>
                          <li>Industry self-regulation can be effective</li>
                          <li>Focus on AI education and public awareness</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-gray-900 font-medium mb-2">Team Delta Arguments</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Regional AI development needs consideration</li>
                          <li>Economic implications of AI regulation</li>
                          <li>Cultural aspects of AI implementation</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === "notes" && (
                    <div className="space-y-4">
                      <textarea
                        className="w-full h-[300px] bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Take your notes here..."
                      ></textarea>
                    </div>
                  )}

                  {activeTab === "rules" && (
                    <div className="space-y-4 text-gray-700">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-gray-900 font-medium mb-2">Time Limits</h3>
                        <p>Opening Statement: 5 minutes</p>
                        <p>Rebuttal: 3 minutes</p>
                        <p>Cross-examination: 2 minutes</p>
                        <p>Closing Statement: 4 minutes</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-gray-900 font-medium mb-2">Scoring Criteria</h3>
                        <p>Argument Quality: 40%</p>
                        <p>Evidence Support: 30%</p>
                        <p>Delivery: 20%</p>
                        <p>Time Management: 10%</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Participants</h3>
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            participant.speaking ? "bg-green-500 animate-pulse" : "bg-gray-300"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900">{participant.name}</p>
                          <p className="text-sm text-gray-500">{participant.role}</p>
                        </div>
                      </div>
                      {participant.score && (
                        <span className="text-sm font-medium text-purple-600">{participant.score}%</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Engagement</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleReaction("likes")}
                    className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <FaThumbsUp className="text-gray-600" />
                    <span className="text-gray-600 font-medium">{reactions.likes}</span>
                  </button>
                  <button
                    onClick={() => handleReaction("dislikes")}
                    className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <FaThumbsDown className="text-gray-600" />
                    <span className="text-gray-600 font-medium">{reactions.dislikes}</span>
                  </button>
                  <button
                    onClick={() => handleReaction("stars")}
                    className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <FaStar className="text-gray-600" />
                    <span className="text-gray-600 font-medium">{reactions.stars}</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <FaFlag className="text-gray-600" />
                    <span className="text-gray-600 font-medium">Report</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Performance</h3>
                <div className="w-full h-[200px]">
                  <ReactECharts option={scoreChartOption} style={{ height: "100%", width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

