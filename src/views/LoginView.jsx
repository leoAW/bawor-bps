export default function LoginView({ rootRef }) {
  return (
    <div ref={rootRef} style={{ display: 'contents' }}>
<div>

<div className="toast-container" id="toastContainer"></div>


<nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
  <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-14">
    <a href="/" className="flex items-center gap-2.5 group">
      <div className="w-8 h-8 rounded-lg overflow-hidden">
        <img src="/assets/images/Bawor-Logo.png" alt="BAWOR Logo" className="w-full h-full object-cover" />
      </div>
      <div className="leading-tight">
        <span className="font-display font-600 text-bawor-cream text-base tracking-tight">BAWOR</span>
        <span className="block text-[9px] text-bawor-teallt/70 font-body tracking-wide uppercase">BPS Kab. Banyumas</span>
      </div>
    </a>
    <div className="flex items-center">
      <button id="themeToggleBtn" className="theme-toggle-btn" aria-label="Ganti Mode Tampilan" title="Ganti Mode Tampilan"></button>
    </div>
  </div>
</nav>



<main className="min-h-screen flex items-center justify-center pt-16 px-4 py-6 relative z-10">

  <div className="w-full max-w-md animate-fade-up">
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden auth-card">

      
      <div className="flex items-center justify-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl overflow-hidden">
          <img src="/assets/images/Bawor-Logo.png" alt="BAWOR" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="font-display font-600 text-bawor-cream text-lg">BAWOR</span>
          <span className="block text-[9px] text-bawor-teallt/70 uppercase tracking-wide">BPS Kab. Banyumas</span>
        </div>
      </div>

      
      <div className="tab-bar mb-5" role="tablist">
        <button className="tab-btn active" id="tab-masuk" role="tab" aria-selected="true" data-tab="masuk">
          <svg className="w-3.5 h-3.5 inline mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
          Masuk
        </button>
        <button className="tab-btn" id="tab-daftar" role="tab" aria-selected="false" data-tab="daftar">
          <svg className="w-3.5 h-3.5 inline mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          Daftar
        </button>
      </div>

      
      <div className="tab-panel active" id="panel-masuk">
        <div id="login-alert" className="hidden mb-3"></div>

        <form id="loginForm" novalidate>
          <div className="flex flex-col gap-4">

            <div>
              <label htmlFor="login-email" className="form-label">Alamat Email</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
                <input type="email" id="login-email" className="input-field" placeholder="nama@email.com" autoComplete="email" required/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="login-pw" className="form-label mb-0">Kata Sandi</label>
                <a href="#" className="text-[11px] text-bawor-teallt hover:text-bawor-cream transition-colors">Lupa sandi?</a>
              </div>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </span>
                <input type="password" id="login-pw" className="input-field" placeholder="Kata sandi Anda" autoComplete="current-password" required/>
                <button type="button" className="toggle-pw" aria-label="Tampilkan sandi">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input type="checkbox" className="custom-checkbox" id="remember"/>
              <span className="text-xs text-bawor-cream/50">Ingat saya selama 30 hari</span>
            </label>

            <button type="submit" className="btn-primary" id="login-btn">
              <span id="login-btn-text">Masuk ke BAWOR</span>
              <div className="spinner hidden" id="login-spinner"></div>
            </button>
          </div>
        </form>

        <div className="divider-text my-4">atau</div>

        <button className="btn-ghost" data-action="google">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Masuk dengan Google
        </button>

        <div className="panel-footer flex flex-col items-center gap-2.5">
          <p className="text-xs text-bawor-cream/35">
            Belum punya akun?
            <button data-tab="daftar" className="text-bawor-teallt hover:text-bawor-cream transition-colors font-semibold ml-0.5">Daftar</button>
          </p>
          <div className="flex items-center gap-2 text-[11px] text-bawor-cream/25">
            <img src="/assets/images/Logo_BPS.png" alt="Logo BPS" className="w-5 h-5 rounded-full object-cover opacity-50" />
            <span>Data resmi dari <span className="text-bawor-cream/40 font-medium">BPS Kabupaten Banyumas</span> · Selalu diperbarui</span>
          </div>
        </div>
      </div>


      
      <div className="tab-panel" id="panel-daftar">
        <div id="register-alert" className="hidden mb-3"></div>

        <form id="registerForm" novalidate>
          <div className="flex flex-col gap-3 reg-form">

            
            <div>
              <label htmlFor="reg-name" className="form-label">Nama Lengkap</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </span>
                <input type="text" id="reg-name" className="input-field" placeholder="Nama lengkap Anda" autoComplete="name" required/>
              </div>
            </div>

            
            <div>
              <label htmlFor="reg-email" className="form-label">Alamat Email</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
                <input type="email" id="reg-email" className="input-field" placeholder="nama@email.com" autoComplete="email" required/>
              </div>
            </div>

            
            <div>
              <label htmlFor="reg-pw" className="form-label">Kata Sandi</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </span>
                <input type="password" id="reg-pw" className="input-field" placeholder="Min. 8 karakter" autoComplete="new-password" required/>
                <button type="button" className="toggle-pw" aria-label="Tampilkan sandi">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </button>
              </div>
              <div className="mt-1 flex flex-col gap-0.5">
                <div className="strength-bar">
                  <div className="strength-fill" id="strength-fill" style={{width: '0%', background: '#0E7C7B'}}></div>
                </div>
                <p className="text-[10px] text-bawor-cream/30" id="strength-label">Masukkan kata sandi</p>
              </div>
            </div>

            
            <div>
              <label htmlFor="reg-pw2" className="form-label">Konfirmasi Kata Sandi</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </span>
                <input type="password" id="reg-pw2" className="input-field" placeholder="Ulangi kata sandi" autoComplete="new-password" required/>
                <button type="button" className="toggle-pw" aria-label="Tampilkan sandi">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </button>
              </div>
            </div>

            
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input type="checkbox" className="custom-checkbox mt-0.5" id="reg-terms" required/>
              <span className="text-[11px] text-bawor-cream/45 leading-relaxed">
                Saya menyetujui <a href="#" className="text-bawor-teallt hover:text-bawor-cream transition-colors">Syarat & Ketentuan</a>
                serta <a href="#" className="text-bawor-teallt hover:text-bawor-cream transition-colors">Kebijakan Privasi</a> BAWOR.
              </span>
            </label>

            
            <button type="submit" className="btn-primary" id="reg-btn">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
              <span id="reg-btn-text">Buat Akun Gratis</span>
              <div className="spinner hidden" id="reg-spinner"></div>
            </button>
          </div>
        </form>

        <div className="divider-text my-4">atau</div>

        <button className="btn-ghost" data-action="google">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Daftar dengan Google
        </button>

        <div className="panel-footer flex flex-col items-center gap-2.5">
          <p className="text-xs text-bawor-cream/35">
            Sudah punya akun?
            <button data-tab="masuk" className="text-bawor-teallt hover:text-bawor-cream transition-colors font-semibold ml-0.5">Masuk</button>
          </p>
          <div className="flex items-center gap-2 text-[11px] text-bawor-cream/25">
            <img src="/assets/images/Logo_BPS.png" alt="Logo BPS" className="w-5 h-5 rounded-full object-cover opacity-50" />
            <span>Data resmi dari <span className="text-bawor-cream/40 font-medium">BPS Kabupaten Banyumas</span> · Selalu diperbarui</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</main>


<footer className="relative z-10 border-t border-white/5 py-4">
  <div className="max-w-7xl mx-auto px-5 text-center">
    <p className="text-[11px] text-bawor-cream/20">
      © 2026 BAWOR · BPS Kabupaten Banyumas
    </p>
  </div>
</footer>



</div>
    </div>
  )
}

