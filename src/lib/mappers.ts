import type { Phone } from "@/types/phone"

export function mapRowToPhone(row: Record<string, string | number | null | undefined>): Phone {
  return {
    slug: String(row.slug ?? ""),
    brand: String(row.brand ?? ""),
    name: String(row.name ?? ""),
    image: String(row.image ?? ""),
    releaseYear: Number(row.release_year ?? 0),
    displayInches: String(row.display_inches ?? ""),
    mainCameraMP: String(row.main_camera_mp ?? ""),
    ramChipset: String(row.ram_chipset ?? ""),
    batteryMah: String(row.battery_mah ?? ""),
    specs: {
      network: String(row.network ?? ""),
      announced: String(row.announced ?? ""),
      status: String(row.status ?? ""),
      dimensions: String(row.dimensions ?? ""),
      weight: String(row.weight ?? ""),
      sim: String(row.sim ?? ""),
      ipRating: String(row.ip_rating ?? ""),
      displayType: String(row.display_type ?? ""),
      displaySize: String(row.display_size ?? ""),
      resolution: String(row.resolution ?? ""),
      os: String(row.os ?? ""),
      chipset: String(row.chipset ?? ""),
      cpu: String(row.cpu ?? ""),
      gpu: String(row.gpu ?? ""),
      cardSlot: String(row.card_slot ?? ""),
      internal: String(row.internal ?? ""),
      mainCamera: String(row.main_camera ?? ""),
      mainCameraFeatures: String(row.main_camera_features ?? ""),
      mainCameraVideo: String(row.main_camera_video ?? ""),
      frontCamera: String(row.front_camera ?? ""),
      frontCameraVideo: String(row.front_camera_video ?? ""),
      loudspeaker: String(row.loudspeaker ?? ""),
      jack35mm: String(row.jack_35mm ?? ""),
      wlan: String(row.wlan ?? ""),
      bluetooth: String(row.bluetooth ?? ""),
      nfc: String(row.nfc ?? ""),
      usb: String(row.usb ?? ""),
      batteryType: String(row.battery_type ?? ""),
      charging: String(row.charging ?? ""),
      colors: String(row.colors ?? ""),
      priceIDR: String(row.price_idr ?? ""),
    },
    createdAt: row.created_at ? String(row.created_at) : undefined,
  }
}

export function mapPhoneToRow(phone: Partial<Phone>): Record<string, string | number | null | undefined> {
  const row: Record<string, string | number | null | undefined> = {}
  
  if (phone.slug !== undefined) row.slug = phone.slug
  if (phone.brand !== undefined) row.brand = phone.brand
  if (phone.name !== undefined) row.name = phone.name
  if (phone.image !== undefined) row.image = phone.image
  if (phone.releaseYear !== undefined) row.release_year = phone.releaseYear
  
  if (phone.displayInches !== undefined) row.display_inches = phone.displayInches
  if (phone.mainCameraMP !== undefined) row.main_camera_mp = phone.mainCameraMP
  if (phone.ramChipset !== undefined) row.ram_chipset = phone.ramChipset
  if (phone.batteryMah !== undefined) row.battery_mah = phone.batteryMah

  if (phone.specs) {
    if (phone.specs.network !== undefined) row.network = phone.specs.network
    if (phone.specs.announced !== undefined) row.announced = phone.specs.announced
    if (phone.specs.status !== undefined) row.status = phone.specs.status
    if (phone.specs.dimensions !== undefined) row.dimensions = phone.specs.dimensions
    if (phone.specs.weight !== undefined) row.weight = phone.specs.weight
    if (phone.specs.sim !== undefined) row.sim = phone.specs.sim
    if (phone.specs.ipRating !== undefined) row.ip_rating = phone.specs.ipRating
    if (phone.specs.displayType !== undefined) row.display_type = phone.specs.displayType
    if (phone.specs.displaySize !== undefined) row.display_size = phone.specs.displaySize
    if (phone.specs.resolution !== undefined) row.resolution = phone.specs.resolution
    if (phone.specs.os !== undefined) row.os = phone.specs.os
    if (phone.specs.chipset !== undefined) row.chipset = phone.specs.chipset
    if (phone.specs.cpu !== undefined) row.cpu = phone.specs.cpu
    if (phone.specs.gpu !== undefined) row.gpu = phone.specs.gpu
    if (phone.specs.cardSlot !== undefined) row.card_slot = phone.specs.cardSlot
    if (phone.specs.internal !== undefined) row.internal = phone.specs.internal
    if (phone.specs.mainCamera !== undefined) row.main_camera = phone.specs.mainCamera
    if (phone.specs.mainCameraFeatures !== undefined) row.main_camera_features = phone.specs.mainCameraFeatures
    if (phone.specs.mainCameraVideo !== undefined) row.main_camera_video = phone.specs.mainCameraVideo
    if (phone.specs.frontCamera !== undefined) row.front_camera = phone.specs.frontCamera
    if (phone.specs.frontCameraVideo !== undefined) row.front_camera_video = phone.specs.frontCameraVideo
    if (phone.specs.loudspeaker !== undefined) row.loudspeaker = phone.specs.loudspeaker
    if (phone.specs.jack35mm !== undefined) row.jack_35mm = phone.specs.jack35mm
    if (phone.specs.wlan !== undefined) row.wlan = phone.specs.wlan
    if (phone.specs.bluetooth !== undefined) row.bluetooth = phone.specs.bluetooth
    if (phone.specs.nfc !== undefined) row.nfc = phone.specs.nfc
    if (phone.specs.usb !== undefined) row.usb = phone.specs.usb
    if (phone.specs.batteryType !== undefined) row.battery_type = phone.specs.batteryType
    if (phone.specs.charging !== undefined) row.charging = phone.specs.charging
    if (phone.specs.colors !== undefined) row.colors = phone.specs.colors
    if (phone.specs.priceIDR !== undefined) row.price_idr = phone.specs.priceIDR
  }
  
  return row
}
