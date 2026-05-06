import { createSupabaseServerClient } from './supabase-server'

// Server-only — dipakai dari Server Components untuk cek session via cookie
export async function getSession() {
  const serverClient = await createSupabaseServerClient()
  const { data } = await serverClient.auth.getSession()
  return data.session
}
