import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase env vars in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Load old JSON
const phonesPath = path.resolve(__dirname, '../data/phones.json')
const phonesData = JSON.parse(fs.readFileSync(phonesPath, 'utf8'))

async function seed() {
  const email = process.argv[2]
  const password = process.argv[3]

  if (!email || !password) {
    console.error("Usage: npx tsx scripts/seed.ts <admin_email> <admin_password>")
    process.exit(1)
  }

  const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
  if (authError) {
    console.error("Login failed:", authError.message)
    process.exit(1)
  }

  console.log(`Logged in successfully. Found ${phonesData.length} phones to seed...`)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = phonesData.map((phone: any) => ({
    slug: phone.slug,
    brand: phone.brand,
    name: phone.name,
    image: phone.image,
    release_year: phone.releaseYear,
    display_inches: phone.displayInches,
    main_camera_mp: phone.mainCameraMP,
    ram_chipset: phone.ramChipset,
    battery_mah: phone.batteryMah,
    network: phone.specs?.network || "",
    announced: phone.specs?.announced || "",
    status: phone.specs?.status || "",
    dimensions: phone.specs?.dimensions || "",
    weight: phone.specs?.weight || "",
    sim: phone.specs?.sim || "",
    ip_rating: phone.specs?.ipRating || "",
    display_type: phone.specs?.displayType || "",
    display_size: phone.specs?.displaySize || "",
    resolution: phone.specs?.resolution || "",
    os: phone.specs?.os || "",
    chipset: phone.specs?.chipset || "",
    cpu: phone.specs?.cpu || "",
    gpu: phone.specs?.gpu || "",
    card_slot: phone.specs?.cardSlot || "",
    internal: phone.specs?.internal || "",
    main_camera: phone.specs?.mainCamera || "",
    main_camera_features: phone.specs?.mainCameraFeatures || "",
    main_camera_video: phone.specs?.mainCameraVideo || "",
    front_camera: phone.specs?.frontCamera || "",
    front_camera_video: phone.specs?.frontCameraVideo || "",
    loudspeaker: phone.specs?.loudspeaker || "",
    jack_35mm: phone.specs?.jack35mm || "",
    wlan: phone.specs?.wlan || "",
    bluetooth: phone.specs?.bluetooth || "",
    nfc: phone.specs?.nfc || "",
    usb: phone.specs?.usb || "",
    battery_type: phone.specs?.batteryType || "",
    charging: phone.specs?.charging || "",
    colors: phone.specs?.colors || "",
    price_idr: phone.specs?.priceIDR || "",
  }))

  const { error } = await supabase.from('phones').upsert(rows, { onConflict: 'slug' })
  
  if (error) {
    console.error("Error seeding data:", error)
  } else {
    console.log("Successfully seeded 50 data HP!")
  }
}

seed()
