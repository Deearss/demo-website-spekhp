import { ReactNode } from "react";

export default function StatsCard({ label, value, icon }: { label: string, value: number | string, icon?: ReactNode }) {
  return (
    <div className="bg-surface border border-border-2 rounded-xl p-6 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-text-3 text-sm font-medium uppercase tracking-wider">
        {icon}
        {label}
      </div>
      <div className="text-4xl font-bold text-text">
        {value}
      </div>
    </div>
  )
}
