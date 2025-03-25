"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  FaComments,
  FaArrowLeft,
  FaHeadset,
  FaUserCircle,
  FaSchool,
  FaStar,
  FaCompass,
  FaUsers,
  FaTrophy,
  FaArrowRight,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa"

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

const RegistrationSuccess: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Chart options for ECharts
  const chartOption = {
    animation: false,
    color: ["#7C3AED"],
    tooltip: {
      trigger: "axis",
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
    },
    series: [
      {
        data: [15, 25, 30, 45, 35, 40, 50],
        type: "line",
        smooth: true,
        areaStyle: {
          opacity: 0.1,
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl text-purple-600 animate-bounce">✓</div>
          </div>
        </div>
      )}

      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center">
                <FaComments className="text-purple-600" />
              </div>
              <span className="text-2xl font-bold">
                D23<span className="text-purple-600">.ai</span>
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/onboarding" className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer">
                <FaArrowLeft className="inline mr-2" />
                Back to Setup
              </Link>
              <button className="bg-purple-600/10 text-purple-600 px-6 py-2 rounded-button hover:bg-purple-600/20 transition-all cursor-pointer whitespace-nowrap">
                <FaHeadset className="inline mr-2" />
                Get Help
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to D23.ai!</h1>
          <p className="text-xl text-gray-600">Your journey to becoming a master debater starts now</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20">
            <div className="w-16 h-16 bg-purple-600/10 rounded-xl flex items-center justify-center mb-6">
              <FaUserCircle className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Sarah Anderson</h3>
            <div className="space-y-3">
              <p className="text-gray-600">
                <FaSchool className="inline mr-2" />
                Harvard University
              </p>
              <p className="text-gray-600">
                <FaStar className="inline mr-2" />
                Advanced Debater
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Policy Debate</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Parliamentary</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">World Schools</span>
            </div>
          </div>

          <div className="col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Weekly Activity</h3>
            <div className="w-full h-64">
              <ReactECharts option={chartOption} style={{ height: "100%", width: "100%" }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Explore Debate Topics",
              icon: <FaCompass />,
              description: "Discover trending topics and prepare winning arguments",
              color: "from-blue-600 to-indigo-600",
            },
            {
              title: "Find Practice Partners",
              icon: <FaUsers />,
              description: "Connect with fellow debaters for practice sessions",
              color: "from-purple-600 to-pink-600",
            },
            {
              title: "Join Tournaments",
              icon: <FaTrophy />,
              description: "Compete in upcoming tournaments and showcase your skills",
              color: "from-orange-600 to-red-600",
            },
          ].map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-purple-100/20 h-full transition-all duration-300 hover:transform hover:-translate-y-2">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r ${item.color}`}
                >
                  <div className="text-white text-2xl">{item.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-6">
                  <span className="text-purple-600 font-medium group-hover:underline">
                    Get Started
                    <FaArrowRight className="inline ml-2" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <button className="px-12 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xl font-semibold rounded-button hover:opacity-90 transition-all duration-300 shadow-xl shadow-purple-200/50 cursor-pointer whitespace-nowrap">
              Go to Dashboard
              <FaArrowRight className="inline ml-3" />
            </button>
          </Link>
        </div>
      </div>

      <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-100 mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Practice Sessions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Tournaments
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RegistrationSuccess

