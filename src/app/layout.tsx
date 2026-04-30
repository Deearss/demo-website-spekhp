import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ScrollToTop from "@/components/shared/ScrollToTop"
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: "WebSpec Demo — Database Spesifikasi HP", template: "%s | WebSpec Demo" },
  description: "Temukan dan bandingkan spesifikasi lengkap smartphone terbaru dari berbagai brand. Tampilan minimalis dan modern ala Tech Reviewer.",
  keywords: ["spesifikasi hp", "database ponsel", "review smartphone", "harga hp", "webspec demo", "gadget", "tech"],
  authors: [{ name: "WebSpec Demo Team" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "WebSpec Demo",
    title: "WebSpec Demo — Database Spesifikasi HP",
    description: "Temukan dan bandingkan spesifikasi lengkap smartphone terbaru.",
    images: [
      {
        url: "/images/brands/banner.png",
        width: 1200,
        height: 630,
        alt: "WebSpec Demo Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebSpec Demo — Database Spesifikasi HP",
    description: "Temukan dan bandingkan spesifikasi lengkap smartphone terbaru dengan antarmuka elegan.",
    images: ["/images/brands/banner.png"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="min-h-dvh flex flex-col antialiased">
        {children}
        <ScrollToTop />
      </body>
    </html>
  )
}
