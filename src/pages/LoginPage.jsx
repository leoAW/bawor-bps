import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginView from '../views/LoginView'
import '../styles/login.css'
import { setDocumentScroll } from '../utils/pageScroll'

const DB_KEY = 'bawor_users'
const SESSION_KEY = 'bawor_user'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Simple hash removed as backend handles password hashing

function themeIcon(isLight) {
  return isLight
    ? '<svg style="width:17px;height:17px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>'
    : '<svg style="width:17px;height:17px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
}

function passwordIcon(isVisible) {
  return isVisible
    ? '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>'
    : '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>'
}

function alertIcon(type) {
  return type === 'error'
    ? '<svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    : '<svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
}

export default function LoginPage() {
  const navigate = useNavigate()
  const root = useRef(null)
  const timers = useRef([])

  useEffect(() => {
    document.title = 'BAWOR'
    setDocumentScroll('page')

    const query = (selector) => root.current?.querySelector(selector)
    const later = (callback, delay) => {
      const timer = window.setTimeout(callback, delay)
      timers.current.push(timer)
      return timer
    }
    const showAlert = (id, type, message) => {
      const element = query(`#${id}`)
      element.className = `alert alert-${type} mb-3`
      element.innerHTML = `${alertIcon(type)}<span>${message}</span>`
    }
    const hideAlert = (id) => {
      const element = query(`#${id}`)
      element.className = 'hidden'
      element.innerHTML = ''
    }
    const setLoading = (prefix, loading) => {
      query(`#${prefix}-btn`).disabled = loading
      query(`#${prefix}-btn-text`).style.display = loading ? 'none' : ''
      query(`#${prefix}-spinner`).classList.toggle('hidden', !loading)
    }
    const updateThemeIcon = () => {
      const button = query('#themeToggleBtn')
      if (button) button.innerHTML = themeIcon(document.documentElement.classList.contains('light-mode'))
    }
    const checkStrength = (value) => {
      const fill = query('#strength-fill')
      const label = query('#strength-label')
      const isLight = document.documentElement.classList.contains('light-mode')
      if (!value) {
        fill.style.width = '0%'
        label.textContent = 'Masukkan kata sandi'
        label.style.color = isLight ? '#9CA3AF' : 'rgba(245,240,232,0.3)'
        label.style.fontWeight = '400'
        return
      }
      let score = 0
      if (value.length >= 8) score += 1
      if (value.length >= 12) score += 1
      if (/[A-Z]/.test(value)) score += 1
      if (/[0-9]/.test(value)) score += 1
      if (/[^A-Za-z0-9]/.test(value)) score += 1
      const levels = isLight
        ? [['20%', '#dc2626', 'Sangat lemah'], ['40%', '#ea580c', 'Lemah'], ['60%', '#ca8a04', 'Cukup'], ['80%', '#16a34a', 'Kuat'], ['100%', '#123829', 'Sangat kuat']]
        : [['20%', '#ef4444', 'Sangat lemah'], ['40%', '#f97316', 'Lemah'], ['60%', '#eab308', 'Cukup'], ['80%', '#22c55e', 'Kuat'], ['100%', '#1AAFA8', 'Sangat kuat']]
      const [width, color, text] = levels[Math.min(Math.max(score - 1, 0), 4)]
      fill.style.width = width
      fill.style.background = color
      label.textContent = text
      label.style.color = color
      label.style.fontWeight = '600'
    }
    const switchTab = (tab) => {
      query('#tab-masuk').classList.toggle('active', tab === 'masuk')
      query('#tab-daftar').classList.toggle('active', tab === 'daftar')
      query('#panel-masuk').classList.toggle('active', tab === 'masuk')
      query('#panel-daftar').classList.toggle('active', tab === 'daftar')
      history.replaceState(null, '', tab === 'daftar' ? '#daftar' : '#')
      hideAlert('login-alert')
      hideAlert('register-alert')
    }
    const showToast = (message, type = 'info') => {
      const toast = document.createElement('div')
      toast.className = `toast toast-${type} animate-toast-in`
      toast.innerHTML = `<span>${message}</span>`
      query('#toastContainer').appendChild(toast)
      later(() => {
        toast.classList.add('removing')
        toast.addEventListener('animationend', () => toast.remove(), { once: true })
      }, 5000)
    }

    const handleLogin = async () => {
      hideAlert('login-alert')
      const email = query('#login-email').value.trim().toLowerCase()
      const password = query('#login-pw').value
      if (!email || !password) {
        showAlert('login-alert', 'error', 'Harap isi semua kolom yang diperlukan.')
        return
      }
      if (!EMAIL_PATTERN.test(email)) {
        showAlert('login-alert', 'error', 'Format alamat email tidak valid.')
        return
      }
      setLoading('login', true)
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/backend-api'
        const response = await fetch(`${apiBaseUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Gunakan email sebagai username sesuai ekspektasi backend jika backend diubah, atau kirim username
          body: JSON.stringify({ username: email, password: password })
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.detail || 'Login gagal.')
        
        localStorage.setItem('bawor_token', data.access_token)
        localStorage.setItem(SESSION_KEY, JSON.stringify({ name: email.split('@')[0], email: email, loggedAt: new Date().toISOString() }))
        showAlert('login-alert', 'success', 'Berhasil masuk! Mengarahkan ke BAWOR...')
        later(() => navigate('/chat'), 1000)
      } catch (error) {
        showAlert('login-alert', 'error', error.message || 'Terjadi kesalahan saat menghubungi server.')
      } finally {
        setLoading('login', false)
      }
    }

    const handleRegister = async () => {
      hideAlert('register-alert')
      const name = query('#reg-name').value.trim()
      const email = query('#reg-email').value.trim().toLowerCase()
      const password = query('#reg-pw').value
      const confirmation = query('#reg-pw2').value
      const terms = query('#reg-terms').checked
      if (!name || !email || !password || !confirmation) {
        showAlert('register-alert', 'error', 'Harap isi semua kolom yang diperlukan.')
        return
      }
      if (!EMAIL_PATTERN.test(email)) {
        showAlert('register-alert', 'error', 'Format alamat email tidak valid.')
        return
      }
      if (password.length < 8) {
        showAlert('register-alert', 'error', 'Kata sandi minimal 8 karakter.')
        return
      }
      if (password !== confirmation) {
        query('#reg-pw2').classList.add('error')
        showAlert('register-alert', 'error', 'Konfirmasi kata sandi tidak cocok.')
        return
      }
      if (!terms) {
        showAlert('register-alert', 'error', 'Anda harus menyetujui Syarat & Ketentuan untuk melanjutkan.')
        return
      }
      query('#reg-pw2').classList.remove('error')
      setLoading('reg', true)
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/backend-api'
        const response = await fetch(`${apiBaseUrl}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: email, email: email, password: password })
        })
        const data = await response.json()
        if (!response.ok) {
          if (data.detail && data.detail.includes('digunakan')) {
            showAlert('register-alert', 'error', 'Email sudah terdaftar. <button class="alert-link" data-tab="masuk">Masuk di sini</button>')
          } else {
            throw new Error(data.detail || 'Pendaftaran gagal.')
          }
          return
        }
        
        localStorage.setItem(SESSION_KEY, JSON.stringify({ name: name, email: email, loggedAt: new Date().toISOString() }))
        showAlert('register-alert', 'success', `Akun berhasil dibuat! Silakan masuk kembali dengan email Anda.`)
        later(() => switchTab('masuk'), 1500)
      } catch (error) {
        showAlert('register-alert', 'error', error.message || 'Terjadi kesalahan saat menghubungi server.')
      } finally {
        setLoading('reg', false)
      }
    }

    const onClick = (event) => {
      const target = event.target.closest('button, a')
      if (!target || !root.current?.contains(target)) return
      if (target.tagName === 'A' && target.getAttribute('href') === '#') event.preventDefault()
      if (target.id === 'themeToggleBtn') {
        const isLight = document.documentElement.classList.toggle('light-mode')
        localStorage.setItem('bawor_theme', isLight ? 'light' : 'dark')
        updateThemeIcon()
        checkStrength(query('#reg-pw').value)
      } else if (target.id === 'tab-masuk' || target.dataset.tab === 'masuk') {
        switchTab('masuk')
      } else if (target.id === 'tab-daftar' || target.dataset.tab === 'daftar') {
        switchTab('daftar')
      } else if (target.classList.contains('toggle-pw')) {
        const input = target.parentElement.querySelector('input')
        const visible = input.type === 'password'
        input.type = visible ? 'text' : 'password'
        target.innerHTML = passwordIcon(visible)
      } else if (target.dataset.action === 'google') {
        showToast('Login dengan Google belum tersedia. Fitur ini memerlukan konfigurasi Firebase Auth. Silakan gunakan email & sandi untuk saat ini.', 'warn')
      }
    }
    const onInput = (event) => {
      if (event.target.id === 'reg-pw') checkStrength(event.target.value)
    }
    const onSubmit = (event) => {
      event.preventDefault()
      if (event.target.id === 'loginForm') handleLogin()
      if (event.target.id === 'registerForm') handleRegister()
    }

    root.current?.addEventListener('click', onClick)
    root.current?.addEventListener('input', onInput)
    root.current?.addEventListener('submit', onSubmit)
    updateThemeIcon()
    if (window.location.hash === '#daftar') switchTab('daftar')

    return () => {
      timers.current.forEach(window.clearTimeout)
      timers.current = []
      root.current?.removeEventListener('click', onClick)
      root.current?.removeEventListener('input', onInput)
      root.current?.removeEventListener('submit', onSubmit)
    }
  }, [navigate])

  return <LoginView rootRef={root} />
}
