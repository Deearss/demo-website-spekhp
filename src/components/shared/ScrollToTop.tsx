"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Munculin tombol kalo udah scroll ke bawah 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 sm:bottom-8 sm:right-8 z-50 p-3.5 rounded-full transall hover:scale-110 active:scale-95"
      style={{
        background: "var(--gold)",
        color: "#0D1B2A",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
      aria-label="Kembali ke atas"
    >
      <ArrowUp size={24} strokeWidth={2.5} />
    </button>
  )
}
