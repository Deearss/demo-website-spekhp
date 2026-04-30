"use client"

type Props = {
  brands: string[]
  active: string
  onSelect: (brand: string) => void
}

export default function BrandFilter({ brands, active, onSelect }: Props) {
  const all = ["All", ...brands]

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {all.map((brand) => {
        const isActive = active === brand
        return (
          <button
            key={brand}
            onClick={() => onSelect(brand)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transall"
            style={{
              background: isActive ? "var(--gold)" : "var(--surface)",
              color: isActive ? "#0D1B2A" : "var(--text-2)",
              border: `1px solid ${isActive ? "var(--gold)" : "var(--border)"}`,
              fontWeight: isActive ? "600" : "400",
            }}
          >
            {brand}
          </button>
        )
      })}
    </div>
  )
}
