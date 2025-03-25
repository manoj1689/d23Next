"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import {
  FaArrowLeft,
  FaSync,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCalendarCheck,
  FaClock,
  FaHourglassHalf,
  FaExclamationTriangle,
} from "react-icons/fa"
import { FaComments } from "react-icons/fa6"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState("month")
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
  const [showCalendarSyncModal, setShowCalendarSyncModal] = useState(false)
  const [showScheduleConflict, setShowScheduleConflict] = useState(false)

  const [availabilityPreferences, setAvailabilityPreferences] = useState({
    weekdays: {
      monday: ["morning", "evening"],
      tuesday: ["afternoon"],
      wednesday: ["morning", "afternoon", "evening"],
      thursday: ["afternoon"],
      friday: ["morning", "evening"],
      saturday: ["afternoon"],
      sunday: ["morning"],
    },
    timezone: "UTC-5",
    notifications: true,
    autoSync: false,
  })

  const upcomingDebates = [
    {
      id: 1,
      title: "AI Ethics in Healthcare",
      opponent: "Dr. Sarah Chen",
      date: "2025-03-26",
      time: "15:00",
      format: "Oxford Style",
      status: "confirmed",
      image: "https://public.readdy.ai/ai/img_res/79c41b5fcdc8c4069d3ab2b8d3d743f0.jpg",
    },
    {
      id: 2,
      title: "Global Climate Policy",
      opponent: "Prof. James Wilson",
      date: "2025-03-28",
      time: "14:30",
      format: "Cross-Examination",
      status: "pending",
      image: "https://public.readdy.ai/ai/img_res/ecf6ce3760c2dc445c9e365edfc6e06e.jpg",
    },
    {
      id: 3,
      title: "Digital Privacy Rights",
      opponent: "Elizabeth Martinez",
      date: "2025-03-30",
      time: "16:00",
      format: "Parliamentary",
      status: "conflict",
      image: "https://public.readdy.ai/ai/img_res/07cac258d8b1931d2d022b00a3636bb8.jpg",
    },
  ]

  const availabilityStats = [
    {
      title: "Scheduled Debates",
      value: "12",
      icon: <FaCalendarCheck />,
      color: "purple",
    },
    {
      title: "Available Hours",
      value: "24",
      icon: <FaClock />,
      color: "blue",
    },
    {
      title: "Pending Requests",
      value: "5",
      icon: <FaHourglassHalf />,
      color: "orange",
    },
    {
      title: "Schedule Conflicts",
      value: "2",
      icon: <FaExclamationTriangle />,
      color: "red",
    },
  ]

  // Chart options for ECharts
  const availabilityChartOption = {
    animation: false,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
      name: "Hours",
    },
    series: [
      {
        name: "Available Hours",
        type: "bar",
        data: [4, 2, 6, 2, 4, 2, 2],
        itemStyle: {
          color: "#8B5CF6",
        },
      },
    ],
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()

    // Get the first day of the month
    const firstDay = new Date(year, month, 1)
    const startingDayOfWeek = firstDay.getDay()

    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0)
    const totalDays = lastDay.getDate()

    // Create array for calendar days
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: "", isEmpty: true })
    }

    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, isEmpty: false })
    }

    // Add empty cells to complete the grid (if needed)
    const remainingCells = 42 - days.length // 6 rows x 7 columns = 42 cells
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: "", isEmpty: true })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Get month name
  const getMonthName = () => {
    return selectedDate.toLocaleString("default", { month: "long", year: "numeric" })
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
  }

  // Toggle availability period
  const toggleAvailabilityPeriod = (day: string, period: string) => {
    setAvailabilityPreferences((prev) => {
      const weekday = day as keyof typeof prev.weekdays
      const periods = [...prev.weekdays[weekday]]

      if (periods.includes(period)) {
        return {
          ...prev,
          weekdays: {
            ...prev.weekdays,
            [weekday]: periods.filter((p) => p !== period),
          },
        }
      } else {
        return {
          ...prev,
          weekdays: {
            ...prev.weekdays,
            [weekday]: [...periods, period],
          },
        }
      }
    })
  }

  // Save availability preferences
  const saveAvailabilityPreferences = () => {
    // Here you would typically save the preferences to your backend
    console.log("Saving preferences:", availabilityPreferences)
    setShowAvailabilityModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="flex items-center justify-between px-8 pt-8 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center">
            <FaComments className="text-purple-600" />
          </div>
          <span className="text-2xl font-bold">
            D23<span className="text-purple-600">.ai</span>
          </span>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-button hover:bg-gray-200 transition-all whitespace-nowrap"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Schedule Management</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowCalendarSyncModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-600 rounded-button hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap"
            >
              <FaSync />
              <span>Sync Calendar</span>
            </button>
            <button
              onClick={() => setShowAvailabilityModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-button hover:bg-purple-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <FaPlus />
              <span>Set Availability</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {availabilityStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div
                className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center mb-4 text-${stat.color}-600`}
              >
                {stat.icon}
              </div>
              <h3 className="text-gray-600 text-sm mb-2">{stat.title}</h3>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-gray-800">{getMonthName()}</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={goToPreviousMonth}
                      className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all cursor-pointer"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={goToNextMonth}
                      className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all cursor-pointer"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedView === "month"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedView("month")}
                  >
                    Month
                  </button>
                  <button
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedView === "week"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedView("week")}
                  >
                    Week
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-xl overflow-hidden">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}

                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`${
                      day.isEmpty ? "bg-gray-50/50" : "bg-white hover:bg-gray-50"
                    } px-4 py-6 min-h-[120px] relative transition-all ${!day.isEmpty ? "cursor-pointer" : ""}`}
                  >
                    {!day.isEmpty && <span className="text-sm text-gray-600">{day.day}</span>}

                    {/* Example event - in a real app, you'd map through events for this day */}
                    {day.day === 15 && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-lg">
                          AI Ethics Debate
                        </div>
                      </div>
                    )}

                    {day.day === 26 && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-lg">
                          Healthcare Debate
                        </div>
                      </div>
                    )}

                    {day.day === 28 && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-lg">Climate Policy</div>
                      </div>
                    )}

                    {day.day === 30 && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-lg">Privacy Rights</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Availability</h2>
              <div className="h-80">
                <ReactECharts option={availabilityChartOption} style={{ height: "100%", width: "100%" }} />
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Debates</h2>
              <div className="space-y-6">
                {upcomingDebates.map((debate) => (
                  <div key={debate.id} className="relative">
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-purple-200 transition-all">
                      <div className="h-32 relative">
                        <Image
                          src={debate.image || "/placeholder.svg"}
                          alt={debate.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 text-white">
                          <div className="text-sm font-medium">
                            {new Date(debate.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                          </div>
                          <div className="text-xs opacity-90">{debate.time}</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">{debate.title}</h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">vs {debate.opponent}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              debate.status === "confirmed"
                                ? "bg-green-100 text-green-600"
                                : debate.status === "pending"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                            }`}
                          >
                            {debate.status.charAt(0).toUpperCase() + debate.status.slice(1)}
                          </span>
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

      {/* Set Availability Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Set Availability</h3>
              <button onClick={() => setShowAvailabilityModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={availabilityPreferences.timezone}
                  onChange={(e) => setAvailabilityPreferences({ ...availabilityPreferences, timezone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                >
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC-4">Atlantic Time (UTC-4)</option>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Schedule</label>
                <div className="space-y-4">
                  {Object.entries(availabilityPreferences.weekdays).map(([day, periods]) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="w-24 text-sm text-gray-600 capitalize">{day}</span>
                      <div className="flex items-center space-x-2">
                        {["morning", "afternoon", "evening"].map((period) => (
                          <button
                            key={period}
                            onClick={() => toggleAvailabilityPeriod(day, period)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                              periods.includes(period)
                                ? "bg-purple-600 text-white"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={availabilityPreferences.notifications}
                    onChange={(e) =>
                      setAvailabilityPreferences({ ...availabilityPreferences, notifications: e.target.checked })
                    }
                    className="rounded text-purple-600 focus:ring-purple-600/20"
                  />
                  <span className="text-sm text-gray-700">Enable schedule notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={availabilityPreferences.autoSync}
                    onChange={(e) =>
                      setAvailabilityPreferences({ ...availabilityPreferences, autoSync: e.target.checked })
                    }
                    className="rounded text-purple-600 focus:ring-purple-600/20"
                  />
                  <span className="text-sm text-gray-700">Auto-sync with external calendars</span>
                </label>
              </div>
              <button
                onClick={saveAvailabilityPreferences}
                className="w-full bg-purple-600 text-white py-2.5 rounded-button hover:bg-purple-700 transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Sync Modal - would be implemented in a real app */}
      {showCalendarSyncModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Sync Calendar</h3>
              <button onClick={() => setShowCalendarSyncModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600">Connect your external calendars to automatically sync your schedule.</p>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <FaCalendarCheck />
                    </div>
                    <span className="font-medium">Google Calendar</span>
                  </div>
                  <span className="text-sm text-gray-500">Connect</span>
                </button>

                <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <FaCalendarCheck />
                    </div>
                    <span className="font-medium">Microsoft Outlook</span>
                  </div>
                  <span className="text-sm text-gray-500">Connect</span>
                </button>

                <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <FaCalendarCheck />
                    </div>
                    <span className="font-medium">Apple Calendar</span>
                  </div>
                  <span className="text-sm text-gray-500">Connect</span>
                </button>
              </div>

              <button
                onClick={() => setShowCalendarSyncModal(false)}
                className="w-full bg-purple-600 text-white py-2.5 rounded-button hover:bg-purple-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Schedule

