import { supabase } from './supabase'
import type { Phone, Brand } from '@/types/phone'
import { mapRowToPhone } from './mappers'

export async function getPhones(filter?: {
  brand?: string
  search?: string
}): Promise<Phone[]> {
  let query = supabase.from('phones').select('*')

  if (filter?.brand && filter.brand !== 'All') {
    query = query.eq('brand', filter.brand)
  }

  if (filter?.search) {
    query = query.ilike('name', `%${filter.search}%`)
  }

  const { data, error } = await query.order('release_year', { ascending: false })
  if (error) {
    console.error('Error fetching phones:', error)
    return []
  }
  
  return data.map(mapRowToPhone)
}

export async function getPhoneBySlug(slug: string): Promise<Phone | null> {
  const { data, error } = await supabase
    .from('phones')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return mapRowToPhone(data)
}

export async function getBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('phones')
    .select('brand')

  if (error || !data) return []
  
  const brands = Array.from(new Set(data.map((row: { brand: string }) => row.brand))) as Brand[]
  return brands.sort()
}

export async function getRelatedPhones(slug: string, brand: string): Promise<Phone[]> {
  const { data, error } = await supabase
    .from('phones')
    .select('*')
    .eq('brand', brand)
    .neq('slug', slug)
    .limit(4)

  if (error || !data) return []
  return data.map(mapRowToPhone)
}
