import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SettingsView from '../views/SettingsView'
import '../styles/settings.css'
import { setDocumentScroll } from '../utils/pageScroll'

function themeIcon(isLight) {
  return isLight
    ? '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>'
    : '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const root = useRef(null)
  const timers = useRef([])

  useEffect(() => {
    document.title = 'BAWOR'
    setDocumentScroll('page')
    const query = (selector) => root.current?.querySelector(selector)
    const state = {
      mode: localStorage.getItem('rapstone_key_mode') || 'server',
      apiKey: localStorage.getItem('rapstone_api_key') || '',
      lang: localStorage.getItem('rapstone_lang') || 'id',
    }
    const later = (callback, delay) => {
      const timer = window.setTimeout(callback, delay)
      timers.current.push(timer)
    }
    const showToast = (message, type = 'error') => {
      const toast = document.createElement('div')
      toast.className = `s-toast ${type}`
      const icons = { error: 'fa-circle-exclamation', success: 'fa-circle-check', info: 'fa-circle-info' }
      toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`
      query('#sToastBox').appendChild(toast)
      later(() => {
        toast.classList.add('out')
        later(() => toast.remove(), 250)
      }, 3500)
    }
    const setKeyStatus = (type, text) => {
      const status = query('#keyStatus')
      const icons = { active: 'fa-circle-check', inactive: 'fa-circle', testing: 'fa-spinner fa-spin' }
      status.className = `s-key-status ${type}`
      status.innerHTML = `<i class="fas ${icons[type] || 'fa-circle'}"></i><span>${text}</span>`
    }
    const selectMode = (mode, notify = true) => {
      state.mode = mode
      localStorage.setItem('rapstone_key_mode', mode)
      const server = query('#optServer')
      const own = query('#optOwn')
      server.classList.toggle('selected', mode === 'server')
      server.setAttribute('aria-checked', String(mode === 'server'))
      own.classList.toggle('selected', mode === 'own')
      own.setAttribute('aria-checked', String(mode === 'own'))
      query('#keyInputArea').style.display = mode === 'own' ? '' : 'none'
      if (mode === 'own') query('#keyInput').focus()
      if (notify) showToast(mode === 'server' ? 'Beralih ke Server Key' : 'Mode: Input API Key kamu (Save > Test > Gunakan)', 'info')
    }
    const updateThemeIcon = () => {
      const button = query('#themeToggleBtn')
      if (button) button.innerHTML = themeIcon(document.documentElement.classList.contains('light-mode'))
    }
    const initUI = () => {
      query('#langSelect').value = state.lang
      selectMode(state.mode, false)
      query('#keyInput').value = state.apiKey
      if (state.apiKey) {
        const tested = localStorage.getItem('rapstone_key_tested') === 'true'
        setKeyStatus(tested ? 'active' : 'inactive', tested ? 'API key terverifikasi' : 'API key tersimpan - siap digunakan')
        query('#btnUseKey').disabled = false
      } else {
        setKeyStatus('inactive', 'Belum ada key tersimpan')
        query('#btnUseKey').disabled = true
      }
    }

    const testKey = async () => {
      const key = query('#keyInput').value.trim()
      if (!key) return showToast('Masukkan API key dulu')
      if (!key.startsWith('AIza')) return showToast('Format key tidak valid')
      const button = query('#btnTest')
      const original = button.innerHTML
      button.disabled = true
      button.innerHTML = '<span class="s-spinner"></span> Testing...'
      setKeyStatus('testing', 'Menghubungi Gemini API...')
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Say "OK" in one word.' }] }], generationConfig: { maxOutputTokens: 10 } }),
        })
        if (!response.ok) {
          const error = await response.json().catch(() => ({}))
          throw new Error(error?.error?.message || `HTTP ${response.status}`)
        }
        const data = await response.json()
        if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) throw new Error('Respons kosong dari API')
        setKeyStatus('active', 'API key terverifikasi')
        localStorage.setItem('rapstone_key_tested', 'true')
        showToast('API key terverifikasi', 'success')
      } catch (error) {
        setKeyStatus('inactive', `Test gagal: ${error.message} (key tetap tersimpan)`)
        showToast(`Test gagal: ${error.message}`, 'error')
      } finally {
        button.disabled = false
        button.innerHTML = original
      }
    }

    const onClick = (event) => {
      const target = event.target.closest('button, #optServer, #optOwn, .nav-link')
      if (!target || !root.current?.contains(target)) return
      if (target.id === 'themeToggleBtn') {
        const isLight = document.documentElement.classList.toggle('light-mode')
        localStorage.setItem('bawor_theme', isLight ? 'light' : 'dark')
        updateThemeIcon()
      }
      if (target.id === 'menuBtn') query('#mobileMenu').classList.toggle('hidden')
      if (target.id === 'optServer') selectMode('server')
      if (target.id === 'optOwn') selectMode('own')
      if (target.id === 'backBtn') navigate('/')
      if (target.id === 'guideToggle') {
        const open = query('#guideBody').classList.contains('open')
        query('#guideBody').classList.toggle('open')
        target.classList.toggle('open')
        target.setAttribute('aria-expanded', String(!open))
      }
      if (target.id === 'keyToggle') {
        const input = query('#keyInput')
        const hidden = input.type === 'password'
        input.type = hidden ? 'text' : 'password'
        target.innerHTML = hidden ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>'
      }
      if (target.id === 'btnSave') {
        const key = query('#keyInput').value.trim()
        if (!key) return showToast('API key tidak boleh kosong')
        if (!key.startsWith('AIza')) return showToast('Format key tidak valid - harus dimulai "AIza..."')
        state.apiKey = key
        localStorage.setItem('rapstone_api_key', key)
        localStorage.removeItem('rapstone_key_tested')
        setKeyStatus('inactive', 'API key tersimpan - siap digunakan')
        query('#btnUseKey').disabled = false
        showToast('API key berhasil disimpan', 'success')
      }
      if (target.id === 'btnClear') {
        if (!state.apiKey) return showToast('Tidak ada key untuk dihapus', 'info')
        state.apiKey = ''
        query('#keyInput').value = ''
        localStorage.removeItem('rapstone_api_key')
        localStorage.removeItem('rapstone_key_tested')
        setKeyStatus('inactive', 'Belum ada key tersimpan')
        query('#btnUseKey').disabled = true
        showToast('API key dihapus', 'success')
      }
      if (target.id === 'btnUseKey') {
        const key = query('#keyInput').value.trim()
        if (!key) return showToast('Masukkan API key dulu')
        state.apiKey = key
        localStorage.setItem('rapstone_api_key', key)
        selectMode('own', false)
        setKeyStatus('active', 'API Key sedang digunakan')
        showToast('API Key berhasil diaktifkan', 'success')
      }
      if (target.id === 'btnTest') testKey()
      if (target.id === 'btnFeedback') showToast('Fitur feedback akan segera tersedia', 'info')
      if (target.closest('#mobileMenu') && target.classList.contains('nav-link') && target.textContent.trim() !== 'Settings') {
        query('#mobileMenu').classList.add('hidden')
      }
    }
    const onKeyDown = (event) => {
      if ((event.target.id === 'optServer' || event.target.id === 'optOwn') && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        selectMode(event.target.id === 'optServer' ? 'server' : 'own')
      }
    }
    const onChange = (event) => {
      if (event.target.id !== 'langSelect') return
      state.lang = event.target.value
      localStorage.setItem('rapstone_lang', state.lang)
      showToast(`Bahasa diubah ke ${state.lang === 'id' ? 'Bahasa Indonesia' : 'English'}`, 'info')
    }

    root.current?.addEventListener('click', onClick)
    root.current?.addEventListener('keydown', onKeyDown)
    root.current?.addEventListener('change', onChange)
    updateThemeIcon()
    initUI()

    return () => {
      timers.current.forEach(window.clearTimeout)
      timers.current = []
      root.current?.removeEventListener('click', onClick)
      root.current?.removeEventListener('keydown', onKeyDown)
      root.current?.removeEventListener('change', onChange)
    }
  }, [navigate])

  return <SettingsView rootRef={root} />
}
