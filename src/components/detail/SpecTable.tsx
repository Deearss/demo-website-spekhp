import type { PhoneSpecs } from "@/types/phone";

type Props = { specs: PhoneSpecs };

const sections: {
  title: string;
  rows: { label: string; key: keyof PhoneSpecs }[];
}[] = [
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
];

export default function SpecTable({ specs }: Props) {
  return (
    <div className="flex flex-col border-t border-white/5 mt-4">
      {sections.map((section) => (
        <div
          key={section.title}
          className="flex flex-col lg:flex-row py-6 border-b border-white/5"
        >
          {/* Section header */}
          <div className="w-full lg:w-48 shrink-0 mb-4 p-0 lg:mb-0">
            <span className="text-xs font-bold uppercase tracking-widest text-gold leading-none relative -top-1.5">
              {section.title}
            </span>
          </div>

          {/* Rows */}
          <div className="flex-1 flex flex-col gap-4">
            {section.rows.map((row) => (
              <div key={row.key} className="flex flex-col sm:flex-row sm:gap-6">
                <span className="w-full sm:w-40 shrink-0 text-sm font-medium text-text-3 leading-none">
                  {row.label}
                </span>
                <span className="text-sm text-text mt-0.5 sm:mt-0 leading-none">
                  {specs[row.key] || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
