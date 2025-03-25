"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { FaArrowLeft, FaSearch, FaTimes, FaArrowUp, FaArrowDown, FaTrophy } from "react-icons/fa"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

const Rankings: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState("weekly")
  const [categoryFilter, setCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const topDebaters = [
    {
      id: 1,
      name: "Elizabeth Chen",
      title: "Grandmaster Debater",
      avatar: "EC",
      winRate: 92,
      totalDebates: 248,
      averageScore: 9.4,
      badges: ["Tournament Champion", "Winning Streak", "Top Contributor"],
      recentAchievements: ["Won International Debate Finals", "10 Debate Winning Streak"],
      specializations: ["Technology Ethics", "Environmental Policy"],
      ranking: 1,
      change: "up",
      stats: {
        monthlyWins: 28,
        monthlyDebates: 30,
        averageTime: "18 minutes",
        preferredFormat: "Oxford Style",
      },
    },
    {
      id: 2,
      name: "Marcus Thompson",
      title: "Elite Debater",
      avatar: "MT",
      winRate: 88,
      totalDebates: 186,
      averageScore: 9.1,
      badges: ["Rising Star", "Analytical Expert"],
      recentAchievements: ["Best Newcomer 2025", "15 Perfect Scores"],
      specializations: ["Economic Policy", "Social Justice"],
      ranking: 2,
      change: "same",
      stats: {
        monthlyWins: 25,
        monthlyDebates: 28,
        averageTime: "22 minutes",
        preferredFormat: "Parliamentary",
      },
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      title: "Distinguished Scholar",
      avatar: "SW",
      winRate: 86,
      totalDebates: 312,
      averageScore: 8.9,
      badges: ["Academic Excellence", "Mentor"],
      recentAchievements: ["Published Debate Strategy Book", "Mentored 50+ Debaters"],
      specializations: ["Healthcare Policy", "Education Reform"],
      ranking: 3,
      change: "up",
      stats: {
        monthlyWins: 22,
        monthlyDebates: 26,
        averageTime: "20 minutes",
        preferredFormat: "Cross-Examination",
      },
    },
    {
      id: 4,
      name: "Alex Kovalev",
      title: "Professional Debater",
      avatar: "AK",
      winRate: 84,
      totalDebates: 175,
      averageScore: 8.7,
      badges: ["Elite Status", "Critical Thinker"],
      recentAchievements: ["Regional Championship Finalist", "5 Consecutive Wins"],
      specializations: ["International Relations", "Political Science"],
      ranking: 4,
      change: "up",
      stats: {
        monthlyWins: 20,
        monthlyDebates: 24,
        averageTime: "19 minutes",
        preferredFormat: "Lincoln-Douglas",
      },
    },
  ]

  // Chart options for ECharts
  const performanceChartOption = {
    animation: false,
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Win Rate", "Average Score"],
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
      boundaryGap: false,
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: [
      {
        type: "value",
        name: "Win Rate (%)",
        min: 70,
        max: 100,
      },
      {
        type: "value",
        name: "Score",
        min: 7,
        max: 10,
      },
    ],
    series: [
      {
        name: "Win Rate",
        type: "line",
        data: [88, 85, 90, 92, 89, 93],
        smooth: true,
        areaStyle: {
          opacity: 0.1,
        },
      },
      {
        name: "Average Score",
        type: "line",
        yAxisIndex: 1,
        data: [8.5, 8.7, 9.0, 9.2, 9.1, 9.4],
        smooth: true,
        areaStyle: {
          opacity: 0.1,
        },
      },
    ],
  }

  // Filter debaters based on search query
  const filteredDebaters = topDebaters.filter(
    (debater) =>
      debater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      debater.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
                <FaArrowLeft />
                <span>Back to Dashboard</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 ml-6">Rankings & Leaderboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search debaters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTimeFilter("weekly")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  timeFilter === "weekly" ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeFilter("monthly")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  timeFilter === "monthly" ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeFilter("allTime")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  timeFilter === "allTime" ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600"
                }`}
              >
                All Time
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              >
                <option value="all">All Categories</option>
                <option value="technology">Technology</option>
                <option value="politics">Politics</option>
                <option value="economics">Economics</option>
                <option value="society">Society</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Rank</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Debater</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-gray-600">Win Rate</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-gray-600">Total Debates</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-gray-600">Avg Score</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDebaters.map((debater) => (
                  <tr key={debater.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-800">#{debater.ranking}</span>
                        {debater.change === "up" && <FaArrowUp className="text-green-500" />}
                        {debater.change === "down" && <FaArrowDown className="text-red-500" />}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                          {debater.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{debater.name}</div>
                          <div className="text-sm text-gray-600">{debater.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="text-lg font-semibold text-gray-800">{debater.winRate}%</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="text-lg font-semibold text-gray-800">{debater.totalDebates}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="text-lg font-semibold text-gray-800">{debater.averageScore}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedUser(debater)
                          setShowUserProfile(true)
                        }}
                        className="bg-purple-600 text-white px-4 py-2 rounded-button hover:bg-purple-700 transition-all text-sm cursor-pointer whitespace-nowrap"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {showUserProfile && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[800px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-semibold">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.title}</p>
                </div>
              </div>
              <button onClick={() => setShowUserProfile(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Stats</h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Monthly Wins</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {selectedUser.stats.monthlyWins}/{selectedUser.stats.monthlyDebates}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Average Debate Time</div>
                    <div className="text-2xl font-bold text-gray-800">{selectedUser.stats.averageTime}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Preferred Format</div>
                    <div className="text-2xl font-bold text-gray-800">{selectedUser.stats.preferredFormat}</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Trend</h4>
                <div className="h-64">
                  <ReactECharts option={performanceChartOption} style={{ height: "100%", width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.badges.map((badge: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h4>
                <div className="space-y-2">
                  {selectedUser.recentAchievements.map((achievement: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-600">
                      <FaTrophy className="text-yellow-400" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.specializations.map((specialization: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rankings

