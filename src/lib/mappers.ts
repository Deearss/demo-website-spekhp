import type { Phone } from "@/types/phone"

export function mapRowToPhone(row: Record<string, string | number | null | undefined>): Phone {
  return {
    slug: row.slug || "",
    brand: row.brand || "",
    name: row.name || "",
    image: row.image || "",
    releaseYear: row.release_year || 0,
    displayInches: row.display_inches || "",
    mainCameraMP: row.main_camera_mp || "",
    ramChipset: row.ram_chipset || "",
    batteryMah: row.battery_mah || "",
    specs: {
      network: row.network || "",
      announced: row.announced || "",
      status: row.status || "",
      dimensions: row.dimensions || "",
      weight: row.weight || "",
      sim: row.sim || "",
      ipRating: row.ip_rating || "",
      displayType: row.display_type || "",
      displaySize: row.display_size || "",
      resolution: row.resolution || "",
      os: row.os || "",
      chipset: row.chipset || "",
      cpu: row.cpu || "",
      gpu: row.gpu || "",
      cardSlot: row.card_slot || "",
      internal: row.internal || "",
      mainCamera: row.main_camera || "",
      mainCameraFeatures: row.main_camera_features || "",
      mainCameraVideo: row.main_camera_video || "",
      frontCamera: row.front_camera || "",
      frontCameraVideo: row.front_camera_video || "",
      loudspeaker: row.loudspeaker || "",
      jack35mm: row.jack_35mm || "",
      wlan: row.wlan || "",
      bluetooth: row.bluetooth || "",
      nfc: row.nfc || "",
      usb: row.usb || "",
      batteryType: row.battery_type || "",
      charging: row.charging || "",
      colors: row.colors || "",
      priceIDR: row.price_idr || "",
    }
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
