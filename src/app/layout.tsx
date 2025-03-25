import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "D23.ai - AI-Powered Debate Platform",
  description: "Master the art of debate with our AI-powered platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
     
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'