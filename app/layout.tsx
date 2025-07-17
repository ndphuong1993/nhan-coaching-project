import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LocaleProvider } from "@/lib/i18n/locale-context" // Import LocaleProvider
import localFont from "next/font/local"

const inter = Inter({ subsets: ["latin"] })

const halimun = localFont({
  src: "../public/fonts/Halimun-W7jn.ttf",
  display: "swap",
  variable: "--font-halimun",
})

export const metadata: Metadata = {
  title: "The Soul Nest Coaching – Rediscover Your Path | Online/Offline Sessions",
  description:
    "The Soul Nest offers personalized coaching services to help you rediscover your path and reconnect with your best self through 1:1 sessions, group coaching, and workshops.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${halimun.variable}`}>
      <body>
        <LocaleProvider>{children}</LocaleProvider> {/* Bọc children bằng LocaleProvider */}
      </body>
    </html>
  )
}
