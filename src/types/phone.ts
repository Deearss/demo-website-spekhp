export type Brand = string

export type PhoneSpecs = {
  // NETWORK
  network: string               // e.g. "GSM / HSPA / LTE / 5G"

  // LAUNCH
  announced: string             // e.g. "2024, January 17"
  status: string                // e.g. "Available. Released 2024, January 31"

  // BODY
  dimensions: string            // e.g. "147 x 70.6 x 7.6 mm"
  weight: string                // e.g. "167 g"
  sim: string                   // e.g. "Nano-SIM + eSIM"
  ipRating: string              // e.g. "IP68"

  // DISPLAY
  displayType: string           // e.g. "Dynamic AMOLED 2X, 120Hz"
  displaySize: string           // e.g. "6.2 inches"
  resolution: string            // e.g. "1080 x 2340 pixels"

  // PLATFORM
  os: string                    // e.g. "Android 14"
  chipset: string               // e.g. "Exynos 2400"
  cpu: string                   // e.g. "Octa-core"
  gpu: string                   // e.g. "Xclipse 940"

  // MEMORY
  cardSlot: string              // e.g. "No" or "microSDXC"
  internal: string              // e.g. "128GB 8GB RAM / 256GB 8GB RAM"

  // MAIN CAMERA
  mainCamera: string            // e.g. "50 MP + 10 MP + 12 MP"
  mainCameraFeatures: string    // e.g. "OIS, LED flash, HDR, panorama"
  mainCameraVideo: string       // e.g. "8K@30fps, 4K@60fps"

  // SELFIE CAMERA
  frontCamera: string           // e.g. "12 MP, f/2.2"
  frontCameraVideo: string      // e.g. "4K@60fps"

  // SOUND
  loudspeaker: string           // e.g. "Yes, with stereo speakers"
  jack35mm: string              // e.g. "No"

  // COMMS
  wlan: string                  // e.g. "Wi-Fi 802.11 a/b/g/n/ac/6e"
  bluetooth: string             // e.g. "5.3, A2DP, LE"
  nfc: string                   // e.g. "Yes"
  usb: string                   // e.g. "USB Type-C 3.2"

  // BATTERY
  batteryType: string           // e.g. "Li-Ion 4000 mAh, non-removable"
  charging: string              // e.g. "25W wired, 15W wireless"

  // MISC
  colors: string                // e.g. "Onyx Black, Marble Gray, Cobalt Violet"
  priceIDR: string              // e.g. "Rp 12.000.000" (bisa kosong)
}

export type Phone = {
  slug: string                  // URL-friendly ID, e.g. "samsung-galaxy-s24"
  brand: string                 // e.g. "Samsung"
  name: string                  // e.g. "Samsung Galaxy S24"
  image: string                 // URL gambar HP
  releaseYear: number           // e.g. 2024

  // 4 stat hero — shortcut untuk card & hero section
  displayInches: string         // e.g. '6.2"'
  mainCameraMP: string          // e.g. "50MP"
  ramChipset: string            // e.g. "8GB / Exynos 2400"
  batteryMah: string            // e.g. "4000mAh"

  specs: PhoneSpecs

  // Metadata
  createdAt?: string            // ISO timestamp dari Supabase
}
