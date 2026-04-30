import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: { default: "WebSpec Demo — Database Spesifikasi HP", template: "%s | WebSpec Demo" },
  description: "Temukan dan bandingkan spesifikasi lengkap smartphone terbaru. Database HP terlengkap di Indonesia.",
  keywords: ["spesifikasi hp", "database ponsel", "review smartphone", "harga hp"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "WebSpec Demo",
    title: "WebSpec Demo — Database Spesifikasi HP",
    description: "Temukan dan bandingkan spesifikasi lengkap smartphone terbaru.",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="min-h-dvh flex flex-col antialiased">{children}</body>
    </html>
  )
}
