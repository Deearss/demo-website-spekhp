import { writeFileSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const PLACEHOLDER_IMG = "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24.jpg"

const brandTemplates = [
  {
    brand: "Samsung",
    count: 12,
    models: ["Galaxy S24 Ultra","Galaxy S24+","Galaxy S24","Galaxy A55","Galaxy A35","Galaxy A25","Galaxy Z Fold5","Galaxy Z Flip5","Galaxy S23 Ultra","Galaxy S23","Galaxy A54","Galaxy M55"],
    chipsets: ["Snapdragon 8 Gen 3","Exynos 2400","Snapdragon 8 Gen 2","Exynos 2200","Dimensity 1080","Exynos 1480"],
    os: ["Android 14, One UI 6.1","Android 14, One UI 6","Android 13, One UI 5.1"],
    priceRange: [3500000, 24000000],
  },
  {
    brand: "Apple",
    count: 10,
    models: ["iPhone 15 Pro Max","iPhone 15 Pro","iPhone 15 Plus","iPhone 15","iPhone 14 Pro Max","iPhone 14 Pro","iPhone 14 Plus","iPhone 14","iPhone 13","iPhone SE (2022)"],
    chipsets: ["Apple A17 Pro","Apple A16 Bionic","Apple A15 Bionic","Apple A13 Bionic"],
    os: ["iOS 17","iOS 16"],
    priceRange: [6500000, 26000000],
  },
  {
    brand: "Xiaomi",
    count: 8,
    models: ["Xiaomi 14 Ultra","Xiaomi 14","Xiaomi 13T Pro","Xiaomi 13T","Redmi Note 13 Pro+","Redmi Note 13 Pro","Redmi Note 13","POCO X6 Pro"],
    chipsets: ["Snapdragon 8 Gen 3","Dimensity 9200+","Dimensity 8200 Ultra","Snapdragon 7s Gen 2","Dimensity 6080"],
    os: ["Android 14, MIUI 14","Android 13, HyperOS"],
    priceRange: [2000000, 16000000],
  },
  {
    brand: "OPPO",
    count: 6,
    models: ["OPPO Find X7 Ultra","OPPO Find X7","OPPO Reno11 Pro","OPPO Reno11","OPPO A98","OPPO A78"],
    chipsets: ["Snapdragon 8 Gen 3","Dimensity 9300","Snapdragon 8s Gen 3","Dimensity 7050","Snapdragon 695"],
    os: ["Android 14, ColorOS 14","Android 13, ColorOS 13"],
    priceRange: [2500000, 14000000],
  },
  {
    brand: "Vivo",
    count: 5,
    models: ["Vivo X100 Pro","Vivo X100","Vivo V29 Pro","Vivo V29","Vivo Y100"],
    chipsets: ["Dimensity 9300","Snapdragon 8 Gen 2","Snapdragon 778G","Dimensity 8050","Snapdragon 695"],
    os: ["Android 14, OriginOS 4","Android 13, FunTouchOS 13"],
    priceRange: [2000000, 13000000],
  },
  {
    brand: "Realme",
    count: 4,
    models: ["Realme GT5 Pro","Realme GT Neo6","Realme 12 Pro+","Realme 12 Pro"],
    chipsets: ["Snapdragon 8 Gen 3","Snapdragon 7s Gen 2","Snapdragon 6 Gen 1","Dimensity 7050"],
    os: ["Android 14, Realme UI 5","Android 13, Realme UI 4"],
    priceRange: [2000000, 9000000],
  },
  {
    brand: "OnePlus",
    count: 3,
    models: ["OnePlus 12","OnePlus 12R","OnePlus Nord CE4"],
    chipsets: ["Snapdragon 8 Gen 3","Snapdragon 8 Gen 2","Snapdragon 7 Gen 3"],
    os: ["Android 14, OxygenOS 14","Android 13, OxygenOS 13"],
    priceRange: [4000000, 14000000],
  },
  {
    brand: "Google",
    count: 2,
    models: ["Google Pixel 8 Pro","Google Pixel 8"],
    chipsets: ["Google Tensor G3"],
    os: ["Android 14"],
    priceRange: [8000000, 16000000],
  },
]

const displays = [
  { type: "Dynamic AMOLED 2X, 120Hz", size: "6.8 inches", resolution: "1440 x 3088 pixels" },
  { type: "LTPO AMOLED, 120Hz", size: "6.7 inches", resolution: "1080 x 2412 pixels" },
  { type: "Super AMOLED, 90Hz", size: "6.5 inches", resolution: "1080 x 2340 pixels" },
  { type: "OLED, 60Hz", size: "6.1 inches", resolution: "1170 x 2532 pixels" },
  { type: "IPS LCD, 120Hz", size: "6.4 inches", resolution: "1080 x 2400 pixels" },
  { type: "AMOLED, 144Hz", size: "6.6 inches", resolution: "1080 x 2400 pixels" },
]

const cameras = [
  { main: "200 MP + 12 MP + 10 MP", mp: "200MP" },
  { main: "50 MP + 12 MP + 10 MP", mp: "50MP" },
  { main: "108 MP + 12 MP + 10 MP", mp: "108MP" },
  { main: "48 MP + 12 MP + 12 MP", mp: "48MP" },
  { main: "64 MP + 8 MP + 2 MP", mp: "64MP" },
  { main: "50 MP + 50 MP + 64 MP", mp: "50MP" },
]

const batteries = [
  { type: "Li-Ion 5000 mAh, non-removable", charging: "45W wired, 15W wireless", mah: "5000mAh" },
  { type: "Li-Ion 4700 mAh, non-removable", charging: "67W wired, 50W wireless", mah: "4700mAh" },
  { type: "Li-Ion 4000 mAh, non-removable", charging: "25W wired", mah: "4000mAh" },
  { type: "Li-Ion 3877 mAh, non-removable", charging: "27W wired", mah: "3877mAh" },
  { type: "Li-Ion 5100 mAh, non-removable", charging: "120W wired, 50W wireless", mah: "5100mAh" },
]

const rams = ["6GB", "8GB", "12GB", "16GB"]
const storages = ["128GB", "256GB", "512GB"]
const colorSets = [
  "Phantom Black, Cream, Green",
  "Midnight, Starlight, Blue",
  "Black, White, Purple",
  "Onyx Black, Marble Gray, Cobalt Violet",
  "Titanium Black, Titanium Gray",
]

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function pick(arr, idx) {
  return arr[idx % arr.length]
}

function randPrice(min, max, i) {
  const step = Math.floor((max - min) / 5)
  const raw = min + (i % 6) * step
  return `Rp ${raw.toLocaleString("id-ID")}`
}

const phones = []

for (const t of brandTemplates) {
  for (let i = 0; i < t.count; i++) {
    const model = t.models[i]
    const display = pick(displays, i)
    const cam = pick(cameras, i)
    const bat = pick(batteries, i)
    const chipset = pick(t.chipsets, i)
    const ram = pick(rams, i)
    const storage = pick(storages, i)
    const os = pick(t.os, i)

    phones.push({
      slug: slugify(model),
      brand: t.brand,
      name: model,
      image: PLACEHOLDER_IMG,
      releaseYear: 2023 + (i % 2),
      displayInches: display.size.replace(" inches", '"'),
      mainCameraMP: cam.mp,
      ramChipset: `${ram} / ${chipset}`,
      batteryMah: bat.mah,
      specs: {
        network: "GSM / HSPA / LTE / 5G",
        announced: `${2023 + (i % 2)}, ${["January","March","June","September","October"][i % 5]} ${10 + i}`,
        status: `Available. Released ${2023 + (i % 2)}`,
        dimensions: `${160 + i} x ${74 + (i % 5)} x ${7 + (i % 4)} mm`,
        weight: `${170 + i * 2} g`,
        sim: i % 3 === 0 ? "Nano-SIM + eSIM" : "Dual SIM (Nano-SIM)",
        ipRating: i % 3 === 0 ? "IP68" : i % 3 === 1 ? "IP67" : "IP54",
        displayType: display.type,
        displaySize: display.size,
        resolution: display.resolution,
        os,
        chipset,
        cpu: "Octa-core",
        gpu: i % 2 === 0 ? "Adreno 750" : "Mali-G715",
        cardSlot: i % 4 === 0 ? "microSDXC (uses shared SIM slot)" : "No",
        internal: `${storage} ${ram} RAM`,
        mainCamera: cam.main,
        mainCameraFeatures: "OIS, LED flash, HDR, panorama",
        mainCameraVideo: "4K@60fps, 1080p@240fps",
        frontCamera: `${12 + (i % 3) * 4} MP, f/2.2`,
        frontCameraVideo: "4K@30fps",
        loudspeaker: "Yes, with stereo speakers",
        jack35mm: i % 4 === 0 ? "Yes" : "No",
        wlan: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
        bluetooth: `${5 + (i % 2)}.${i % 3}, A2DP, LE`,
        nfc: i % 5 === 4 ? "No" : "Yes",
        usb: i % 2 === 0 ? "USB Type-C 3.2" : "USB Type-C 2.0",
        batteryType: bat.type,
        charging: bat.charging,
        colors: pick(colorSets, i),
        priceIDR: randPrice(t.priceRange[0], t.priceRange[1], i),
      },
    })
  }
}

mkdirSync(join(__dirname, "../data"), { recursive: true })
writeFileSync(
  join(__dirname, "../data/phones.json"),
  JSON.stringify(phones, null, 2),
  "utf8"
)
console.log(`✅ Generated ${phones.length} phones to data/phones.json`)
