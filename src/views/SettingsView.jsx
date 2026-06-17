export default function SettingsView({ rootRef }) {
  return (
    <div ref={rootRef} style={{ display: 'contents' }}>
<div>

<div className="bg-layer">
  <div className="orb orb-1"></div>
  <div className="orb orb-2"></div>
  <div className="orb orb-3"></div>
</div>

<div className="s-toast-box" id="sToastBox"></div>


<nav className="fixed top-0 left-0 right-0 z-50 glass-dark" style={{borderBottom: '1px solid rgba(26,175,168,.12)'}}>
  <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
    <a href="/" className="flex items-center gap-3 group">
      <img src="/assets/images/Bawor-Logo.png" alt="BAWOR Logo" className="h-9 w-auto" />
      <div className="leading-tight">
        <span className="font-display font-600 text-bawor-cream text-lg tracking-tight">BAWOR</span>
        <span className="block text-[10px] text-bawor-teallt/80 font-body tracking-wide uppercase">BPS Kab. Banyumas</span>
      </div>
    </a>
    <ul className="hidden md:flex items-center gap-8">
      <li><a href="/#beranda" className="nav-link">Beranda</a></li>
      <li><a href="/#statistik" className="nav-link">Statistik</a></li>
      <li><a href="/#fitur" className="nav-link">Fitur</a></li>
      <li><a href="/#cara-kerja" className="nav-link">Cara Kerja</a></li>
      <li><span className="nav-link active">Settings</span></li>
    </ul>
    <div className="flex items-center gap-3">
      <button id="themeToggleBtn" className="theme-toggle-btn" aria-label="Ganti Mode Tampilan" title="Ganti Mode Tampilan"></button>
      <a href="/login" className="hidden sm:block nav-link text-sm px-1">Masuk</a>
      <a href="/login#daftar" className="btn-primary text-sm px-5 py-2.5">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        Daftar
      </a>
      <button id="menuBtn" className="md:hidden p-2 rounded-lg glass" aria-label="Menu">
        <svg className="w-5 h-5 text-bawor-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
  <div id="mobileMenu" className="hidden md:hidden px-6 pb-4 pt-2 border-t border-white/5">
    <ul className="flex flex-col gap-3">
      <li><a href="/#beranda" className="nav-link block">Beranda</a></li>
      <li><a href="/#fitur" className="nav-link block">Fitur</a></li>
      <li><a href="/#statistik" className="nav-link block">Statistik</a></li>
      <li><a href="/#cara-kerja" className="nav-link block">Cara Kerja</a></li>
      <li><span className="nav-link block text-bawor-teallt">Settings</span></li>
      <li><a href="/login" className="nav-link block">Masuk</a></li>
    </ul>
  </div>
</nav>


<main className="s-page" style={{paddingTop: '88px'}}>
  <header className="s-header">
    <button className="s-back" id="backBtn" aria-label="Kembali"><i className="fas fa-arrow-left"></i></button>
    <h1>Settings</h1>
  </header>

  <section className="s-section">
    <div className="s-section-title"><i className="fas fa-globe"></i> Language</div>
    <div className="s-card">
      <div className="s-lang-row">
        <div className="s-lang-label">
          Interface Language
          <span>Bahasa tampilan & hasil analisis AI</span>
        </div>
        <select className="s-lang-select" id="langSelect" aria-label="Pilih bahasa">
          <option value="en">English</option>
          <option value="id" selected>Bahasa Indonesia</option>
        </select>
      </div>
    </div>
  </section>

  <section className="s-section">
    <div className="s-section-title"><i className="fas fa-key"></i> API Key Settings</div>
    <div className="s-card">
      <div className="s-option-cards">

        
        <div className="s-option-card teal selected" id="optServer" role="radio" aria-checked="true" tabIndex="0">
          <div className="s-option-header">
            <div className="s-option-title">Quick Start - Server Key</div>
            <span className="s-option-badge">Default</span>
            <div className="s-option-radio"></div>
          </div>
          <div className="s-option-desc">Gunakan shared key dari server. Cepat mulai tanpa konfigurasi, tapi ada batas penggunaan bersama.</div>
        </div>

        <div className="s-option-card gold" id="optOwn" role="radio" aria-checked="false" tabIndex="0">
          <div className="s-option-header">
            <div className="s-option-title">Optimal - Your Own API Key</div>
            <span className="s-option-badge">Recommended</span>
            <div className="s-option-radio"></div>
          </div>
          <div className="s-option-desc">Paste Gemini API key milikmu dari AI Studio. Limit kuota sendiri, performa lebih stabil.</div>
        </div>

      </div>

      <div className="s-divider"></div>

      <div id="keyInputArea" style={{display: 'none'}}>
        <label style={{fontSize: '11px', color: 'rgba(245,240,232,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px'}}>Your Gemini API Key</label>
        <div className="s-key-wrap">
          <input type="password" className="s-key-input" id="keyInput" placeholder="PASTE_YOUR_GEMINI_KEY_HERE" autoComplete="off" aria-label="Masukkan Gemini API Key"/>
          <button className="s-key-toggle" id="keyToggle" aria-label="Tampilkan/sembunyikan key"><i className="fas fa-eye"></i></button>
        </div>
        <div className="s-key-status inactive" id="keyStatus"><i className="fas fa-circle"></i><span>Belum ada key tersimpan</span></div>
        <div className="s-btn-row">
          <button className="s-btn s-btn-primary" id="btnSave"><i className="fas fa-check"></i> Save</button>
          <button className="s-btn s-btn-outline" id="btnTest"><i className="fas fa-flask"></i> Test</button>
          <button className="s-btn s-btn-danger" id="btnClear"><i className="fas fa-xmark"></i> Clear</button>
        </div>
        <div style={{marginTop: '12px'}}>
          <button className="s-btn s-btn-primary" id="btnUseKey" style={{width: '100%', justifyContent: 'center'}}><i className="fas fa-check-circle"></i> Gunakan API Key Ini</button>
        </div>
        <div className="s-divider"></div>
      </div>

      <div style={{marginBottom: '16px'}}>
        <button className="s-guide-toggle" id="guideToggle" aria-expanded="false">
          <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><i className="fas fa-book-open"></i> Cara Mendapatkan Gemini API Key Gratis</span>
          <i className="fas fa-chevron-down guide-chev"></i>
        </button>
        <div className="s-guide-body" id="guideBody">
          <ol>
            <li><strong>Buka Google AI Studio</strong><br/>Kunjungi <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">aistudio.google.com</a></li>
            <li><strong>Login dengan akun Google</strong><br/>Gunakan akun Google yang sudah ada</li>
            <li><strong>Klik "Get API Key"</strong><br/>Ada di sidebar atau menu utama</li>
            <li><strong>Pilih atau buat project baru</strong><br/>Untuk tracking penggunaan</li>
            <li><strong>Copy API Key</strong><br/>Format: <code>AIza...</code></li>
            <li><strong>Paste di form, lalu Save & Test</strong></li>
          </ol>
          <div className="s-guide-tip"><strong>Tips:</strong> Free tier Gemini API punya quota generous, reset harian.</div>
        </div>
      </div>

      <div className="s-security">
        <i className="fas fa-shield-halved"></i>
        <div>
          <p><strong>Catatan Keamanan:</strong></p>
          <ul style={{margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '11px', color: 'rgba(245,240,232,0.35)', lineHeight: '1.6'}}>
            <li>API key disimpan <strong>lokal di browser</strong> (localStorage)</li>
            <li>Tidak ada seorang pun yang bisa melihat key kamu</li>
            <li><strong>Jangan bagikan</strong> API key ke siapapun</li>
            <li>Jika key tercemar, langsung <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">revoke</a> di Google AI Studio</li>
            <li>Server key dilindungi rate limiting dan monitoring 24/7</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section className="s-section">
    <div className="s-section-title"><i className="fas fa-comment-dots"></i> Share Feedback</div>
    <div className="s-card">
      <div className="s-feedback-row">
        <div className="s-feedback-text">Found a bug or have a suggestion?<span>Bantu kami meningkatkan pengalaman kamu</span></div>
        <button className="s-feedback-btn" id="btnFeedback"><i className="fas fa-paper-plane"></i> Send</button>
      </div>
    </div>
  </section>
</main>


</div>
    </div>
  )
}

