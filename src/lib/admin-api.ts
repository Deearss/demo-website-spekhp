import { supabase } from './supabase'
import type { Phone } from '@/types/phone'
import { mapRowToPhone, mapPhoneToRow } from './mappers'

// Login admin
export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// Logout admin
export async function adminLogout() {
  await supabase.auth.signOut()
}

// Ambil semua HP untuk admin panel
export async function adminGetPhones(): Promise<Phone[]> {
  const { data, error } = await supabase
    .from('phones')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapRowToPhone)
}

// Tambah HP baru
export async function adminCreatePhone(phone: Partial<Phone>): Promise<Phone> {
  const row = mapPhoneToRow(phone)
  const { data, error } = await supabase
    .from('phones')
    .insert(row)
    .select()
    .single()
  if (error) throw error
  return mapRowToPhone(data)
}

// Update HP
export async function adminUpdatePhone(slug: string, updates: Partial<Phone>): Promise<Phone> {
  const row = mapPhoneToRow(updates)
  const { data, error } = await supabase
    .from('phones')
    .update({ ...row, updated_at: new Date().toISOString() })
    .eq('slug', slug)
    .select()
    .single()
  if (error) throw error
  return mapRowToPhone(data)
}

// Hapus HP
export async function adminDeletePhone(slug: string): Promise<void> {
  const { error } = await supabase
    .from('phones')
    .delete()
    .eq('slug', slug)
  if (error) throw error
}

// Cek apakah slug sudah dipakai HP lain (exclude slug saat ini untuk mode edit)
export async function adminCheckSlug(slug: string, excludeSlug?: string): Promise<boolean> {
  let query = supabase.from('phones').select('slug', { count: 'exact', head: true }).eq('slug', slug)
  if (excludeSlug) query = query.neq('slug', excludeSlug)
  const { count } = await query
  return (count ?? 0) > 0
}

// Ambil stats untuk dashboard
export async function adminGetStats() {
  const { count: totalPhones } = await supabase
    .from('phones')
    .select('*', { count: 'exact', head: true })

  const { data: brands } = await supabase
    .from('phones')
    .select('brand')

  const totalBrands = new Set(brands?.map((b: { brand: string }) => b.brand)).size

  const { data: latestPhones } = await supabase
    .from('phones')
    .select('slug, name, brand, image')
    .order('created_at', { ascending: false })
    .limit(5)

  // HP yang ditambahkan bulan ini
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  const { count: thisMonth } = await supabase
    .from('phones')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfMonth.toISOString())

  return {
    totalPhones: totalPhones ?? 0,
    totalBrands,
    thisMonth: thisMonth ?? 0,
    latestPhones: latestPhones ?? []
  }
}
