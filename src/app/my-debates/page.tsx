"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import {
  FaArrowLeft,
  FaSearch,
  FaCalendar,
  FaClock,
  FaUser,
  FaGavel,
  FaPlay,
  FaDownload,
  FaSignInAlt,
} from "react-icons/fa"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

const MyDebates: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("all")

  const debateStats = {
    total: 47,
    won: 32,
    ongoing: 3,
    upcoming: 5,
    avgScore: 8.7,
    winRate: "68%",
  }

  const debateFormats = [
    { id: "all", name: "All Formats" },
    { id: "oxford", name: "Oxford Style" },
    { id: "cross", name: "Cross-Examination" },
    { id: "lincoln", name: "Lincoln-Douglas" },
    { id: "parliamentary", name: "Parliamentary" },
  ]

  const debates = [
    {
      id: 1,
      topic: "The Impact of Artificial Intelligence on Future Employment",
      date: "2025-03-25",
      time: "15:30",
      opponent: "Dr. Sarah Chen",
      format: "Oxford Style",
      status: "upcoming",
      score: null,
      image: "https://public.readdy.ai/ai/img_res/4e50b7a3de96c090dc479bed2fe662e3.jpg",
    },
    {
      id: 2,
      topic: "Global Climate Change Mitigation Strategies",
      date: "2025-03-24",
      time: "14:00",
      opponent: "Prof. Michael Rodriguez",
      format: "Cross-Examination",
      status: "ongoing",
      score: null,
      image: "https://public.readdy.ai/ai/img_res/ab54d2c0e5e806abd6b59097f4269ad3.jpg",
    },
    {
      id: 3,
      topic: "Digital Privacy in the Age of Big Data",
      date: "2025-03-23",
      time: "16:00",
      opponent: "Elizabeth Thompson",
      format: "Parliamentary",
      status: "completed",
      score: 9.2,
      image: "https://public.readdy.ai/ai/img_res/44a46c395fd352efb2449fc238045339.jpg",
    },
  ]

  // Chart options for ECharts
  const chartOption = {
    animation: false,
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Debate Score", "Average Performance"],
      top: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: {
      type: "value",
      max: 10,
    },
    series: [
      {
        name: "Debate Score",
        type: "line",
        data: [7.5, 8.2, 8.7, 8.4, 9.1, 8.8],
        smooth: true,
        color: "#7C3AED",
      },
      {
        name: "Average Performance",
        type: "line",
        data: [7.8, 7.9, 8.1, 8.3, 8.5, 8.7],
        smooth: true,
        color: "#4F46E5",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Debates</h1>
            <p className="text-gray-600 mt-1">Track and manage your debate activities</p>
          </div>
          <Link
            href="/dashboard"
            className="bg-purple-600 text-white px-6 py-2.5 rounded-button hover:bg-purple-700 transition-all cursor-pointer whitespace-nowrap flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div className="bg-purple-50 rounded-2xl p-6">
                  <div className="text-purple-600 mb-2">Total Debates</div>
                  <div className="text-3xl font-bold">{debateStats.total}</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-6">
                  <div className="text-green-600 mb-2">Won Debates</div>
                  <div className="text-3xl font-bold">{debateStats.won}</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6">
                  <div className="text-blue-600 mb-2">Ongoing</div>
                  <div className="text-3xl font-bold">{debateStats.ongoing}</div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-6">
                  <div className="text-orange-600 mb-2">Upcoming</div>
                  <div className="text-3xl font-bold">{debateStats.upcoming}</div>
                </div>
                <div className="bg-indigo-50 rounded-2xl p-6">
                  <div className="text-indigo-600 mb-2">Win Rate</div>
                  <div className="text-3xl font-bold">{debateStats.winRate}</div>
                </div>
              </div>
              <div className="h-80">
                <ReactECharts option={chartOption} style={{ height: "100%", width: "100%" }} />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    {["all", "upcoming", "ongoing", "completed"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          activeFilter === filter ? "bg-purple-600 text-white" : "text-gray-600 hover:text-purple-600"
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-600 border-none focus:ring-2 focus:ring-purple-600/20"
                  >
                    {debateFormats.map((format) => (
                      <option key={format.id} value={format.id}>
                        {format.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search debates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-64 bg-gray-100 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 border-none focus:ring-2 focus:ring-purple-600/20"
                    />
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-800 border-none focus:ring-2 focus:ring-purple-600/20"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-800 border-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {debates.map((debate) => (
                  <div
                    key={debate.id}
                    className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-purple-200 transition-all"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-3">
                        <div className="h-40 rounded-xl overflow-hidden">
                          <Image
                            src={debate.image || "/placeholder.svg"}
                            alt={debate.topic}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-9">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{debate.topic}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <FaCalendar className="mr-2" />
                                {debate.date}
                              </span>
                              <span className="flex items-center">
                                <FaClock className="mr-2" />
                                {debate.time}
                              </span>
                              <span className="flex items-center">
                                <FaUser className="mr-2" />
                                {debate.opponent}
                              </span>
                              <span className="flex items-center">
                                <FaGavel className="mr-2" />
                                {debate.format}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`px-4 py-1 rounded-full text-sm ${
                              debate.status === "upcoming"
                                ? "bg-blue-100 text-blue-600"
                                : debate.status === "ongoing"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-purple-100 text-purple-600"
                            }`}
                          >
                            {debate.status.charAt(0).toUpperCase() + debate.status.slice(1)}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {debate.score !== null && (
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">Score:</span>
                              <span className="text-2xl font-bold text-purple-600">{debate.score}</span>
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-4">
                            {debate.status === "completed" && (
                              <>
                                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-button hover:bg-gray-200 transition-all text-sm cursor-pointer whitespace-nowrap flex items-center">
                                  <FaPlay className="mr-2" />
                                  View Recording
                                </button>
                                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-button hover:bg-gray-200 transition-all text-sm cursor-pointer whitespace-nowrap flex items-center">
                                  <FaDownload className="mr-2" />
                                  Download Transcript
                                </button>
                              </>
                            )}
                            {debate.status === "upcoming" && (
                              <button className="bg-purple-600 text-white px-6 py-2 rounded-button hover:bg-purple-700 transition-all text-sm cursor-pointer whitespace-nowrap flex items-center">
                                <FaSignInAlt className="mr-2" />
                                Join Debate
                              </button>
                            )}
                            {debate.status === "ongoing" && (
                              <button className="bg-green-600 text-white px-6 py-2 rounded-button hover:bg-green-700 transition-all text-sm cursor-pointer whitespace-nowrap flex items-center">
                                <FaPlay className="mr-2" />
                                Continue Debate
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyDebates

