import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatView from '../views/ChatView'
import '../styles/chat.css'
import { setDocumentScroll } from '../utils/pageScroll'
import { API_BASE_URL } from '../utils/api'

function themeIcon(isLight) {
  return isLight
    ? '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
    : '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>'
}

function sourceIcon() {
  return '<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>'
}

function appendInlineMarkdown(container, text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  parts.forEach((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const strong = document.createElement('strong')
      strong.textContent = part.slice(2, -2)
      container.appendChild(strong)
    } else {
      container.appendChild(document.createTextNode(part))
    }
  })
}

function renderSafeMarkdown(container, text) {
  const lines = String(text || '').replace(/\r/g, '').split('\n')
  let list = null
  lines.forEach((rawLine) => {
    const line = rawLine.trim()
    if (!line) {
      list = null
      return
    }
    const listMatch = line.match(/^[-*]\s+(.+)/)
    if (listMatch) {
      if (!list) {
        list = document.createElement('ul')
        container.appendChild(list)
      }
      const item = document.createElement('li')
      appendInlineMarkdown(item, listMatch[1])
      list.appendChild(item)
      return
    }
    list = null
    const paragraph = document.createElement('p')
    appendInlineMarkdown(paragraph, line.replace(/^#{1,6}\s+/, ''))
    container.appendChild(paragraph)
  })
}

function createCitations(citations, fallbackSources) {
  const wrapper = document.createElement('div')
  wrapper.className = 'citation-list'
  const items = (citations?.length
    ? citations
    : (fallbackSources || []).map((source) => ({ title: source, source_path: source })))
    .slice(0, 2)
  items.forEach((citation) => {
    const item = citation.url ? document.createElement('a') : document.createElement('div')
    item.className = 'citation-item'
    if (citation.url) {
      item.href = citation.url
      item.target = '_blank'
      item.rel = 'noopener noreferrer'
    }
    const title = document.createElement('span')
    title.textContent = citation.title || citation.source_path || 'Sumber'
    item.appendChild(title)
    if (citation.page_number) {
      const page = document.createElement('small')
      page.textContent = citation.printed_page_number
        ? `halaman dokumen ${citation.printed_page_number} (PDF ${citation.page_number})`
        : `halaman PDF ${citation.page_number}`
      item.appendChild(page)
    }
    wrapper.appendChild(item)
  })
  return wrapper
}

function createTables(tables) {
  const wrapper = document.createElement('div')
  wrapper.className = 'answer-tables'
  const heading = document.createElement('div')
  heading.className = 'answer-data-heading'
  heading.textContent = 'Tabel Data'
  wrapper.appendChild(heading)
  ;(tables || []).forEach((table) => {
    const section = document.createElement('section')
    section.className = 'answer-table-card'
    const title = document.createElement('div')
    title.className = 'answer-table-title'
    title.textContent = table.source_path
      ? `${table.title} - ${table.source_path}`
      : table.title
    const scroll = document.createElement('div')
    scroll.className = 'answer-table-scroll'
    const element = document.createElement('table')
    element.className = 'stat-table'
    const head = document.createElement('thead')
    const headRow = document.createElement('tr')
    table.columns.forEach((column) => {
      const th = document.createElement('th')
      th.textContent = String(column || '').replace(/[*_`#]+/g, '')
      headRow.appendChild(th)
    })
    head.appendChild(headRow)
    const body = document.createElement('tbody')
    table.rows.forEach((row) => {
      const tr = document.createElement('tr')
      table.columns.forEach((column) => {
        const td = document.createElement('td')
        td.textContent = String(row[column] ?? '').replace(/[*_`#]+/g, '')
        tr.appendChild(td)
      })
      body.appendChild(tr)
    })
    element.append(head, body)
    scroll.appendChild(element)
    section.append(title, scroll)
    wrapper.appendChild(section)
  })
  return wrapper
}

function createCharts(charts) {
  const wrapper = document.createElement('div')
  wrapper.className = 'answer-charts'
  const heading = document.createElement('div')
  heading.className = 'answer-data-heading'
  heading.textContent = 'Grafik'
  wrapper.appendChild(heading)
  ;(charts || []).forEach((chart) => {
    const points = chart.series?.[0]?.points || []
    if (!points.length) return
    const card = document.createElement('section')
    card.className = 'answer-chart-card'
    const title = document.createElement('div')
    title.className = 'answer-chart-title'
    title.textContent = chart.title
    const width = 640
    const height = 250
    const pad = { left: 58, right: 18, top: 20, bottom: 48 }
    const values = points.map((point) => Number(point.value)).filter(Number.isFinite)
    const min = Math.min(0, ...values)
    const max = Math.max(...values)
    const span = max - min || 1
    const x = (index) => pad.left + (index * (width - pad.left - pad.right)) / Math.max(points.length - 1, 1)
    const y = (value) => pad.top + ((max - value) * (height - pad.top - pad.bottom)) / span
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    svg.setAttribute('role', 'img')
    svg.setAttribute('aria-label', chart.title)
    svg.classList.add('stat-chart')
    if (chart.type === 'pie') {
      const piePoints = points.filter((point) => Number(point.value) > 0)
      const total = piePoints.reduce((sum, point) => sum + Number(point.value), 0)
      const colors = ['#1AAFA8', '#38BDF8', '#F59E0B', '#A78BFA', '#F472B6', '#34D399']
      let angle = -Math.PI / 2
      piePoints.forEach((point, index) => {
        const nextAngle = angle + (Number(point.value) / total) * Math.PI * 2
        const x1 = 180 + Math.cos(angle) * 92
        const y1 = 125 + Math.sin(angle) * 92
        const x2 = 180 + Math.cos(nextAngle) * 92
        const y2 = 125 + Math.sin(nextAngle) * 92
        const path = document.createElementNS(svg.namespaceURI, 'path')
        path.setAttribute(
          'd',
          `M 180 125 L ${x1} ${y1} A 92 92 0 ${nextAngle - angle > Math.PI ? 1 : 0} 1 ${x2} ${y2} Z`,
        )
        path.setAttribute('fill', colors[index % colors.length])
        path.setAttribute('class', 'chart-pie-slice')
        const tooltip = document.createElementNS(svg.namespaceURI, 'title')
        tooltip.textContent = `${point.label}: ${Number(point.value).toLocaleString('id-ID')}`
        path.appendChild(tooltip)
        svg.appendChild(path)

        const swatch = document.createElementNS(svg.namespaceURI, 'rect')
        swatch.setAttribute('x', 330)
        swatch.setAttribute('y', 45 + index * 26)
        swatch.setAttribute('width', 12)
        swatch.setAttribute('height', 12)
        swatch.setAttribute('rx', 2)
        swatch.setAttribute('fill', colors[index % colors.length])
        svg.appendChild(swatch)
        const label = document.createElementNS(svg.namespaceURI, 'text')
        label.setAttribute('x', 350)
        label.setAttribute('y', 55 + index * 26)
        label.setAttribute('class', 'chart-axis-label')
        label.textContent = `${point.label}: ${Number(point.value).toLocaleString('id-ID')}`
        svg.appendChild(label)
        angle = nextAngle
      })
      card.append(title, svg)
      wrapper.appendChild(card)
      return
    }
    for (let index = 0; index <= 4; index += 1) {
      const value = min + ((max - min) * index) / 4
      const gridY = y(value)
      const line = document.createElementNS(svg.namespaceURI, 'line')
      line.setAttribute('x1', pad.left)
      line.setAttribute('x2', width - pad.right)
      line.setAttribute('y1', gridY)
      line.setAttribute('y2', gridY)
      line.setAttribute('class', 'chart-grid')
      svg.appendChild(line)
      const label = document.createElementNS(svg.namespaceURI, 'text')
      label.setAttribute('x', pad.left - 8)
      label.setAttribute('y', gridY + 4)
      label.setAttribute('text-anchor', 'end')
      label.setAttribute('class', 'chart-axis-label')
      label.textContent = Number(value.toFixed(2)).toLocaleString('id-ID')
      svg.appendChild(label)
    }
    if (chart.type === 'line') {
      const polyline = document.createElementNS(svg.namespaceURI, 'polyline')
      polyline.setAttribute('points', points.map((point, index) => `${x(index)},${y(Number(point.value))}`).join(' '))
      polyline.setAttribute('class', 'chart-line')
      svg.appendChild(polyline)
    }
    points.forEach((point, index) => {
      const marker = document.createElementNS(svg.namespaceURI, chart.type === 'bar' ? 'rect' : 'circle')
      if (chart.type === 'bar') {
        const barWidth = Math.min(90, (width - pad.left - pad.right) / Math.max(points.length * 2, 1))
        marker.setAttribute('x', x(index) - barWidth / 2)
        marker.setAttribute('y', y(Number(point.value)))
        marker.setAttribute('width', barWidth)
        marker.setAttribute('height', Math.max(2, y(0) - y(Number(point.value))))
        marker.setAttribute('rx', 4)
        marker.setAttribute('class', 'chart-bar')
      } else {
        marker.setAttribute('cx', x(index))
        marker.setAttribute('cy', y(Number(point.value)))
        marker.setAttribute('r', 4)
        marker.setAttribute('class', 'chart-point')
      }
      const tooltip = document.createElementNS(svg.namespaceURI, 'title')
      tooltip.textContent = `${point.label}: ${Number(point.value).toLocaleString('id-ID')}`
      marker.appendChild(tooltip)
      svg.appendChild(marker)
      if (points.length <= 8 || index === 0 || index === points.length - 1) {
        const label = document.createElementNS(svg.namespaceURI, 'text')
        label.setAttribute('x', x(index))
        label.setAttribute('y', height - 18)
        label.setAttribute('text-anchor', 'middle')
        label.setAttribute('class', 'chart-axis-label')
        label.textContent = point.label
        svg.appendChild(label)
      }
    })
    card.append(title, svg)
    wrapper.appendChild(card)
  })
  return wrapper
}

export default function ChatPage() {
  const navigate = useNavigate()
  const root = useRef(null)
  const messages = useRef([])
  const isTyping = useRef(false)

  useEffect(() => {
    document.title = 'BAWOR'
    setDocumentScroll('locked')
    const query = (selector) => root.current?.querySelector(selector)
    let activeRequestController = null
    
    const fetchWithRefresh = async (url, options = {}) => {
      let token = localStorage.getItem('bawor_token')
      const headers = { ...options.headers }
      if (token && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${token}`
      }
      
      let res = await fetch(url, { ...options, headers })
      
      if (res.status === 401 && token) {
        // Cek apakah refresh endpoint mengembalikan JSON sebelum parse
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const refreshContentType = refreshRes.headers.get('content-type') || ''
        if (refreshRes.ok && refreshContentType.includes('application/json')) {
          const data = await refreshRes.json()
          localStorage.setItem('bawor_token', data.access_token)
          headers['Authorization'] = `Bearer ${data.access_token}`
          res = await fetch(url, { ...options, headers })
        } else {
          localStorage.removeItem('bawor_user')
          localStorage.removeItem('bawor_token')
          sessionStorage.removeItem('sessionId')
          navigate('/login')
        }
      }
      return res
    }

    const closeSidebar = () => {
      query('#sidebar').classList.remove('open')
      query('#sidebarOverlay').classList.remove('visible')
    }
    const scrollBottom = () => {
      const area = query('#messagesArea')
      window.setTimeout(() => { area.scrollTop = area.scrollHeight }, 50)
    }
    const createBubble = (message) => {
      const row = document.createElement('div')
      row.className = `msg-row ${message.role}`
      if (message.role === 'user') {
        const bubble = document.createElement('div')
        bubble.className = 'bubble user'
        bubble.textContent = message.text
        row.appendChild(bubble)
        return row
      }
      const avatar = document.createElement('div')
      avatar.className = 'bot-avatar'
      avatar.innerHTML = '<img src="/assets/images/Bawor-Logo.png" alt="BAWOR" />'
      const content = document.createElement('div')
      const bubble = document.createElement('div')
      bubble.className = 'bubble bot'
      renderSafeMarkdown(bubble, message.text)
      content.appendChild(bubble)
      if (message.validation?.status === 'blocked') {
        const warning = document.createElement('div')
        warning.className = 'validation-warning'
        warning.textContent = message.validation.message
        content.appendChild(warning)
      }
      if (message.charts?.length) content.appendChild(createCharts(message.charts))
      if (message.tables?.length) content.appendChild(createTables(message.tables))
      if (message.citations?.length || message.sources?.length) {
        content.appendChild(createCitations(message.citations, message.sources))
      }
      row.append(avatar, content)
      return row
    }
    const renderMessages = () => {
      const area = query('#messagesArea')
      const welcome = query('#welcomeScreen')
      if (messages.current.length === 0) {
        area.style.display = 'none'
        welcome.style.display = 'flex'
        return
      }
      area.style.display = 'flex'
      welcome.style.display = 'none'
      area.replaceChildren(...messages.current.map(createBubble))
      scrollBottom()
    }
    const updateSendButton = () => {
      query('#sendBtn').disabled = query('#chatInput').value.trim() === '' || isTyping.current
    }
    const showTyping = () => {
      isTyping.current = true
      const area = query('#messagesArea')
      query('#welcomeScreen').style.display = 'none'
      area.style.display = 'flex'
      const row = document.createElement('div')
      row.className = 'msg-row bot'
      row.id = 'typingRow'
      row.innerHTML = '<div class="bot-avatar"><img src="/assets/images/Bawor-Logo.png" alt="BAWOR" /></div><div class="bubble bot" style="padding:12px 16px;"><div style="display:flex;gap:5px;align-items:center;"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>'
      area.appendChild(row)
      updateSendButton()
      scrollBottom()
    }
    const removeTyping = () => {
      query('#typingRow')?.remove()
      isTyping.current = false
      updateSendButton()
    }
    const sendMessage = async () => {
      const input = query('#chatInput')
      const text = input.value.trim()
      if (!text || isTyping.current) return
      messages.current.push({ role: 'user', text })
      input.value = ''
      input.style.height = 'auto'
      renderMessages()
      showTyping()
      const requestController = new AbortController()
      activeRequestController = requestController
      const headers = { 'Content-Type': 'application/json' }
      try {
        const response = await fetchWithRefresh(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ message: text, session_id: sessionStorage.getItem('sessionId') }),
          signal: requestController.signal,
        })
        if (response.status === 401) return
        if (!response.ok) throw new Error(`Chat API returned ${response.status}`)
        // Pastikan JSON sebelum parse
        const contentType = response.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          throw new Error('Server sedang dalam proses pemanasan. Silakan coba beberapa saat lagi.')
        }
        const data = await response.json()
        if (data.session_id) sessionStorage.setItem('sessionId', data.session_id)
        removeTyping()
        messages.current.push({
          role: 'bot',
          text: data.answer,
          sources: data.sources,
          citations: data.citations,
          tables: data.tables,
          charts: data.charts,
          validation: data.validation,
        })
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error(error)
        removeTyping()
        messages.current.push({ role: 'bot', text: 'Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi.' })
      } finally {
        if (activeRequestController === requestController) activeRequestController = null
        loadSessions()
      }
      renderMessages()
    }
    const resetChat = () => {
      activeRequestController?.abort()
      activeRequestController = null
      isTyping.current = false
      messages.current = []
      sessionStorage.setItem('sessionId', `session_${Date.now()}`)
      query('#typingRow')?.remove()
      const input = query('#chatInput')
      input.value = ''
      input.style.height = 'auto'
      renderMessages()
      updateSendButton()
      input.focus()
      closeSidebar()
    }
    const updateThemeIcon = () => {
      const button = query('#themeToggleBtn')
      if (button) button.innerHTML = themeIcon(document.documentElement.classList.contains('light-mode'))
    }

    const showCustomModal = ({ title, type, onConfirm }) => {
      const overlay = query('#customModalOverlay')
      const box = query('#customModalBox')
      const titleEl = query('#customModalTitle')
      const inputEl = query('#customModalInput')
      const cancelBtn = query('#customModalCancelBtn')
      const okBtn = query('#customModalOkBtn')
      
      if (!overlay) return
      
      titleEl.textContent = title
      if (type === 'prompt') {
        inputEl.style.display = 'block'
        inputEl.value = ''
        setTimeout(() => inputEl.focus(), 100)
      } else {
        inputEl.style.display = 'none'
      }
      
      overlay.style.display = 'flex'
      requestAnimationFrame(() => {
        overlay.style.opacity = '1'
        box.style.transform = 'translateY(0)'
      })
      
      const closeModal = () => {
        overlay.style.opacity = '0'
        box.style.transform = 'translateY(20px)'
        setTimeout(() => overlay.style.display = 'none', 200)
        cancelBtn.onclick = null
        okBtn.onclick = null
        inputEl.onkeydown = null
      }
      
      cancelBtn.onclick = closeModal
      
      const confirmAction = () => {
        if (type === 'prompt') {
          const val = inputEl.value.trim()
          if (!val) return
          onConfirm(val)
        } else {
          onConfirm()
        }
        closeModal()
      }
      
      okBtn.onclick = confirmAction
      inputEl.onkeydown = (e) => {
        if (e.key === 'Enter') confirmAction()
      }
    }

    const onClick = (event) => {
      const target = event.target.closest('[data-action], .model-pick-option')
      const modelPick = query('#modelPick')
      if (!target || !root.current?.contains(target)) {
        modelPick?.classList.remove('open')
        return
      }
      const action = target.dataset.action
      if (action === 'closeSidebar') closeSidebar()
      if (action === 'toggleSidebar') {
        if (query('#sidebar').classList.contains('open')) closeSidebar()
        else {
          query('#sidebar').classList.add('open')
          query('#sidebarOverlay').classList.add('visible')
        }
      }
      if (action === 'newChat') {
        resetChat()
        loadSessions()
      }
      if (action === 'loadSession') {
        const sid = target.dataset.sessionId
        if (sid && sid !== sessionStorage.getItem('sessionId')) {
          sessionStorage.setItem('sessionId', sid)
          messages.current = []
          const area = query('#messagesArea')
          if (area) {
             area.style.display = 'flex'
             query('#welcomeScreen').style.display = 'none'
             area.innerHTML = '<div style="text-align:center; padding:20px; opacity:0.5; width:100%;">Memuat obrolan...</div>'
          }
          loadHistory()
          loadSessions()
          if (window.innerWidth < 768) closeSidebar()
        }
      }
      if (action === 'deleteSession') {
        const sid = target.dataset.sessionId
        // Hide dropdown
        const dropdown = target.closest('.session-dropdown')
        if (dropdown) {
          dropdown.classList.add('hidden')
          dropdown.classList.remove('flex')
          dropdown.style.display = 'none'
        }
        
        showCustomModal({
          title: 'Hapus percakapan ini?',
          type: 'confirm',
          onConfirm: () => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/backend-api'
            const token = localStorage.getItem('bawor_token')
            fetch(`${apiBaseUrl}/session/${sid}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }})
              .then(() => {
                if (sid === sessionStorage.getItem('sessionId')) resetChat()
                loadSessions()
              })
          }
        })
      }
      if (action === 'editSession') {
        const sid = target.dataset.sessionId
        // Hide dropdown
        const dropdown = target.closest('.session-dropdown')
        if (dropdown) {
          dropdown.classList.add('hidden')
          dropdown.classList.remove('flex')
          dropdown.style.display = 'none'
        }

        showCustomModal({
          title: 'Masukkan nama obrolan baru:',
          type: 'prompt',
          onConfirm: (newTitle) => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/backend-api'
            const token = localStorage.getItem('bawor_token')
            fetch(`${apiBaseUrl}/session/${sid}/title`, {
              method: 'PUT',
              headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: newTitle })
            }).then(() => loadSessions())
          }
        })
      }
      if (action === 'setNav') {
        root.current.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'))
        target.classList.add('active')
        closeSidebar()
      }
      if (action === 'toggleSessionMenu') {
        document.querySelectorAll('.session-dropdown').forEach(d => {
          if (d !== target.nextElementSibling) {
            d.classList.add('hidden')
            d.classList.remove('flex')
            d.classList.remove('block')
            d.style.display = 'none'
          }
        })
        const dropdown = target.nextElementSibling
        if (dropdown) {
          dropdown.classList.toggle('hidden')
          dropdown.classList.toggle('flex')
          dropdown.style.display = dropdown.classList.contains('hidden') ? 'none' : 'flex'
          dropdown.style.flexDirection = 'column'
        }
      }
      if (action === 'logout') {
        localStorage.removeItem('bawor_user')
        localStorage.removeItem('bawor_token')
        sessionStorage.removeItem('sessionId')
        navigate('/login')
      }
      if (action === 'toggleTheme') {
        const isLight = document.documentElement.classList.toggle('light-mode')
        localStorage.setItem('bawor_theme', isLight ? 'light' : 'dark')
        updateThemeIcon()
      }
      if (action === 'toggleModelPick') modelPick.classList.toggle('open')
      if (action === 'selectModel') {
        query('#modelPickLabel').textContent = target.dataset.label
        root.current.querySelectorAll('.model-pick-option').forEach((option) => option.classList.remove('selected'))
        target.classList.add('selected')
        modelPick.classList.remove('open')
      }
      if (action === 'sendMessage') sendMessage()
      if (!target.closest('#modelPick') && action !== 'toggleModelPick') modelPick?.classList.remove('open')
    }
    const onInput = (event) => {
      if (event.target.id !== 'chatInput') return
      event.target.style.height = 'auto'
      event.target.style.height = `${Math.min(event.target.scrollHeight, 140)}px`
      updateSendButton()
    }
    const onKeyDown = (event) => {
      if (event.target.id === 'chatInput' && event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        sendMessage()
      }
    }
    const onDocumentClick = (event) => {
      const modelPick = query('#modelPick')
      if (modelPick && !modelPick.contains(event.target)) modelPick.classList.remove('open')
      
      if (!event.target.closest('.session-menu-wrapper')) {
        document.querySelectorAll('.session-dropdown').forEach(d => {
          d.classList.add('hidden')
          d.classList.remove('flex')
          d.style.display = 'none'
        })
      }
    }

    if (!sessionStorage.getItem('sessionId')) sessionStorage.setItem('sessionId', `session_${Date.now()}`)
    const user = JSON.parse(localStorage.getItem('bawor_user') || '{"name":"Pengguna"}')
    const name = user.name || 'Pengguna'
    query('#userName').textContent = name
    query('#userInitial').textContent = (name[0] || 'P').toUpperCase()
    query('#welcomeUserName').textContent = name
    
    const loadHistory = async () => {
      try {
        const sessionId = sessionStorage.getItem('sessionId')
        const response = await fetchWithRefresh(`${API_BASE_URL}/chat/history?session_id=${sessionId}`)
        if (response.status === 401) return
        if (!response.ok) return
        const contentType = response.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) return
        const history = await response.json()
        if (history && history.length > 0) {
          messages.current = []
          history.forEach(item => {
            messages.current.push({ role: 'user', text: item.user })
            messages.current.push({ role: 'bot', text: item.bot, sources: item.sources })
          })
          renderMessages()
        }
      } catch (e) {
        console.error("Failed to load history", e)
      }
    }
    
    const loadSessions = async () => {
      try {
        const token = localStorage.getItem('bawor_token')
        if (!token) return
        
        const response = await fetchWithRefresh(`${API_BASE_URL}/chat/sessions`)
        if (!response.ok) return
        const contentType = response.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) return
        const sessions = await response.json()
        
        const container = query('#chatHistoryList')
        if (!container) return
        
        const currentSessionId = sessionStorage.getItem('sessionId')
        container.innerHTML = ''
        
        sessions.forEach(session => {
          const btn = document.createElement('div')
          btn.className = `nav-item ${session.session_id === currentSessionId ? 'active' : ''}`
          btn.style.padding = '8px 12px'
          btn.style.fontSize = '0.75rem'
          
          btn.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
              <div data-action="loadSession" data-session-id="${session.session_id}" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1; cursor:pointer;" title="${session.title}">
                <svg class="w-3.5 h-3.5 mr-2 inline-block opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="pointer-events:none;"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                <span>${session.title}</span>
              </div>
              <div class="relative session-menu-wrapper" style="display:flex; align-items:center; margin-left:4px;">
                <button data-action="toggleSessionMenu" class="opacity-60 hover:opacity-100 transition-opacity" style="background:none;border:none;cursor:pointer;padding:4px;" title="Pilihan">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style="pointer-events:none;"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                </button>
                <div class="session-dropdown hidden absolute right-0 top-full mt-1 bg-[#111e21] border border-white/10 rounded-md p-1 shadow-lg z-50 min-w-[120px]">
                  <button data-action="editSession" data-session-id="${session.session_id}" class="w-full text-left px-3 py-2 text-xs text-[#F5F0E8] hover:bg-white/10 rounded transition-colors" style="background:none;border:none;cursor:pointer;">Ganti Nama</button>
                  <button data-action="deleteSession" data-session-id="${session.session_id}" class="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-white/10 rounded transition-colors" style="background:none;border:none;cursor:pointer;">Hapus</button>
                </div>
              </div>
            </div>
          `
          container.appendChild(btn)
        })
      } catch (e) {
        console.error("Failed to load sessions", e)
      }
    }

    loadHistory()
    loadSessions()
    
    renderMessages()
    updateSendButton()
    updateThemeIcon()

    root.current?.addEventListener('click', onClick)
    root.current?.addEventListener('input', onInput)
    root.current?.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onDocumentClick)

    return () => {
      activeRequestController?.abort()
      root.current?.removeEventListener('click', onClick)
      root.current?.removeEventListener('input', onInput)
      root.current?.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onDocumentClick)
    }
  }, [navigate])

  return <ChatView rootRef={root} />
}
