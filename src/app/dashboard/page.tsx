"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  FaHome,
  FaCalendar,
  FaTrophy,
  FaStar,
 
  FaCog,
  FaSignOutAlt,
  FaBell,

  FaEllipsisH,
  FaBook,
  FaSignal,
  FaTag,
  FaUsers,
  FaClock,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaArrowUp,
  FaArrowDown,
  FaRobot,
  FaPlus,
  FaUser,
  FaLightbulb,
  FaMedal,
  FaDownload,
  FaBellSlash,
  FaCalendarAlt,
  FaSearch,
  FaCheck,
} from "react-icons/fa"
import { FaComments } from "react-icons/fa6"
import { useToast } from "@/hooks/use-toast"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
  loading: () => <div className="h-80 w-full bg-gray-100 animate-pulse rounded-lg"></div>,
})

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMatchingModal, setShowMatchingModal] = useState(false)
  const [showRoomModal, setShowRoomModal] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [showTimeRange, setShowTimeRange] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 6 Months")
  const [isSearching, setIsSearching] = useState(false)
  const [roomSearchQuery, setRoomSearchQuery] = useState("")
  const [manualOpponentInput, setManualOpponentInput] = useState("")
  const [matchedOpponents, setMatchedOpponents] = useState<
    Array<{
      name: string
      initials: string
      rating: number
      wins: number
      debates: number
    }>
  >([])
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [selectedDebate, setSelectedDebate] = useState<{
    name: string
    date: string
    opponent: string
    topic: string
    format: string
    difficulty: string
    image: string
  } | null>(null)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "debate",
      title: "New Debate Challenge",
      content: "Dr. Sarah Chen has challenged you to a debate on AI Ethics in Healthcare",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "achievement",
      title: "Achievement Unlocked",
      content: "Congratulations! You've won 5 debates in a row",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "debate",
      title: "Debate Room Update",
      content: 'The topic for "Global Tech Ethics Forum" has been updated',
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "system",
      title: "System Update",
      content: "New debate formats are now available for selection",
      time: "1 day ago",
      read: true,
    },
  ])

  const [aiDebateSettings, setAIDebateSettings] = useState({
    title: "",
    level: "Beginner",
    topic: "Technology",
    format: "Structured",
    timeLimit: "30 min",
  })

  const [matchingPreferences, setMatchingPreferences] = useState({
    category: "Technology",
    topic: "",
    difficulty: "Intermediate",
    date: "2025-03-25",
    time: "15:00",
    format: "Oxford Style",
  })

  const [roomFilter, setRoomFilter] = useState({
    format: "all",
    difficulty: "all",
  })

  const { toast } = useToast()

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const handleStartAIDebate = () => {
    setShowAIModal(false)
    // Navigate to the AI debate room
    window.location.href = "/ai-debate-room"
  }

  const handleFindOpponents = () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setMatchedOpponents([
        {
          name: "Emily Thompson",
          initials: "ET",
          rating: 4.8,
          wins: 127,
          debates: 150,
        },
        {
          name: "Michael Rodriguez",
          initials: "MR",
          rating: 4.7,
          wins: 98,
          debates: 120,
        },
        {
          name: "Sarah Williams",
          initials: "SW",
          rating: 4.9,
          wins: 145,
          debates: 165,
        },
      ])
      setIsSearching(false)
    }, 2000)
  }

  const handleAddManualOpponent = () => {
    if (manualOpponentInput.trim()) {
      const initials = manualOpponentInput
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
      const newOpponent = {
        name: manualOpponentInput,
        initials,
        rating: 4.5,
        wins: Math.floor(Math.random() * 100) + 50,
        debates: Math.floor(Math.random() * 50) + 100,
      }
      setMatchedOpponents((prev) => [...prev, newOpponent])
      setManualOpponentInput("")
    }
  }

  const handleOpponentSelect = (opponent: { name: string }) => {
    setShowMatchingModal(false)
    // Handle opponent selection logic here
  }

  const handleJoinRoom = (roomId: number) => {
    setShowRoomModal(false)
    // Add room joining logic here
  }

  const updateChartData = (range: string) => {
    // This would update the chart data based on the selected time range
    // For now, we'll just update the state
    setSelectedTimeRange(range)
    setShowTimeRange(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".notifications-container")) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // Chart options for ECharts
  const chartOption = {
    animation: false,
    color: ["#7C3AED", "#4F46E5"],
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Wins", "Total Debates"],
      top: 0,
    },
    grid: {
      top: 30,
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
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Wins",
        type: "line",
        smooth: true,
        data: [12, 15, 18, 22, 25, 30],
        areaStyle: {
          opacity: 0.1,
        },
      },
      {
        name: "Total Debates",
        type: "line",
        smooth: true,
        data: [15, 20, 25, 30, 35, 40],
        areaStyle: {
          opacity: 0.1,
        },
      },
    ],
  }

  const performanceStats = {
    totalDebates: 40,
    wins: 30,
    winRate: "75%",
    averageScore: 8.5,
    streak: 5,
    ranking: "#123",
  }

  const debateTips = [
    {
      icon: <FaLightbulb />,
      title: "Research Thoroughly",
      description: "Gather comprehensive evidence to support your arguments",
    },
    {
      icon: <FaComments />,
      title: "Active Listening",
      description: "Pay attention to opponent's points for effective counter-arguments",
    },
    {
      icon: <FaClock />,
      title: "Time Management",
      description: "Structure your arguments within the allocated time frame",
    },
  ]

  const upcomingDebates = [
    {
      name: "AI Ethics in Healthcare",
      date: "March 26, 2025",
      opponent: "Dr. Sarah Chen",
      topic: "The Role of AI in Medical Diagnosis",
      format: "Oxford Style",
      difficulty: "Professional",
      image: "https://public.readdy.ai/ai/img_res/0099a9593e2351c5a2897cfc18cd3cef.jpg",
    },
    {
      name: "Climate Policy Impact",
      date: "March 28, 2025",
      opponent: "Prof. James Wilson",
      topic: "Carbon Pricing Mechanisms",
      format: "Cross-Examination",
      difficulty: "Advanced",
      image: "https://public.readdy.ai/ai/img_res/90c527dcc78815a083bfbfd15d69d845.jpg",
    },
  ]

  const recommendedTopics = [
    {
      title: "Artificial Intelligence Ethics",
      category: "Technology",
      difficulty: "Advanced",
      popularity: "98%",
      activeDebaters: 234,
      lastDebate: "2 hours ago",
      description: "Explore the ethical implications of AI development and deployment in society",
      nextDebate: "March 27, 2025 15:00",
    },
    {
      title: "Global Climate Policy",
      category: "Environment",
      difficulty: "Expert",
      popularity: "95%",
      activeDebaters: 189,
      lastDebate: "30 minutes ago",
      description: "Discuss international climate agreements and their effectiveness",
      nextDebate: "March 28, 2025 16:30",
    },
    {
      title: "Digital Privacy Rights",
      category: "Society",
      difficulty: "Advanced",
      popularity: "92%",
      activeDebaters: 156,
      lastDebate: "1 hour ago",
      description: "Analyze the balance between privacy and security in the digital age",
      nextDebate: "March 29, 2025 14:00",
    },
  ]

  const debateRooms = [
    {
      id: 1,
      name: "Global Tech Ethics Forum",
      topic: "AI Regulation in Healthcare",
      format: "Oxford Style",
      difficulty: "Advanced",
      capacity: 8,
      participants: [
        { name: "Isabella Chen", rating: 4.9, avatar: "IC" },
        { name: "Marcus Thompson", rating: 4.7, avatar: "MT" },
        { name: "Sophia Rodriguez", rating: 4.8, avatar: "SR" },
      ],
      startTime: "15:30",
      status: "active",
    },
    {
      id: 2,
      name: "Climate Policy Roundtable",
      topic: "Carbon Tax Implementation",
      format: "Parliamentary",
      difficulty: "Expert",
      capacity: 6,
      participants: [
        { name: "David Wilson", rating: 4.9, avatar: "DW" },
        { name: "Elena Martinez", rating: 4.8, avatar: "EM" },
      ],
      startTime: "16:00",
      status: "active",
    },
    {
      id: 3,
      name: "Education Innovation Hub",
      topic: "Digital Learning Methods",
      format: "Cross-Examination",
      difficulty: "Intermediate",
      capacity: 4,
      participants: [
        { name: "James Anderson", rating: 4.6, avatar: "JA" },
        { name: "Laura Kim", rating: 4.7, avatar: "LK" },
        { name: "Michael Brown", rating: 4.5, avatar: "MB" },
      ],
      startTime: "16:30",
      status: "active",
    },
  ]

  const filteredRooms = debateRooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
      room.topic.toLowerCase().includes(roomSearchQuery.toLowerCase())
    const matchesFormat = roomFilter.format === "all" || room.format === roomFilter.format
    const matchesDifficulty = roomFilter.difficulty === "all" || room.difficulty === roomFilter.difficulty
    return matchesSearch && matchesFormat && matchesDifficulty
  })

  const timeRangeOptions = ["Last 3 Months", "Last 6 Months", "Last Year"]

  const handleParticipate = (debate: {
    name: string
    date: string
    opponent: string
    topic: string
    format: string
    difficulty: string
    image: string
  }) => {
    setSelectedDebate(debate)
    setShowConfirmationModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50">
        <div className="p-6">
          <div className="flex flex-col mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center">
                <FaComments className="text-purple-600" />
              </div>
              <span className="text-2xl font-bold">
                D23<span className="text-purple-600">.ai</span>
              </span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-lg font-semibold">
                AK
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Alex Kovalev</h3>
                <p className="text-sm text-gray-600">Professional Debater</p>
                <div className="flex items-center mt-1">
                  <FaMedal className="text-yellow-500 mr-1 text-sm" />
                  <span className="text-xs text-gray-600">Elite Status</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-[calc(100vh-120px)] space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 text-purple-600 bg-purple-50 px-4 py-3 rounded-xl cursor-pointer"
            >
              <FaHome />
              <span>Dashboard</span>
            </a>
            <Link
              href="/my-debates"
              className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 px-4 py-3 rounded-xl cursor-pointer"
            >
              <FaCalendar />
              <span>My Debates</span>
            </Link>
            <Link
              href="/tournaments"
              className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 px-4 py-3 rounded-xl cursor-pointer"
            >
              <FaTrophy />
              <span>Tournaments</span>
            </Link>
            <Link
              href="/rankings"
              className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 px-4 py-3 rounded-xl cursor-pointer"
            >
              <FaStar />
              <span>Rankings</span>
            </Link>
            <Link
              href="/schedule"
              className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 px-4 py-3 rounded-xl cursor-pointer"
            >
              <FaCalendarAlt />
              <span>Schedule</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 px-4 py-3 rounded-xl cursor-pointer"
            >
              <FaCog />
              <span>Settings</span>
            </Link>
            <a
              href="#"
              className="flex items-center space-x-3 text-red-600 hover:text-red-700 px-4 py-3 rounded-xl cursor-pointer mt-auto"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen pl-64">
        {/* Top Navigation */}

        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search topics, debates, users..."
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex items-center">
                <div className="relative notifications-container">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-600 hover:bg-purple-600/20 transition-all cursor-pointer"
                  >
                    <FaBell />
                    {notifications?.filter((n) => !n.read).length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                        <button
                          onClick={() => markAllAsRead()}
                          className="text-sm text-purple-600 hover:text-purple-700"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications?.length > 0 ? (
                          notifications.map((notification, index) => (
                            <div
                              key={index}
                              className="relative px-4 py-3 hover:bg-gray-50 transition-all cursor-pointer group"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-purple-600 rounded-full absolute left-1.5 top-1/2 -translate-y-1/2"></span>
                                  )}
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      notification.type === "debate"
                                        ? "bg-purple-100 text-purple-600"
                                        : notification.type === "achievement"
                                          ? "bg-yellow-100 text-yellow-600"
                                          : "bg-blue-100 text-blue-600"
                                    }`}
                                  >
                                    {notification.type === "debate" ? (
                                      <FaComments />
                                    ) : notification.type === "achievement" ? (
                                      <FaTrophy />
                                    ) : (
                                      <FaBell />
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-800 font-medium">{notification.title}</p>
                                  <p className="text-xs text-gray-500 mt-0.5">{notification.content}</p>
                                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                  >
                                    <FaTimes />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-gray-500">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <FaBellSlash className="text-gray-400" />
                            </div>
                            <p>No notifications yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="col-span-12">
              {/* Performance Overview */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Performance Overview</h3>
                  <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors cursor-pointer whitespace-nowrap">
                      <FaDownload className="inline mr-2" />
                      Export
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowTimeRange(!showTimeRange)}
                        className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm text-gray-600 cursor-pointer whitespace-nowrap flex items-center"
                      >
                        {selectedTimeRange} <FaChevronDown className="ml-2" />
                      </button>
                      {showTimeRange && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                          {timeRangeOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => updateChartData(option)}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 transition-colors ${
                                selectedTimeRange === option ? "text-purple-600 bg-purple-50" : "text-gray-600"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <button
                              onClick={() => {
                                setShowTimeRange(false)
                                // Add custom range picker logic here
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 transition-colors"
                            >
                              <FaCalendarAlt className="inline mr-2" />
                              Custom Range
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-8 mb-8">
                  <div className="col-span-12 md:col-span-8">
                    <div className="h-80">
                      <ReactECharts option={chartOption} style={{ height: "100%", width: "100%" }} />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-2xl p-4">
                        <div className="text-purple-600 mb-2">Total Debates</div>
                        <div className="text-2xl font-bold">{performanceStats.totalDebates}</div>
                      </div>
                      <div className="bg-indigo-50 rounded-2xl p-4">
                        <div className="text-indigo-600 mb-2">Wins</div>
                        <div className="text-2xl font-bold">{performanceStats.wins}</div>
                      </div>
                      <div className="bg-green-50 rounded-2xl p-4">
                        <div className="text-green-600 mb-2">Win Rate</div>
                        <div className="text-2xl font-bold">{performanceStats.winRate}</div>
                      </div>
                      <div className="bg-blue-50 rounded-2xl p-4">
                        <div className="text-blue-600 mb-2">Avg Score</div>
                        <div className="text-2xl font-bold">{performanceStats.averageScore}</div>
                      </div>
                      <div className="bg-orange-50 rounded-2xl p-4">
                        <div className="text-orange-600 mb-2">Streak</div>
                        <div className="text-2xl font-bold">{performanceStats.streak}</div>
                      </div>
                      <div className="bg-pink-50 rounded-2xl p-4">
                        <div className="text-pink-600 mb-2">Ranking</div>
                        <div className="text-2xl font-bold">{performanceStats.ranking}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {debateTips.map((tip, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-purple-600 text-xl">{tip.icon}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{tip.title}</h4>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create New Debate */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Create New Debate</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <FaRobot className="text-2xl" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Debate with AI</h4>
                    <p className="text-sm opacity-90 mb-4">
                      Practice with our advanced AI debate partner for instant feedback and improvement
                    </p>
                    <button
                      onClick={() => setShowAIModal(true)}
                      className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-button transition-all text-sm cursor-pointer whitespace-nowrap backdrop-blur-sm"
                    >
                      <FaPlus className="inline mr-2" />
                      Start with AI
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <FaUser className="text-2xl" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">1-on-1 Debate</h4>
                    <p className="text-sm opacity-90 mb-4">
                      Engage in direct debates with another participant in real-time
                    </p>
                    <button
                      onClick={() => setShowMatchingModal(true)}
                      className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-button transition-all text-sm cursor-pointer whitespace-nowrap backdrop-blur-sm"
                    >
                      <FaPlus className="inline mr-2" />
                      Create 1-on-1 Debate
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <FaUsers className="text-2xl" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Group Debate</h4>
                    <p className="text-sm opacity-90 mb-4">
                      Join multi-participant debates with diverse perspectives and viewpoints
                    </p>
                    <button
                      onClick={() => setShowRoomModal(true)}
                      className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-button transition-all text-sm cursor-pointer whitespace-nowrap backdrop-blur-sm"
                    >
                      <FaPlus className="inline mr-2" />
                      Create Group Debate
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                  <div className="bg-gray-50 rounded-2xl p-4 cursor-pointer hover:bg-gray-100 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Active Users</span>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">1,234</div>
                    <div className="text-sm text-green-600 mt-1">
                      <FaArrowUp className="inline mr-1" />
                      +12%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 cursor-pointer hover:bg-gray-100 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Open Topics</span>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">89</div>
                    <div className="text-sm text-green-600 mt-1">
                      <FaArrowUp className="inline mr-1" />
                      +5%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 cursor-pointer hover:bg-gray-100 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Tournaments</span>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">12</div>
                    <div className="text-sm text-orange-600 mt-1">
                      <FaArrowDown className="inline mr-1" />
                      -2%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 cursor-pointer hover:bg-gray-100 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Average Rating</span>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">4.8</div>
                    <div className="text-sm text-green-600 mt-1">
                      <FaArrowUp className="inline mr-1" />
                      +0.2
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Debates and Recommended Topics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Upcoming Debates */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Upcoming Debates</h3>
                    <button className="text-purple-600 hover:text-purple-700 cursor-pointer">
                      <FaEllipsisH />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {upcomingDebates.map((debate, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-purple-200 transition-all"
                      >
                        <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                          <Image
                            src={debate.image || "/placeholder.svg"}
                            alt={debate.name}
                            width={400}
                            height={160}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 text-white">
                            <div className="font-semibold">{debate.date}</div>
                            <div className="text-sm opacity-90">vs {debate.opponent}</div>
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">{debate.name}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                          <div className="text-gray-600">
                            <FaBook className="inline mr-2 text-purple-600" />
                            {debate.topic}
                          </div>
                          <div className="text-gray-600">
                            <FaSignal className="inline mr-2 text-purple-600" />
                            {debate.difficulty}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleParticipate(debate)}
                            className="w-full bg-purple-600 text-white px-4 py-2 rounded-button hover:bg-purple-700 transition-all text-sm cursor-pointer whitespace-nowrap"
                          >
                            Participate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Topics */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Recommended Topics</h3>
                    <button className="text-purple-600 hover:text-purple-700 cursor-pointer">
                      <FaEllipsisH />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recommendedTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-purple-200 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">{topic.title}</h4>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                            {topic.popularity}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                        <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                          <div className="text-gray-600">
                            <FaTag className="inline mr-1 text-purple-600" />
                            {topic.category}
                          </div>
                          <div className="text-gray-600">
                            <FaSignal className="inline mr-1 text-purple-600" />
                            {topic.difficulty}
                          </div>
                          <div className="text-gray-600">
                            <FaUsers className="inline mr-1 text-purple-600" />
                            {topic.activeDebaters}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <FaClock className="inline mr-1 text-purple-600" />
                            Next: {topic.nextDebate}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Link href="/topic-discussion" className="inline-block">
                              <span className="bg-purple-600 text-white px-4 py-2 rounded-button hover:bg-purple-700 transition-all text-sm cursor-pointer whitespace-nowrap inline-block">
                                Join Discussion
                              </span>
                            </Link>
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
      </div>

      {/* AI Debate Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Create AI Debate</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Debate Topic</label>
                <input
                  type="text"
                  placeholder="Enter your debate topic..."
                  value={aiDebateSettings.title || ""}
                  onChange={(e) => setAIDebateSettings((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">AI Opponent Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Beginner", "Advanced", "Expert"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setAIDebateSettings((prev) => ({ ...prev, level }))}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        aiDebateSettings.level === level
                          ? "bg-purple-600 text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Debate Format</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Structured", "Free Form"].map((format) => (
                    <button
                      key={format}
                      onClick={() => setAIDebateSettings((prev) => ({ ...prev, format }))}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        aiDebateSettings.format === format
                          ? "bg-purple-600 text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit</label>
                <div className="grid grid-cols-3 gap-3">
                  {["15 min", "30 min", "45 min"].map((time) => (
                    <button
                      key={time}
                      onClick={() => setAIDebateSettings((prev) => ({ ...prev, timeLimit: time }))}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        aiDebateSettings.timeLimit === time
                          ? "bg-purple-600 text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleStartAIDebate}
                className="w-full bg-purple-600 text-white py-3 rounded-button hover:bg-purple-700 transition-all font-medium"
              >
                Start AI Debate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1-on-1 Debate Matching Modal */}
      {showMatchingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Create 1-on-1 Debate</h3>
              <button onClick={() => setShowMatchingModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Debate Category</label>
                  <select
                    value={matchingPreferences.category}
                    onChange={(e) => setMatchingPreferences((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Politics">Politics</option>
                    <option value="Environment">Environment</option>
                    <option value="Economics">Economics</option>
                    <option value="Ethics">Ethics</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specific Topic (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter a specific topic..."
                    value={matchingPreferences.topic}
                    onChange={(e) => setMatchingPreferences((prev) => ({ ...prev, topic: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setMatchingPreferences((prev) => ({ ...prev, difficulty: level }))}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          matchingPreferences.difficulty === level
                            ? "bg-purple-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Debate Format</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Oxford Style", "Cross-Examination", "Lincoln-Douglas", "Parliamentary"].map((format) => (
                      <button
                        key={format}
                        onClick={() => setMatchingPreferences((prev) => ({ ...prev, format }))}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          matchingPreferences.format === format
                            ? "bg-purple-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={matchingPreferences.date}
                      onChange={(e) => setMatchingPreferences((prev) => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={matchingPreferences.time}
                      onChange={(e) => setMatchingPreferences((prev) => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6">
                <h4 className="font-semibold text-gray-800 mb-4">Find Opponents</h4>
                <div className="flex items-center space-x-4 mb-4">
                  <input
                    type="text"
                    placeholder="Enter opponent's name or email..."
                    value={manualOpponentInput}
                    onChange={(e) => setManualOpponentInput(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                  <button
                    onClick={handleAddManualOpponent}
                    className="bg-purple-600 text-white px-4 py-2.5 rounded-xl hover:bg-purple-700 transition-all"
                  >
                    Add
                  </button>
                </div>

                <button
                  onClick={handleFindOpponents}
                  disabled={isSearching}
                  className="w-full bg-purple-100 text-purple-600 py-3 rounded-xl hover:bg-purple-200 transition-all font-medium mb-4"
                >
                  {isSearching ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-purple-600/20 border-t-purple-600 rounded-full animate-spin mr-2"></div>
                      Finding opponents...
                    </span>
                  ) : (
                    "Find Matching Opponents"
                  )}
                </button>

                {matchedOpponents.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Matched Opponents</h4>
                    {matchedOpponents.map((opponent, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                            {opponent.initials}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{opponent.name}</div>
                            <div className="text-sm text-gray-500">
                              {opponent.wins} wins / {opponent.debates} debates
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-sm">
                            <FaStar className="text-yellow-500" />
                            <span>{opponent.rating}</span>
                          </div>
                          <button
                            onClick={() => handleOpponentSelect(opponent)}
                            className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-all text-sm"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  // Handle debate creation logic here
                  setShowMatchingModal(false)
                  // Show confirmation or redirect
                  alert("1-on-1 debate scheduled successfully!")
                }}
                className="w-full bg-purple-600 text-white py-3 rounded-button hover:bg-purple-700 transition-all font-medium"
              >
                Schedule Debate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Debate Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Create Group Debate</h3>
              <button onClick={() => setShowRoomModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                <input
                  type="text"
                  placeholder="Enter a name for your debate room..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Debate Topic</label>
                <input
                  type="text"
                  placeholder="Enter the topic for discussion..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select
                    value={roomFilter.format}
                    onChange={(e) => setRoomFilter((prev) => ({ ...prev, format: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  >
                    <option value="Oxford Style">Oxford Style</option>
                    <option value="Parliamentary">Parliamentary</option>
                    <option value="Cross-Examination">Cross-Examination</option>
                    <option value="Lincoln-Douglas">Lincoln-Douglas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={roomFilter.difficulty}
                    onChange={(e) => setRoomFilter((prev) => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Participants</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20">
                    <option value="4">4 participants</option>
                    <option value="6">6 participants</option>
                    <option value="8">8 participants</option>
                    <option value="10">10 participants</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20">
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6">
                <h4 className="font-semibold text-gray-800 mb-4">Existing Debate Rooms</h4>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search for rooms..."
                    value={roomSearchQuery}
                    onChange={(e) => setRoomSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {filteredRooms.map((room) => (
                    <div key={room.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-800">{room.name}</h5>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          {room.status === "active" ? "Active" : "Scheduled"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{room.topic}</p>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-3">
                        <div>{room.format}</div>
                        <div>{room.difficulty}</div>
                        <div>
                          {room.participants.length}/{room.capacity} participants
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {room.participants.map((participant, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
                              title={participant.name}
                            >
                              {participant.avatar}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => handleJoinRoom(room.id)}
                          className="bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-all text-sm"
                        >
                          Join Room
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  // Handle room creation logic here
                  setIsCreatingRoom(true)
                  // Simulate API call with timeout
                  setTimeout(() => {
                    setShowRoomModal(false)
                    setIsCreatingRoom(false)
                    // Navigate to the group debate room
                    window.location.href = "/group-debate-room"
                  }, 1500)
                }}
                className="w-full bg-purple-600 text-white py-3 rounded-button hover:bg-purple-700 transition-all font-medium"
                disabled={isCreatingRoom}
              >
                {isCreatingRoom ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Room...
                  </span>
                ) : (
                  "Create Room"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Debate Participation Confirmation Modal */}
      {showConfirmationModal && selectedDebate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[500px] max-w-[90vw]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Successfully Added!</h3>
              <p className="text-gray-600">
                You have been added to the debate "{selectedDebate.name}" on {selectedDebate.date}.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-800 mb-2">Debate Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">
                    <span className="font-medium">Topic:</span> {selectedDebate.topic}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Format:</span> {selectedDebate.format}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Opponent:</span> {selectedDebate.opponent}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Difficulty:</span> {selectedDebate.difficulty}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Link href="/schedule" className="block w-full">
                  <span className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-all font-medium inline-block text-center">
                    View in Schedule
                  </span>
                </Link>
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

