type Slot = "leaderboard" | "mpu-top" | "mpu-sticky" | "fluid"

type Props = { slot: Slot }

const sizes: Record<Slot, string> = {
  "leaderboard": "w-full h-[90px]",
  "mpu-top":     "w-full h-[250px]",
  "mpu-sticky":  "w-full h-[600px]",
  "fluid":       "w-full h-[120px]",
}

export default function AdBanner({ slot }: Props) {
  return (
    <div
      className={`${sizes[slot]} flex items-center justify-center rounded-lg`}
      style={{
        background: "var(--bg-2)",
        border: "1px dashed var(--border-2)",
      }}
    >
      <span
        className="text-[10px] font-medium uppercase tracking-[0.2em]"
        style={{ color: "var(--text-3)" }}
      >
        Advertisement
      </span>
    </div>
  )
}
