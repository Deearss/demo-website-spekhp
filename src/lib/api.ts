import phonesData from "../../data/phones.json"
import type { Phone, Brand } from "@/types/phone"

const phones: Phone[] = phonesData as Phone[]

export function getPhones(filter?: { brand?: string; search?: string }): Phone[] {
  let result = [...phones]

  if (filter?.brand && filter.brand !== "All") {
    result = result.filter((p) => p.brand === filter.brand)
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.chipset.toLowerCase().includes(q)
    )
  }

  return result
}

export function getPhoneBySlug(slug: string): Phone | null {
  return phones.find((p) => p.slug === slug) ?? null
}

export function getBrands(): Brand[] {
  const brands = Array.from(new Set(phones.map((p) => p.brand)))
  return brands
}

export function getRelatedPhones(slug: string, brand: string): Phone[] {
  return phones.filter((p) => p.brand === brand && p.slug !== slug).slice(0, 4)
}
