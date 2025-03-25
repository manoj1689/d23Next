"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { FaArrowLeft, FaPlus, FaSearch, FaUndo, FaTimes } from "react-icons/fa"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

const Tournaments: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [skillLevel, setSkillLevel] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<any>(null)
  const [tournamentForm, setTournamentForm] = useState({
    name: "",
    description: "",
    format: "single",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    prizePool: "",
    maxParticipants: "",
    skillLevel: "intermediate",
  })

  const [activeTournaments, setActiveTournaments] = useState([
    {
      id: 1,
      name: "Global Debate Masters 2025",
      banner: "https://public.readdy.ai/ai/img_res/d8d7979695e669b91e18cad82c2dae9c.jpg",
      format: "Single Elimination",
      prizePool: "$10,000",
      currentParticipants: 28,
      maxParticipants: 32,
      deadline: "2025-04-15",
      skillLevel: "Professional",
      status: "Registration Open",
      justCreated: false,
      rounds: [
        { round: "Quarter Finals", completed: false },
        { round: "Semi Finals", completed: false },
        { round: "Finals", completed: false },
      ],
    },
    {
      id: 2,
      name: "Tech Policy Debate Series",
      banner: "https://public.readdy.ai/ai/img_res/a37cc432d5f41d016eb493be6cde8868.jpg",
      format: "Double Elimination",
      prizePool: "$5,000",
      currentParticipants: 14,
      maxParticipants: 16,
      deadline: "2025-04-10",
      skillLevel: "Advanced",
      status: "In Progress",
      justCreated: false,
      rounds: [
        { round: "Round 1", completed: true },
        { round: "Round 2", completed: false },
        { round: "Finals", completed: false },
      ],
    },
  ])

  const [upcomingTournaments, setUpcomingTournaments] = useState([
    {
      id: 3,
      name: "International Youth Debate Championship",
      banner: "https://public.readdy.ai/ai/img_res/eaa114672d1a86f256290ff72ae97004.jpg",
      format: "Swiss System",
      prizePool: "$7,500",
      currentParticipants: 42,
      maxParticipants: 64,
      deadline: "2025-05-01",
      skillLevel: "Intermediate",
      status: "Early Bird Open",
      justCreated: false,
      earlyBirdDiscount: "20% off",
    },
    {
      id: 4,
      name: "Environmental Policy Debate Forum",
      banner: "https://public.readdy.ai/ai/img_res/ec46709e63411f1486fc20b41494e1d9.jpg",
      format: "Round Robin",
      prizePool: "$6,000",
      currentParticipants: 12,
      maxParticipants: 16,
      deadline: "2025-05-15",
      skillLevel: "Advanced",
      status: "Registration Open",
      justCreated: false,
      specialFeature: "Carbon Neutral Event",
    },
  ])

  // Chart options for ECharts
  const bracketOption = {
    animation: false,
    series: [
      {
        type: "tree",
        data: [
          {
            name: "Finals",
            children: [
              {
                name: "Semi-Final 1",
                children: [{ name: "Quarter-Final 1" }, { name: "Quarter-Final 2" }],
              },
              {
                name: "Semi-Final 2",
                children: [{ name: "Quarter-Final 3" }, { name: "Quarter-Final 4" }],
              },
            ],
          },
        ],
        layout: "orthogonal",
        orient: "LR",
        itemStyle: {
          color: "#7C3AED",
        },
        lineStyle: {
          color: "#E5E7EB",
        },
        label: {
          position: "left",
          color: "#1F2937",
        },
      },
    ],
  }

  const handleCreateTournament = () => {
    // Validate form fields
    const errors = []
    if (!tournamentForm.name) errors.push("Tournament name is required")
    if (!tournamentForm.description) errors.push("Description is required")
    if (!tournamentForm.startDate) errors.push("Start date is required")
    if (!tournamentForm.endDate) errors.push("End date is required")

    if (errors.length > 0) {
      // Show error messages (in a real app, you'd use a toast or alert component)
      alert(`Please fix the following errors:\n${errors.join("\n")}`)
      return
    }

    // Create new tournament object
    const newTournament = {
      id: Date.now(),
      name: tournamentForm.name,
      banner: "https://public.readdy.ai/ai/img_res/31970d23a436bc8380f77cc87c0af10b.jpg",
      format: tournamentForm.format || "Single Elimination",
      prizePool: tournamentForm.prizePool || "$5,000",
      currentParticipants: 0,
      maxParticipants: Number.parseInt(tournamentForm.maxParticipants) || 32,
      deadline: tournamentForm.endDate,
      skillLevel: tournamentForm.skillLevel || "Intermediate",
      status: "Registration Open",
      justCreated: true,
      rounds: [
        { round: "Quarter Finals", completed: false },
        { round: "Semi Finals", completed: false },
        { round: "Finals", completed: false },
      ],
    }

    // Add to active tournaments
    setActiveTournaments((prev) => [newTournament, ...prev])

    // Show success message (in a real app, you'd use a toast component)
    alert("Tournament created successfully!")

    // Reset form and close modal
    setTournamentForm({
      name: "",
      description: "",
      format: "single",
      startDate: "",
      endDate: "",
      registrationDeadline: "",
      prizePool: "",
      maxParticipants: "",
      skillLevel: "intermediate",
    })
    setShowCreateModal(false)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSkillLevel("all")
    setDateRange({ start: "", end: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600">
                <FaArrowLeft />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-button hover:bg-purple-700 transition-all text-sm font-medium cursor-pointer whitespace-nowrap flex items-center"
              >
                <FaPlus className="mr-2" />
                Create Tournament
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Tournaments</h1>

          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="professional">Professional</option>
            </select>

            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
            />

            <button onClick={resetFilters} className="text-gray-600 hover:text-purple-600 transition-colors">
              <FaUndo />
            </button>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Tournaments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-purple-200 transition-all"
                >
                  {tournament.justCreated && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium animate-pulse">
                        Just Created
                      </span>
                    </div>
                  )}
                  <div className="relative h-48">
                    <Image
                      src={tournament.banner || "/placeholder.svg"}
                      alt={tournament.name}
                      width={600}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{tournament.name}</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-sm backdrop-blur-sm">
                          {tournament.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Prize Pool</div>
                        <div className="text-lg font-bold text-gray-800">{tournament.prizePool}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Format</div>
                        <div className="text-lg font-bold text-gray-800">{tournament.format}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Participants</div>
                        <div className="text-lg font-bold text-gray-800">
                          {tournament.currentParticipants}/{tournament.maxParticipants}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Deadline</div>
                        <div className="text-lg font-bold text-gray-800">{tournament.deadline}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTournament(tournament)
                        setShowRegisterModal(true)
                      }}
                      className="w-full bg-purple-600 text-white px-6 py-3 rounded-button hover:bg-purple-700 transition-all font-medium cursor-pointer whitespace-nowrap"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Tournaments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-purple-200 transition-all"
                >
                  {tournament.justCreated && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium animate-pulse">
                        Just Created
                      </span>
                    </div>
                  )}
                  <div className="relative h-48">
                    <Image
                      src={tournament.banner || "/placeholder.svg"}
                      alt={tournament.name}
                      width={600}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{tournament.name}</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm backdrop-blur-sm">
                          {tournament.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Prize Pool</div>
                        <div className="text-lg font-bold text-gray-800">{tournament.prizePool}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Format</div>
                        <div className="text-lg font-bold text-gray-800">{tournament.format}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Participants</div>
                        <div className="text-lg font-bold text-gray-800">
                          {tournament.currentParticipants}/{tournament.maxParticipants}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Deadline</div>
                        <div className="text-lg font-bold text-gray-800">{tournament.deadline}</div>
                      </div>
                    </div>
                    <button className="w-full bg-gray-100 text-gray-600 px-6 py-3 rounded-button hover:bg-gray-200 transition-all font-medium cursor-pointer whitespace-nowrap">
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tournament bracket visualization would go here in a real implementation */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20 mb-8 hidden">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tournament Bracket</h2>
          <div className="h-80" id="tournamentBracket">
            <ReactECharts option={bracketOption} style={{ height: "100%", width: "100%" }} />
          </div>
        </div>
      </div>

      {/* Create Tournament Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Create Tournament</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tournament Name</label>
                <input
                  type="text"
                  value={tournamentForm.name}
                  onChange={(e) => setTournamentForm({ ...tournamentForm, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  placeholder="Enter tournament name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={tournamentForm.description}
                  onChange={(e) => setTournamentForm({ ...tournamentForm, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20 h-32 resize-none"
                  placeholder="Enter tournament description"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select
                  value={tournamentForm.format}
                  onChange={(e) => setTournamentForm({ ...tournamentForm, format: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                >
                  <option value="single">Single Elimination</option>
                  <option value="double">Double Elimination</option>
                  <option value="swiss">Swiss System</option>
                  <option value="round">Round Robin</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={tournamentForm.startDate}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, startDate: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={tournamentForm.endDate}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, endDate: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prize Pool</label>
                  <input
                    type="text"
                    value={tournamentForm.prizePool}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, prizePool: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    placeholder="e.g. $5,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                  <input
                    type="number"
                    value={tournamentForm.maxParticipants}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, maxParticipants: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    placeholder="e.g. 32"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                <select
                  value={tournamentForm.skillLevel}
                  onChange={(e) => setTournamentForm({ ...tournamentForm, skillLevel: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
              <button
                onClick={handleCreateTournament}
                className="w-full bg-purple-600 text-white py-3 rounded-button hover:bg-purple-700 transition-all font-medium cursor-pointer whitespace-nowrap"
              >
                Create Tournament
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register for Tournament Modal */}
      {showRegisterModal && selectedTournament && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Register for Tournament</h3>
              <button
                onClick={() => {
                  setShowRegisterModal(false)
                  setSelectedTournament(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">{selectedTournament.name}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Prize Pool:</span>
                    <span className="font-medium text-gray-800 ml-2">{selectedTournament.prizePool}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium text-gray-800 ml-2">{selectedTournament.format}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Team</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20">
                  <option value="individual">Individual Participant</option>
                  <option value="team1">Debate Team Alpha</option>
                  <option value="team2">Logic Masters</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20 h-32 resize-none"
                  placeholder="Any special requirements or information..."
                ></textarea>
              </div>
              <button
                onClick={() => {
                  // In a real app, you'd handle the registration submission here
                  alert("Registration confirmed!")
                  setShowRegisterModal(false)
                  setSelectedTournament(null)
                }}
                className="w-full bg-purple-600 text-white py-3 rounded-button hover:bg-purple-700 transition-all font-medium cursor-pointer whitespace-nowrap"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tournaments

