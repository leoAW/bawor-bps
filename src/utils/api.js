/**
 * api.js - Centralized fetch helper untuk backend BAWOR
 *
 * Mengatasi masalah:
 * 1. HF Space cold start → mengembalikan HTML bukan JSON
 * 2. response.json() crash sebelum cek response.ok
 * 3. Tidak ada error message yang informatif saat server sleeping
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/backend-api'

/**
 * Parse response secara aman.
 * Mengembalikan null jika Content-Type bukan JSON (misal HTML error dari HF Space).
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
 * Deteksi apakah server sedang "tidur" (HF Space cold start).
 */
function isServerSleeping(status, data) {
  // HF Space mengembalikan HTML saat waking up (data === null)
  // atau status 502/503/504 saat cold start
  return data === null || status === 502 || status === 503 || status === 504
}

/**
 * Helper fetch utama dengan penanganan response HTML yang aman.
 * @param {string} url
 * @param {RequestInit} options
 * @returns {{ response: Response, data: object|null }}
 */
export async function apiFetch(url, options = {}) {
  const response = await fetch(url, options)
  const data = await safeParseJson(response)
  return { response, data }
}

/**
 * Wake up HF Space dengan ping ke endpoint health.
 * Dipanggil saat halaman login pertama kali dimuat.
 * Tidak throw error — gagal diam-diam.
 */
export async function pingBackend() {
  try {
    await fetch(`${API_BASE_URL}/api/health`, { method: 'GET', signal: AbortSignal.timeout(15000) })
  } catch {
    // Diam-diam gagal, tidak apa-apa
  }
}

/**
 * Dapatkan pesan error yang informatif dari response.
 */
export function getErrorMessage(status, data, fallback = 'Terjadi kesalahan saat menghubungi server.') {
  if (isServerSleeping(status, data)) {
    return 'Server sedang dalam proses pemanasan (cold start). Silakan tunggu beberapa saat dan coba lagi.'
  }
  if (data?.detail) return String(data.detail)
  if (data?.message) return String(data.message)
  if (status === 401) return 'Sesi telah berakhir. Silakan masuk kembali.'
  if (status === 429) return 'Terlalu banyak permintaan. Silakan tunggu sebentar.'
  if (status >= 500) return `Server error (${status}). Silakan coba beberapa saat lagi.`
  return fallback
}
