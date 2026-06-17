/**
 * api.js - Centralized fetch helper untuk backend BAWOR
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://leoananta-bawor-bps.hf.space'

/**
 * Parse response secara aman.
 * Mengembalikan null jika Content-Type bukan JSON.
 */
async function safeParseJson(response) {
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return null
  }
  try {
    return await response.json()
  } catch {
    return null
  }
}

/**
 * Helper fetch utama dengan penanganan response secara aman.
 */
export async function apiFetch(url, options = {}) {
  const response = await fetch(url, options)
  const data = await safeParseJson(response)
  return { response, data }
}

/**
 * Dapatkan pesan error yang informatif dari response.
 */
export function getErrorMessage(status, data, fallback = 'Terjadi kesalahan saat menghubungi server.') {
  if (data?.detail) return String(data.detail)
  if (data?.message) return String(data.message)
  if (status === 401) return 'Sesi telah berakhir. Silakan masuk kembali.'
  if (status === 404) return 'Endpoint tidak ditemukan (404).'
  if (status === 405) return 'Method Not Allowed (405).'
  if (status === 429) return 'Terlalu banyak permintaan. Silakan tunggu sebentar.'
  if (status >= 500) return `Server error (${status}). Silakan coba beberapa saat lagi.`
  return fallback
}
