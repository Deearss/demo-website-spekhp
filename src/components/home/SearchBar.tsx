"use client"

import { Search, X } from "lucide-react"

type Props = {
  value: string
  onChange: (v: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "var(--gold)" }}
      />
      <input
        type="text"
        placeholder="Cari nama HP, brand, atau chipset..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-13 pl-11 pr-10 rounded-xl text-sm font-medium outline-none transall"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--gold)"
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.12)"
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border)"
          e.currentTarget.style.boxShadow = "none"
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 transall hover:opacity-70"
          style={{ color: "var(--text-3)" }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
