import type { PhoneSpecs } from "@/types/phone"

type Props = { specs: PhoneSpecs }

const sections: { title: string; rows: { label: string; key: keyof PhoneSpecs }[] }[] = [
  {
    title: "Network",
    rows: [{ label: "Technology", key: "network" }],
  },
  {
    title: "Launch",
    rows: [
      { label: "Announced", key: "announced" },
      { label: "Status", key: "status" },
    ],
  },
  {
    title: "Body",
    rows: [
      { label: "Dimensions", key: "dimensions" },
      { label: "Weight", key: "weight" },
      { label: "SIM", key: "sim" },
      { label: "IP Rating", key: "ipRating" },
    ],
  },
  {
    title: "Display",
    rows: [
      { label: "Type", key: "displayType" },
      { label: "Size", key: "displaySize" },
      { label: "Resolution", key: "resolution" },
    ],
  },
  {
    title: "Platform",
    rows: [
      { label: "OS", key: "os" },
      { label: "Chipset", key: "chipset" },
      { label: "CPU", key: "cpu" },
      { label: "GPU", key: "gpu" },
    ],
  },
  {
    title: "Memory",
    rows: [
      { label: "Card Slot", key: "cardSlot" },
      { label: "Internal", key: "internal" },
    ],
  },
  {
    title: "Main Camera",
    rows: [
      { label: "Camera", key: "mainCamera" },
      { label: "Features", key: "mainCameraFeatures" },
      { label: "Video", key: "mainCameraVideo" },
    ],
  },
  {
    title: "Selfie Camera",
    rows: [
      { label: "Camera", key: "frontCamera" },
      { label: "Video", key: "frontCameraVideo" },
    ],
  },
  {
    title: "Sound",
    rows: [
      { label: "Loudspeaker", key: "loudspeaker" },
      { label: "3.5mm Jack", key: "jack35mm" },
    ],
  },
  {
    title: "Comms",
    rows: [
      { label: "WLAN", key: "wlan" },
      { label: "Bluetooth", key: "bluetooth" },
      { label: "NFC", key: "nfc" },
      { label: "USB", key: "usb" },
    ],
  },
  {
    title: "Battery",
    rows: [
      { label: "Type", key: "batteryType" },
      { label: "Charging", key: "charging" },
    ],
  },
  {
    title: "Misc",
    rows: [
      { label: "Colors", key: "colors" },
      { label: "Price (IDR)", key: "priceIDR" },
    ],
  },
]

export default function SpecTable({ specs }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => (
        <div
          key={section.title}
          className="overflow-hidden rounded-xl"
          style={{ border: "1px solid var(--border-2)" }}
        >
          {/* Section header */}
          <div
            className="px-4 py-2.5"
            style={{ background: "var(--bg-3)", borderBottom: "1px solid var(--border)" }}
          >
            <span className="text-xs font-bold uppercase tracking-widest gold-text">
              {section.title}
            </span>
          </div>

          {/* Rows */}
          <div style={{ background: "var(--surface)" }}>
            {section.rows.map((row, i) => (
              <div
                key={row.key}
                className="flex px-4 py-3 text-sm gap-4"
                style={{
                  borderTop: i > 0 ? "1px solid var(--border-2)" : undefined,
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  className="w-36 shrink-0 font-medium text-xs pt-0.5"
                  style={{ color: "var(--text-3)" }}
                >
                  {row.label}
                </span>
                <span style={{ color: "var(--text)" }}>
                  {specs[row.key] || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
