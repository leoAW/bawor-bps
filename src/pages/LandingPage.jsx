import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingView from '../views/LandingView'
import '../styles/index.css'
import { setDocumentScroll } from '../utils/pageScroll'

function themeIcon(isLight) {
  return isLight
    ? '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>'
    : '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
}

export default function LandingPage() {
  const navigate = useNavigate()
  const root = useRef(null)

  useEffect(() => {
    document.title = 'BAWOR'
    setDocumentScroll('page')
    document.body.classList.add('grain')

    const updateThemeIcon = () => {
      const button = root.current?.querySelector('#themeToggleBtn')
      if (button) button.innerHTML = themeIcon(document.documentElement.classList.contains('light-mode'))
    }

    const onClick = (event) => {
      const target = event.target.closest('button, a')
      if (!target || !root.current?.contains(target)) return

      if (target.id === 'themeToggleBtn') {
        event.preventDefault()
        const isLight = document.documentElement.classList.toggle('light-mode')
        localStorage.setItem('bawor_theme', isLight ? 'light' : 'dark')
        updateThemeIcon()
        return
      }

      if (target.id === 'menuBtn') {
        root.current.querySelector('#mobileMenu')?.classList.toggle('hidden')
        return
      }

      if (target.dataset.action === 'goToApp') {
        event.preventDefault()
        navigate(localStorage.getItem('bawor_user') ? '/chat' : '/login')
        return
      }

      if (target.closest('#mobileMenu') && target.matches('a')) {
        root.current.querySelector('#mobileMenu')?.classList.add('hidden')
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return
        setTimeout(() => {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }, index * 80)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.1 })

    root.current?.querySelectorAll('.stat-card, .icon-ring').forEach((element) => {
      element.style.opacity = '0'
      element.style.transform = 'translateY(20px)'
      element.style.transition = 'opacity .5s ease, transform .5s ease'
      observer.observe(element)
    })

    root.current?.addEventListener('click', onClick)
    updateThemeIcon()

    return () => {
      observer.disconnect()
      root.current?.removeEventListener('click', onClick)
      document.body.classList.remove('grain')
    }
  }, [navigate])

  return <LandingView rootRef={root} />
}
