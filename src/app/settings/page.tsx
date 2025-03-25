"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Modal } from "react-responsive-modal"
import { ToastContainer, toast } from "react-toastify"
import {
  FaArrowLeft,
  FaUser,
  FaShieldAlt,
  FaSlidersH,
  FaBell,
  FaLock,
  FaUniversalAccess,
  FaCamera,
  FaUpload,
  FaCloudUploadAlt,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa"

// Import CSS for react-responsive-modal and react-toastify
import "react-responsive-modal/styles.css"
import "react-toastify/dist/ReactToastify.css"

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState("profile")
  const [openModal, setOpenModal] = useState<string | null>(null)

  const [profileData, setProfileData] = useState({
    name: "Alex Kovalev",
    email: "alex.kovalev@example.com",
    title: "Professional Debater",
    bio: "Experienced debater specializing in technology ethics and environmental policy. Multiple tournament winner with a passion for structured argumentation.",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    language: "English",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailDebateInvites: true,
    emailResults: true,
    emailNewTopics: false,
    inAppDebateInvites: true,
    inAppResults: true,
    inAppNewTopics: true,
    debateReminders: true,
    newsletter: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    debateHistoryVisibility: "connections",
    showRating: true,
    allowMessages: true,
    searchable: true,
  })

  const [debatePreferences, setDebatePreferences] = useState({
    defaultFormat: "Oxford Style",
    difficultyLevel: "Advanced",
    preferredTopics: ["Technology Ethics", "Environmental Policy", "Global Economics"],
    autoMatchmaking: true,
    preparationTime: "30 minutes",
  })

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: "medium",
    contrast: "normal",
    reducedMotion: false,
    screenReader: false,
  })

  // Handle profile update
  const handleProfileUpdate = () => {
    toast.success("Settings updated successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  // Handle privacy setting change with confirmation
  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacySettings((prev) => {
      const newSettings = { ...prev, [key]: value }
      toast.success("Privacy settings updated successfully", {
        position: "bottom-right",
        autoClose: 3000,
      })
      return newSettings
    })
    setOpenModal(null)
  }

  // Add new topic to preferred topics
  const handleAddTopic = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement
      const newTopic = input.value.trim()
      if (newTopic && !debatePreferences.preferredTopics.includes(newTopic)) {
        setDebatePreferences({
          ...debatePreferences,
          preferredTopics: [...debatePreferences.preferredTopics, newTopic],
        })
        input.value = ""
      }
    }
  }

  // Remove topic from preferred topics
  const handleRemoveTopic = (index: number) => {
    const newTopics = debatePreferences.preferredTopics.filter((_, i) => i !== index)
    setDebatePreferences({ ...debatePreferences, preferredTopics: newTopics })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Toast Container for notifications */}
      <ToastContainer />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-24 min-h-screen">
        {/* Navigation Tabs */}
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-16 z-40">
          <div className="container mx-auto px-6">
            <div className="flex items-center h-20">
              <div className="flex-1 flex items-center space-x-6 overflow-x-auto">
                <button
                  onClick={() => setActiveSection("profile")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap ${
                    activeSection === "profile" ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  <FaUser />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveSection("security")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap ${
                    activeSection === "security"
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  <FaShieldAlt />
                  <span>Security</span>
                </button>
                <button
                  onClick={() => setActiveSection("preferences")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap ${
                    activeSection === "preferences"
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  <FaSlidersH />
                  <span>Preferences</span>
                </button>
                <button
                  onClick={() => setActiveSection("notifications")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap ${
                    activeSection === "notifications"
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  <FaBell />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveSection("privacy")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap ${
                    activeSection === "privacy" ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  <FaLock />
                  <span>Privacy</span>
                </button>
                <button
                  onClick={() => setActiveSection("accessibility")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap ${
                    activeSection === "accessibility"
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  <FaUniversalAccess />
                  <span>Accessibility</span>
                </button>
              </div>
              <button
                onClick={handleProfileUpdate}
                className="bg-purple-600 text-white px-6 py-2 rounded-button hover:bg-purple-700 transition-all cursor-pointer whitespace-nowrap"
              >
                Save Changes
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-semibold">
                      AK
                    </div>
                    <button
                      onClick={() => setOpenModal("profilePhoto")}
                      className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-purple-600 cursor-pointer hover:bg-purple-50 transition-all"
                    >
                      <FaCamera />
                    </button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                  <input
                    type="text"
                    value={profileData.title}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20 h-32 resize-none"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    >
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Two-Factor Authentication</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Authenticator App</h4>
                        <p className="text-sm text-gray-600">Use an authenticator app to generate verification codes</p>
                      </div>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-button hover:bg-purple-700 transition-all cursor-pointer whitespace-nowrap">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Login History</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">San Francisco, United States</div>
                          <div className="text-sm text-gray-600">March 24, 2025 at 10:30 AM</div>
                        </div>
                        <div className="text-green-600">
                          <FaCheckCircle className="inline mr-2" />
                          Current Session
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">New York, United States</div>
                          <div className="text-sm text-gray-600">March 23, 2025 at 3:45 PM</div>
                        </div>
                        <button
                          onClick={() => setOpenModal("removeLogin")}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeSection === "preferences" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Debate Format</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {["Oxford Style", "Lincoln-Douglas", "Parliamentary", "Cross-Examination"].map((format) => (
                      <button
                        key={format}
                        onClick={() => setDebatePreferences({ ...debatePreferences, defaultFormat: format })}
                        className={`p-4 rounded-xl text-sm font-medium transition-all ${
                          debatePreferences.defaultFormat === format
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Difficulty Level</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDebatePreferences({ ...debatePreferences, difficultyLevel: level })}
                        className={`p-4 rounded-xl text-sm font-medium transition-all ${
                          debatePreferences.difficultyLevel === level
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Topics of Interest</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {debatePreferences.preferredTopics.map((topic, index) => (
                        <div
                          key={index}
                          className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>{topic}</span>
                          <button onClick={() => handleRemoveTopic(index)} className="hover:text-purple-700">
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add a new topic..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                      onKeyPress={handleAddTopic}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Additional Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">Auto-Matchmaking</h4>
                        <p className="text-sm text-gray-600">Allow system to automatically match you with opponents</p>
                      </div>
                      <button
                        onClick={() =>
                          setDebatePreferences({
                            ...debatePreferences,
                            autoMatchmaking: !debatePreferences.autoMatchmaking,
                          })
                        }
                        className={`w-12 h-6 rounded-full transition-all ${debatePreferences.autoMatchmaking ? "bg-purple-600" : "bg-gray-300"}`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transform transition-all ${debatePreferences.autoMatchmaking ? "translate-x-7" : "translate-x-1"}`}
                        ></div>
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Preparation Time</h4>
                      <select
                        value={debatePreferences.preparationTime}
                        onChange={(e) =>
                          setDebatePreferences({ ...debatePreferences, preparationTime: e.target.value })
                        }
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                      >
                        <option value="15 minutes">15 minutes</option>
                        <option value="30 minutes">30 minutes</option>
                        <option value="45 minutes">45 minutes</option>
                        <option value="60 minutes">60 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: "emailDebateInvites",
                        label: "Debate Invitations",
                        description: "Receive emails when you are invited to debates",
                      },
                      {
                        key: "emailResults",
                        label: "Debate Results",
                        description: "Get notified about debate outcomes and feedback",
                      },
                      {
                        key: "emailNewTopics",
                        label: "New Topics",
                        description: "Stay updated on new debate topics in your areas of interest",
                      },
                      {
                        key: "newsletter",
                        label: "Newsletter",
                        description: "Receive our monthly newsletter with debate tips and updates",
                      },
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                        <div>
                          <h4 className="font-semibold text-gray-800">{setting.label}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <button
                          onClick={() =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [setting.key]: !notificationSettings[setting.key as keyof typeof notificationSettings],
                            })
                          }
                          className={`w-12 h-6 rounded-full transition-all ${notificationSettings[setting.key as keyof typeof notificationSettings] ? "bg-purple-600" : "bg-gray-300"}`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transform transition-all ${notificationSettings[setting.key as keyof typeof notificationSettings] ? "translate-x-7" : "translate-x-1"}`}
                          ></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">In-App Notifications</h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: "inAppDebateInvites",
                        label: "Debate Invitations",
                        description: "Show notifications for new debate invites",
                      },
                      {
                        key: "inAppResults",
                        label: "Debate Results",
                        description: "Show notifications for debate outcomes",
                      },
                      {
                        key: "inAppNewTopics",
                        label: "New Topics",
                        description: "Show notifications for new debate topics",
                      },
                      {
                        key: "debateReminders",
                        label: "Debate Reminders",
                        description: "Show reminders before scheduled debates",
                      },
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                        <div>
                          <h4 className="font-semibold text-gray-800">{setting.label}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <button
                          onClick={() =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [setting.key]: !notificationSettings[setting.key as keyof typeof notificationSettings],
                            })
                          }
                          className={`w-12 h-6 rounded-full transition-all ${notificationSettings[setting.key as keyof typeof notificationSettings] ? "bg-purple-600" : "bg-gray-300"}`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transform transition-all ${notificationSettings[setting.key as keyof typeof notificationSettings] ? "translate-x-7" : "translate-x-1"}`}
                          ></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Section */}
            {activeSection === "privacy" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Visibility</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">Who can see your profile?</h4>
                      </div>
                      <div className="space-y-2">
                        {["public", "connections", "private"].map((option) => (
                          <button
                            key={option}
                            onClick={() => setPrivacySettings({ ...privacySettings, profileVisibility: option })}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                              privacySettings.profileVisibility === option
                                ? "bg-purple-600 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <span className="capitalize">{option}</span>
                            {privacySettings.profileVisibility === option && <FaCheck />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">Debate History Visibility</h4>
                      </div>
                      <div className="space-y-2">
                        {["public", "connections", "private"].map((option) => (
                          <button
                            key={option}
                            onClick={() => setPrivacySettings({ ...privacySettings, debateHistoryVisibility: option })}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                              privacySettings.debateHistoryVisibility === option
                                ? "bg-purple-600 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <span className="capitalize">{option}</span>
                            {privacySettings.debateHistoryVisibility === option && <FaCheck />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Additional Privacy Settings</h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: "showRating",
                        label: "Show Rating",
                        description: "Display your debate rating on your profile",
                        warning: "Making your rating public allows all users to see your debate performance metrics.",
                      },
                      {
                        key: "allowMessages",
                        label: "Allow Messages",
                        description: "Receive messages from other debaters",
                        warning: "Enabling messages means any registered user can send you direct messages.",
                      },
                      {
                        key: "searchable",
                        label: "Searchable Profile",
                        description: "Allow your profile to appear in search results",
                        warning:
                          "Making your profile searchable means it can appear in public search results and be discovered by anyone.",
                      },
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                        <div>
                          <h4 className="font-semibold text-gray-800">{setting.label}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <button
                          onClick={() => setOpenModal(`privacy-${setting.key}`)}
                          className={`w-12 h-6 rounded-full transition-all ${privacySettings[setting.key as keyof typeof privacySettings] ? "bg-purple-600" : "bg-gray-300"}`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transform transition-all ${privacySettings[setting.key as keyof typeof privacySettings] ? "translate-x-7" : "translate-x-1"}`}
                          ></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Accessibility Section */}
            {activeSection === "accessibility" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Display Settings</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Font Size</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {["small", "medium", "large"].map((size) => (
                          <button
                            key={size}
                            onClick={() => setAccessibilitySettings({ ...accessibilitySettings, fontSize: size })}
                            className={`p-3 rounded-xl text-sm font-medium transition-all ${
                              accessibilitySettings.fontSize === size
                                ? "bg-purple-600 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <span className="capitalize">{size}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Contrast</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {["normal", "high", "maximum"].map((contrast) => (
                          <button
                            key={contrast}
                            onClick={() => setAccessibilitySettings({ ...accessibilitySettings, contrast: contrast })}
                            className={`p-3 rounded-xl text-sm font-medium transition-all ${
                              accessibilitySettings.contrast === contrast
                                ? "bg-purple-600 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <span className="capitalize">{contrast}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Motion & Navigation</h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: "reducedMotion",
                        label: "Reduced Motion",
                        description: "Minimize animations and transitions",
                      },
                      {
                        key: "screenReader",
                        label: "Screen Reader Support",
                        description: "Optimize for screen readers",
                      },
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                        <div>
                          <h4 className="font-semibold text-gray-800">{setting.label}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <button
                          onClick={() =>
                            setAccessibilitySettings({
                              ...accessibilitySettings,
                              [setting.key]: !accessibilitySettings[setting.key as keyof typeof accessibilitySettings],
                            })
                          }
                          className={`w-12 h-6 rounded-full transition-all ${accessibilitySettings[setting.key as keyof typeof accessibilitySettings] ? "bg-purple-600" : "bg-gray-300"}`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transform transition-all ${accessibilitySettings[setting.key as keyof typeof accessibilitySettings] ? "translate-x-7" : "translate-x-1"}`}
                          ></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Photo Modal */}
      <Modal
        open={openModal === "profilePhoto"}
        onClose={() => setOpenModal(null)}
        center
        classNames={{
          modal: "rounded-3xl p-8 w-[480px] max-h-[90vh] overflow-y-auto",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Update Profile Photo</h3>
          <button className="text-gray-400 hover:text-gray-600" onClick={() => setOpenModal(null)}>
            <FaTimes />
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition-all whitespace-nowrap">
              <FaUpload />
              <span>Upload Photo</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition-all whitespace-nowrap">
              <FaCamera />
              <span>Take Photo</span>
            </button>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-purple-400 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCloudUploadAlt className="text-2xl text-purple-600" />
            </div>
            <p className="text-gray-600 mb-2">Drag and drop your photo here</p>
            <p className="text-sm text-gray-500">Supports: JPEG, PNG (Max 5MB)</p>
          </div>
        </div>
        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => setOpenModal(null)}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-xl transition-all whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setOpenModal(null)
              toast.success("Profile photo updated successfully!")
            }}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-all whitespace-nowrap"
          >
            Save Photo
          </button>
        </div>
      </Modal>

      {/* Remove Login Modal */}
      <Modal
        open={openModal === "removeLogin"}
        onClose={() => setOpenModal(null)}
        center
        classNames={{
          modal: "rounded-3xl p-8 w-[480px]",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Remove Login Record</h3>
          <button className="text-gray-400 hover:text-gray-600" onClick={() => setOpenModal(null)}>
            <FaTimes />
          </button>
        </div>
        <p className="text-gray-600 mb-8">
          Are you sure you want to remove this login record? This action cannot be undone.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => setOpenModal(null)}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-xl transition-all whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setOpenModal(null)
              toast.success("Login record removed successfully")
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition-all whitespace-nowrap"
          >
            Confirm Remove
          </button>
        </div>
      </Modal>

      {/* Privacy Setting Confirmation Modals */}
      {["showRating", "allowMessages", "searchable"].map((key) => (
        <Modal
          key={key}
          open={openModal === `privacy-${key}`}
          onClose={() => setOpenModal(null)}
          center
          classNames={{
            modal: "rounded-3xl p-8 w-[480px] max-w-[90vw]",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Confirm Privacy Change</h3>
            <button className="text-gray-400 hover:text-gray-600" onClick={() => setOpenModal(null)}>
              <FaTimes />
            </button>
          </div>
          <div className="mb-8">
            <div className="flex items-center space-x-3 text-amber-600 bg-amber-50 rounded-xl p-4 mb-4">
              <FaExclamationTriangle />
              <p className="text-sm">
                {key === "showRating" &&
                  "Making your rating public allows all users to see your debate performance metrics."}
                {key === "allowMessages" && "Enabling messages means any registered user can send you direct messages."}
                {key === "searchable" &&
                  "Making your profile searchable means it can appear in public search results and be discovered by anyone."}
              </p>
            </div>
            <p className="text-gray-600">
              Are you sure you want to {privacySettings[key as keyof typeof privacySettings] ? "disable" : "enable"}{" "}
              this setting?
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setOpenModal(null)}
              className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-xl transition-all whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={() => handlePrivacyChange(key, !privacySettings[key as keyof typeof privacySettings])}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-all whitespace-nowrap"
            >
              Confirm Change
            </button>
          </div>
        </Modal>
      ))}
    </div>
  )
}

export default Settings

