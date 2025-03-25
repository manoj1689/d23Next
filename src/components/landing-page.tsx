"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import {
  FaRocket,
  FaPlay,
  FaArrowRight,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPencilAlt,
  FaPaperPlane,
  FaPhone,
  FaMapMarkerAlt,
  FaUserPlus,
  FaAward,
  FaCrown,
  FaTimes,
} from "react-icons/fa"
import { FaComments, FaClock, FaGlobe, FaBrain, FaChartLine, FaUsers, FaBuilding, FaCheck } from "react-icons/fa6"
import { FaXTwitter, FaLinkedinIn, FaGithub, FaDiscord, FaYoutube, FaGoogle } from "react-icons/fa6"

const LandingPage: React.FC = () => {
  const [showPricing, setShowPricing] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [showTrialModal, setShowTrialModal] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({ name: "", email: "", message: "" })
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthLoading(true)
      // Simulate Google OAuth authentication
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Navigate to dashboard directly
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Authentication failed:", error)
    } finally {
      setIsAuthLoading(false)
    }
  }

  const handleStartFreeTrial = () => {
    // Navigate directly to the onboarding page
    window.location.href = "/onboarding"
  }

  const debateFormats = [
    {
      title: "Structured",
      description:
        "Formal debate with defined speaking times and argument rounds. Perfect for competitive debates and tournaments.",
      icon: <FaClock />,
      features: ["Timed rounds", "Organized speaking order", "Clear argument structure", "Formal scoring system"],
    },
    {
      title: "Free-flowing",
      description:
        "Dynamic open debate format without strict time constraints. Ideal for practice and casual discussions.",
      icon: <FaComments />,
      features: [
        "Natural conversation flow",
        "Flexible topic exploration",
        "Real-time responses",
        "Interactive feedback",
      ],
    },
    {
      title: "Asynchronous",
      description:
        "Participate at your own pace with thoughtful responses. Great for global participants across time zones.",
      icon: <FaGlobe />,
      features: [
        "24/7 availability",
        "In-depth research time",
        "Cross-timezone participation",
        "Extended discussion period",
      ],
    },
  ]

  const leaders = [
    { name: "Emma Watson", title: "Senior Debate Coach", rank: "01", score: "2850" },
    { name: "Michael Chen", title: "Policy Expert", rank: "02", score: "2780" },
    { name: "Sarah Johnson", title: "Ethics Specialist", rank: "03", score: "2720" },
    { name: "James Wilson", title: "Research Lead", rank: "04", score: "2690" },
    { name: "Lucas George", title: "Tech Analyst", rank: "05", score: "2650" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[800px] bg-gradient-to-br from-slate-900 to-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://readdy.ai/api/search-image?query=futuristic debate arena with floating holographic displays, geometric patterns, clean modern aesthetic with subtle purple and blue accent lighting, minimalist design with high tech elements&width=1440&height=800&seq=1&orientation=landscape&flag=8cc9fde81a9a33b4864eafac2485b3c1)",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-transparent"></div>
        <div className="container mx-auto px-6 relative h-full flex flex-col">
          <nav className="py-8 flex items-center justify-between backdrop-blur-sm bg-slate-900/30 px-8 rounded-2xl mt-6">
            <div className="flex items-center">
              <div className="relative">
                <FaComments className="text-purple-400 text-3xl" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <span className="ml-3 text-2xl font-bold text-white">
                D23<span className="text-purple-400">.ai</span>
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-200 hover:text-purple-400 transition-colors duration-300">
                  Features
                </a>
                <a href="#pricing" className="text-gray-200 hover:text-purple-400 transition-colors duration-300">
                  Pricing
                </a>
                <a href="#about" className="text-gray-200 hover:text-purple-400 transition-colors duration-300">
                  About
                </a>
                <a href="#blog" className="text-gray-200 hover:text-purple-400 transition-colors duration-300">
                  Blog
                </a>
                <a href="#join" className="text-gray-200 hover:text-purple-400 transition-colors duration-300">
                  Join Us
                </a>
              </div>
              <button
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-purple-400/30 text-white px-6 py-2.5 rounded-button hover:bg-purple-400/20 transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGoogleSignIn}
                disabled={isAuthLoading}
              >
                {isAuthLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <FaGoogle className="text-purple-400" />
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>
            </div>
          </nav>
          <div className="flex items-center h-full">
            <div className="max-w-2xl">
              <div className="relative inline-block mb-6">
                <span className="text-purple-400 text-lg font-semibold bg-purple-400/10 px-4 py-2 rounded-full">
                  AI-Powered Debate Platform
                </span>
              </div>
              <h1 className="text-7xl font-bold text-white leading-tight relative mb-8">
                Master the Art of
                <div className="relative">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Debate with AI
                  </span>
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-purple-400 rounded-full"></div>
                </div>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-xl">
                Experience the future of debate training with our cutting-edge AI platform. Get real-time feedback,
                practice with intelligent opponents, and join a global community of critical thinkers.
              </p>
              <div className="flex space-x-6 items-center">
                <button
                  onClick={handleStartFreeTrial}
                  className="group relative bg-purple-500 text-white px-8 py-4 rounded-button hover:bg-purple-600 transition-all duration-300 cursor-pointer shadow-lg shadow-purple-500/30"
                >
                  <span className="relative z-10 flex items-center">
                    <FaRocket className="mr-2" />
                    Start Free Trial
                  </span>
                </button>
                <button className="group flex items-center space-x-3 text-white hover:text-purple-400 transition-colors duration-300">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-purple-400/30">
                    <FaPlay className="text-sm" />
                  </div>
                  <span>Watch Demo</span>
                </button>
              </div>
              <div className="flex items-center space-x-8 mt-16">
                {[
                  { value: "50K+", label: "Active Users" },
                  { value: "95%", label: "Success Rate" },
                  { value: "24/7", label: "AI Support" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                    {index < 2 && <div className="h-8 w-px bg-purple-400/20 ml-6"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debate Formats */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              Debate Formats
            </span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              Master Different Debate Styles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elevate your debating skills with our comprehensive range of AI-powered debate formats
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent rounded-3xl blur-3xl"></div>
            {debateFormats.map((format, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-white/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                      <span className="text-2xl text-white">{format.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {format.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{format.description}</p>
                  <ul className="space-y-3 mb-6">
                    {format.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <FaCheckCircle className="text-purple-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-gray-100">
                    <button
                      className="w-full bg-purple-50 hover:bg-purple-100 text-purple-600 py-3 rounded-button transition-all duration-300 flex items-center justify-center space-x-2"
                      onClick={() => {
                        console.log(`Selected ${format.title} format`)
                        // Add your format selection logic here
                      }}
                    >
                      <span>Try {format.title} Format</span>
                      <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              AI Tools
            </span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              AI-Powered Debate Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your debate skills with our advanced AI technology and real-time analytics
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Analysis",
                icon: <FaBrain />,
                description:
                  "Advanced AI-driven feedback and performance tracking system that analyzes your debate performance in real-time.",
                gradient: "from-purple-50 to-indigo-50",
                iconGradient: "from-purple-500 to-indigo-500",
                checkColor: "text-indigo-500",
                image: "https://public.readdy.ai/ai/img_res/9b5582d5935b593548eb09dbcb6c106d.jpg",
                features: [
                  "Argument Structure Analysis",
                  "Rhetorical Style Feedback",
                  "Performance Analytics",
                  "Improvement Suggestions",
                ],
              },
              {
                title: "Live Practice",
                icon: <FaChartLine />,
                description:
                  "24/7 AI debate partners for continuous skill development with personalized learning paths.",
                gradient: "from-blue-50 to-purple-50",
                iconGradient: "from-blue-500 to-purple-500",
                checkColor: "text-blue-500",
                image: "https://public.readdy.ai/ai/img_res/1a305188bb4b6c7f925e4df9f7df3433.jpg",
                features: [
                  "Multiple Difficulty Levels",
                  "Dynamic Topic Generator",
                  "Real-time Feedback",
                  "Custom Practice Sessions",
                ],
              },
              {
                title: "Community Hub",
                icon: <FaUsers />,
                description: "Connect, compete, and learn with fellow debaters in our global community platform.",
                gradient: "from-pink-50 to-purple-50",
                iconGradient: "from-pink-500 to-purple-500",
                checkColor: "text-pink-500",
                image: "https://public.readdy.ai/ai/img_res/b72aac7d4890f4086260a650ebcf4707.jpg",
                features: [
                  "Live Tournament Events",
                  "Peer Learning Network",
                  "Global Rankings",
                  "Community Challenges",
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.iconGradient} rounded-xl flex items-center justify-center mb-6`}
                >
                  <span className="text-white text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                <div className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <FaCheck className={feature.checkColor} />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button className="w-full bg-white/50 hover:bg-white/80 text-gray-700 px-6 py-3 rounded-button transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Learn More</span>
                    <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Steps */}
      <div className="py-20 bg-gradient-to-br from-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              Getting Started
            </span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              Start Your Success Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Begin your path to debate mastery with our proven AI-driven learning system
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mt-6"></div>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[80%] h-2 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 rounded-full"></div>
            <div className="grid md:grid-cols-3 gap-12 relative">
              {[
                {
                  step: 1,
                  title: "Create your Account",
                  description: "Set up your profile and preferences in minutes",
                  image: "https://public.readdy.ai/ai/img_res/ee752d8c935317db18f6eaf0a3cbde86.jpg",
                  icon: <FaUserPlus />,
                  stats: ["2 min setup", "100% Free", "Instant Access"],
                },
                {
                  step: 2,
                  title: "Start Practicing",
                  description: "Engage in AI-powered debate sessions",
                  image: "https://public.readdy.ai/ai/img_res/fe83a08ec787f7ec2e6584f625f7f3d5.jpg",
                  icon: <FaComments />,
                  stats: ["24/7 Available", "Real-time AI", "Multiple Formats"],
                },
                {
                  step: 3,
                  title: "Track Progress",
                  description: "Monitor your growth with advanced analytics",
                  image: "https://public.readdy.ai/ai/img_res/e584e003c43c668f284b164819d3a502.jpg",
                  icon: <FaChartLine />,
                  stats: ["Detailed Analytics", "AI Insights", "Progress Path"],
                },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                    <div className="relative mb-8">
                      <div className="relative h-48 rounded-xl overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-purple-900/20"></div>
                        <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="relative">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-[360deg]">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                              <span className="text-2xl text-white font-bold">{item.step}</span>
                            </div>
                          </div>
                          <div className="absolute -right-1 -top-1 w-6 h-6 bg-purple-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 text-center mt-8">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600">{item.icon}</span>
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                      <div className="grid grid-cols-3 gap-2 pt-4">
                        {item.stats.map((stat, idx) => (
                          <div key={idx} className="bg-purple-50 rounded-lg p-2 text-sm text-purple-700 font-medium">
                            {stat}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Debaters */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              Leaderboard
            </span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              Champions of Debate
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our top-ranked debaters and get inspired by their remarkable achievements
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mt-6"></div>
          </div>
          <div className="grid gap-6">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {leader.rank}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        <FaCrown />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                        {leader.name}
                      </h3>
                      <p className="text-gray-600 flex items-center space-x-2">
                        <FaAward className="text-purple-500" />
                        <span>{leader.title}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        {leader.score}
                      </div>
                      <div className="text-gray-600">Rating</div>
                    </div>
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-button hover:bg-purple-200 transition-colors duration-300">
                      <FaUserPlus />
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-gray-600 text-sm">Wins</div>
                    <div className="text-lg font-semibold text-gray-800">142</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600 text-sm">Tournaments</div>
                    <div className="text-lg font-semibold text-gray-800">24</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600 text-sm">Win Rate</div>
                    <div className="text-lg font-semibold text-gray-800">89%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              Pricing Plans
            </span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              Invest in Your Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your ideal plan and unlock the full potential of AI-powered debate training
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mt-6"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                name: "Free",
                price: "$0",
                period: "Forever",
                features: [
                  "Basic AI practice sessions",
                  "Community access",
                  "Limited debates per month",
                  "24/7 Support",
                ],
                icon: <FaRocket />,
              },
              {
                name: "Pro",
                price: "$19.99",
                period: "per month",
                features: [
                  "Unlimited AI practice",
                  "Advanced analytics",
                  "Priority support",
                  "Tournament access",
                  "Custom training",
                ],
                icon: <FaCrown />,
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "Tailored solution",
                features: [
                  "Enterprise solutions",
                  "Custom AI training",
                  "Dedicated support",
                  "API access",
                  "White-label options",
                ],
                icon: <FaBuilding />,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-300 ${
                  index === 1 ? "transform -translate-y-4" : ""
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div
                  className={`h-full p-8 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                    index === 1
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/20"
                      : "bg-white border border-gray-100 shadow-lg hover:shadow-xl group-hover:-translate-y-2"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      index === 1 ? "bg-white/10" : "bg-purple-50"
                    }`}
                  >
                    <span className={`text-2xl ${index === 1 ? "text-white" : "text-purple-600"}`}>{plan.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`ml-2 ${index === 1 ? "text-white/80" : "text-gray-500"}`}>{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <FaCheckCircle className={`mr-3 ${index === 1 ? "text-white/80" : "text-purple-500"}`} />
                        <span className={index === 1 ? "text-white/90" : "text-gray-600"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-4 rounded-button cursor-pointer transition-all duration-300 flex items-center justify-center space-x-2 ${
                      index === 1
                        ? "bg-white text-purple-600 hover:bg-gray-50"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
                    }`}
                    onClick={() => {
                      setShowPricing(true)
                      setSelectedPlan(plan.name)
                    }}
                  >
                    <span>Get Started</span>
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              Voices of Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from debaters who transformed their skills using our AI-powered platform
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mt-6"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "National Debate Champion",
                image: "https://public.readdy.ai/ai/img_res/8d873850ba8bd21dcf50d3f2dce5cd24.jpg",
                quote:
                  "D23.ai helped me secure the national championship. The AI feedback was instrumental in perfecting my arguments.",
                stats: { wins: "47", tournaments: "12", rating: "2890" },
              },
              {
                name: "Marcus Thompson",
                role: "University Team Captain",
                image: "https://public.readdy.ai/ai/img_res/0d355efb796520826bbe0b32afa9840c.jpg",
                quote: "Our team's win rate increased by 70% after incorporating D23.ai into our practice routine.",
                stats: { wins: "38", tournaments: "9", rating: "2780" },
              },
              {
                name: "Elena Rodriguez",
                role: "International Competitor",
                image: "https://public.readdy.ai/ai/img_res/e7bfbaecb4520e21b0ec9065ee9412a5.jpg",
                quote: "The platform's multilingual support helped me excel in international competitions.",
                stats: { wins: "42", tournaments: "15", rating: "2850" },
              },
            ].map((story, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 relative">
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{story.name}</h3>
                    <p className="text-purple-600 font-medium mb-4">{story.role}</p>
                    <div className="flex justify-center space-x-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{story.stats.wins}</div>
                        <div className="text-sm text-gray-500">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{story.stats.tournaments}</div>
                        <div className="text-sm text-gray-500">Tournaments</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{story.stats.rating}</div>
                        <div className="text-sm text-gray-500">Rating</div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
                    <button className="mt-6 px-6 py-2 bg-purple-50 text-purple-600 rounded-button hover:bg-purple-100 transition-colors duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              Contact Us
            </span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to elevate your debate skills? Our team is here to support your journey
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mt-6"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full -mr-20 -mt-20 opacity-50"></div>
              <form onSubmit={handleFormSubmit} className="space-y-6 relative">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaComments className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Send us a Message</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours</p>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-gray-700 mb-2 font-medium">Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-gray-700 mb-2 font-medium">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-gray-700 mb-2 font-medium">Message</label>
                  <div className="relative">
                    <FaPencilAlt className="absolute left-4 top-4 text-gray-400" />
                    <textarea
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      rows={4}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-button hover:from-purple-700 hover:to-pink-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                  <FaPaperPlane />
                </button>
              </form>
            </div>
            <div className="space-y-8">
              <Image
                src="https://public.readdy.ai/ai/img_res/be6b27dc8ddf1b15297463d49b3e9c1a.jpg"
                alt="Office Space"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl w-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FaPhone className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">support@d23.ai</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4 space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <FaComments className="text-purple-400 text-2xl" />
                </div>
                <span className="text-3xl font-bold">
                  D23<span className="text-purple-400">.ai</span>
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Empowering voices through AI-enhanced debate practice and learning. Join our community of critical
                thinkers and future leaders.
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-purple-500/20 transition-colors duration-300 group"
                >
                  <FaXTwitter className="text-lg text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-purple-500/20 transition-colors duration-300 group"
                >
                  <FaLinkedinIn className="text-lg text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-purple-500/20 transition-colors duration-300 group"
                >
                  <FaGithub className="text-lg text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-purple-500/20 transition-colors duration-300 group"
                >
                  <FaDiscord className="text-lg text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-purple-500/20 transition-colors duration-300 group"
                >
                  <FaYoutube className="text-lg text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-xl font-bold mb-6 text-white">Platform</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-xl font-bold mb-6 text-white">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#tutorials" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#support" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h4 className="text-xl font-bold mb-6 text-white">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and insights.</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4 text-white">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-gray-400">
                    <FaEnvelope className="text-purple-400" />
                    <span>support@d23.ai</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <FaPhone className="text-purple-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <FaMapMarkerAlt className="text-purple-400" />
                    <span>800 S Abel St, Milpitas, CA 95035</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-center md:text-left">
              © 2025 D23.ai. All rights reserved. <span className="mx-2">|</span>
              <a href="#privacy" className="hover:text-purple-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="mx-2">|</span>
              <a href="#terms" className="hover:text-purple-400 transition-colors duration-300">
                Terms of Service
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src="https://public.readdy.ai/ai/img_res/4dee2e97a0ffd589dc8a5bec952a8b4c.jpg"
                alt="Payment Methods"
                width={120}
                height={30}
                className="h-8"
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Trial Modal */}
      {showTrialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-xl w-full mx-4 relative">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowTrialModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Start Your Free Trial</h3>
              <p className="text-gray-600">Experience the power of AI-driven debate training</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-8 px-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={isAuthLoading}
                className="w-full max-w-md flex items-center justify-center space-x-2 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-button hover:bg-gray-50 transition-all duration-300"
              >
                {isAuthLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <FaGoogle className="text-[#4285F4] text-xl" />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
              <div className="text-center text-gray-500">
                By continuing, you agree to our{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Get Started with {selectedPlan}</h3>
              <button
                onClick={() => setShowPricing(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-purple-600 text-2xl" />
              </div>
              <p className="text-gray-600">Sign in with Google to start your journey with D23.ai</p>
            </div>
            <button
              className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-button hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGoogleSignIn}
              disabled={isAuthLoading}
            >
              {isAuthLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <FaGoogle className="text-[#4285F4] text-xl" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
            <div className="text-center mt-6 text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage

