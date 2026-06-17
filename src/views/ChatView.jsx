export default function ChatView({ rootRef }) {
  return (
    <div ref={rootRef} style={{ display: 'contents' }}>


<div className="app-shell">

  
  <aside className="sidebar" id="sidebar">
    <div className="sidebar-header">
      <button className="sidebar-close" data-action="closeSidebar" title="Tutup menu">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px', paddingRight: '32px'}}>
        <img src="/assets/images/Bawor-Logo.png" alt="Logo Bawor" className="w-8 h-8 object-cover flex-shrink-0" />
        <div className="leading-tight overflow-hidden min-w-0">
          <span className="font-display font-semibold text-bawor-cream text-base tracking-tight">BAWOR</span>
          <span className="block text-[9px] text-bawor-teallt/70 uppercase tracking-wide">BPS Kab. Banyumas</span>
        </div>
      </a>
      <button className="new-chat-btn" data-action="newChat">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Chat Baru
      </button>
    </div>

    <div className="sidebar-scroll">
      <div className="nav-item active" data-action="setNav">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        Chat
      </div>
      <div className="mt-4 mb-2 pl-3 text-[10px] text-bawor-teallt/50 font-semibold uppercase tracking-wider">RIWAYAT CHAT</div>
      <div id="chatHistoryList" className="flex flex-col gap-1 px-2"></div>
    </div>

    <div className="sidebar-footer">
      <div className="user-profile">
        <div className="avatar"><span id="userInitial">U</span></div>
        <div style={{flex: 1, overflow: 'hidden'}}>
          <p id="userName" style={{fontSize: '.8rem', fontWeight: 600, color: '#F5F0E8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Pengguna</p>
          <p style={{fontSize: '.7rem', color: 'rgba(245,240,232,.4)'}}>BPS Banyumas</p>
        </div>
        <button data-action="logout" title="Keluar" style={{background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,.35)', padding: '4px', borderRadius: '6px', transition: 'color .2s'}} onMouseOver={(e) => e.currentTarget.style.color='#ef4444'} onMouseOut={(e) => e.currentTarget.style.color='rgba(245,240,232,.35)'}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{pointerEvents: 'none'}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
        </button>
      </div>
    </div>
  </aside>

  <div className="sidebar-overlay" id="sidebarOverlay"></div>

  
  <main className="main-area chat-bg grain">

    
    <div className="topbar">
      <button className="logo-toggle-btn" data-action="toggleSidebar" title="Buka menu">
        <img src="/assets/images/Bawor-Logo.png" alt="BAWOR" className="w-8 h-8 object-cover" />
      </button>

      
      <div></div>

      
      <div className="topbar-actions">
        <button className="topbar-new-chat-btn" data-action="newChat" aria-label="Mulai chat baru" title="Chat Baru">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
        </button>
        <button id="themeToggleBtn" data-action="toggleTheme" className="theme-toggle-btn" aria-label="Ganti Mode Tampilan" title="Ganti Mode Tampilan">
        </button>
      </div>
    </div>

    
    <div className="messages-area" id="messagesArea" style={{display: 'none'}}></div>

    
    <div className="welcome-screen" id="welcomeScreen">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none" style={{background: 'radial-gradient(circle,rgba(14,124,123,0.15),transparent)', filter: 'blur(40px)'}}></div>
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full pointer-events-none" style={{background: 'radial-gradient(circle,rgba(232,169,35,0.08),transparent)', filter: 'blur(40px)'}}></div>
      <div className="relative text-center max-w-2xl mx-auto w-full">
        
        
        <img src="/assets/images/Bawor-Logo.png" className="fade-up delay-1 w-16 h-16 mx-auto mb-6 object-cover" alt="BAWOR Logo" />
        

        <h1 className="fade-up delay-2 font-display text-3xl lg:text-4xl text-bawor-cream mb-3 leading-tight">
          Hi, <span id="welcomeUserName" style={{color: '#1AAFA8'}}>Pengguna</span>
        </h1>
        <p className="fade-up delay-3 text-sm" style={{color: 'rgba(245,240,232,0.45)'}}>
          Data apa yang ingin kamu cari hari ini?
        </p>
      </div>
    </div>

    
    <div className="input-bar-wrap">
      <div className="input-bar" id="inputBar">
        <textarea id="chatInput" rows="1" placeholder="Tanya sesuatu tentang data Banyumas…"></textarea>
        <div className="input-actions">

          
          <div className="model-pick" id="modelPick">
            <button className="model-pick-btn" data-action="toggleModelPick" title="Pilih model">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span id="modelPickLabel">2.5 Flash</span>
              <svg className="chevron" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div className="model-pick-dropdown">
              <div className="model-pick-option selected" data-action="selectModel" data-label="2.5 Flash" data-value="gemini-2.5-flash">
                <div className="model-pick-option-left">
                  <span>Gemini 2.5 Flash</span>
                  <small>Cepat, efisien, multitask</small>
                </div>
                <div className="model-pick-option-right">
                  <div className="gemini-dot"></div>
                  <svg className="model-pick-check" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
              <div className="model-pick-option" data-action="selectModel" data-label="2.5 Pro" data-value="gemini-2.5-pro">
                <div className="model-pick-option-left">
                  <span>Gemini 2.5 Pro</span>
                  <small>Paling cerdas, analisis mendalam</small>
                </div>
                <div className="model-pick-option-right">
                  <div className="gemini-dot"></div>
                  <svg className="model-pick-check" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
              <div className="model-pick-option" data-action="selectModel" data-label="2.0 Flash" data-value="gemini-2.0-flash">
                <div className="model-pick-option-left">
                  <span>Gemini 2.0 Flash</span>
                  <small>Stabil, respons singkat</small>
                </div>
                <div className="model-pick-option-right">
                  <div className="gemini-dot"></div>
                  <svg className="model-pick-check" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
              <div className="model-pick-option" data-action="selectModel" data-label="1.5 Flash" data-value="gemini-1.5-flash">
                <div className="model-pick-option-left">
                  <span>Gemini 1.5 Flash</span>
                  <small>Ringan, konteks panjang</small>
                </div>
                <div className="model-pick-option-right">
                  <div className="gemini-dot"></div>
                  <svg className="model-pick-check" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
            </div>
          </div>

          
          <button className="icon-btn" title="Alat bantu">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
            </svg>
          </button>

          
          <button className="send-btn" id="sendBtn" data-action="sendMessage" disabled>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </div>
      </div>
      <p className="input-hint">BAWOR menggunakan data resmi BPS Kabupaten Banyumas · Selalu verifikasi data penting</p>
    </div>

    {/* Custom Modal */}
    <div id="customModalOverlay" style={{display: 'none', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s'}}>
      <div id="customModalBox" style={{background: 'var(--bg-chat, #111e21)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', transform: 'translateY(20px)', transition: 'transform 0.2s'}}>
        <h3 id="customModalTitle" style={{color: '#F5F0E8', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600}}>Judul</h3>
        <p id="customModalText" style={{color: 'rgba(245,240,232,0.7)', fontSize: '0.9rem', marginBottom: '20px', display: 'none'}}>Deskripsi</p>
        <input type="text" id="customModalInput" style={{display: 'none', width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F0E8', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', outline: 'none', fontFamily: 'inherit'}} placeholder="Ketik sesuatu..." autoComplete="off" />
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
          <button id="customModalCancelBtn" style={{padding: '8px 16px', background: 'transparent', border: 'none', color: 'rgba(245,240,232,0.6)', cursor: 'pointer', fontWeight: 500, transition: 'color 0.2s'}} onMouseOver={(e) => e.target.style.color='#F5F0E8'} onMouseOut={(e) => e.target.style.color='rgba(245,240,232,0.6)'}>Batal</button>
          <button id="customModalOkBtn" style={{padding: '8px 16px', background: '#1AAFA8', border: 'none', color: '#111e21', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s'}} onMouseOver={(e) => e.target.style.background='#169c95'} onMouseOut={(e) => e.target.style.background='#1AAFA8'}>OK</button>
        </div>
      </div>
    </div>

  </main>
</div>



    </div>
  )
}
