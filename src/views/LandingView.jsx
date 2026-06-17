export default function LandingView({ rootRef }) {
  return (
    <div ref={rootRef} style={{ display: 'contents' }}>
<div>


<nav className="fixed top-0 left-0 right-0 z-50 glass-dark" style={{borderBottom: '1px solid rgba(26,175,168,.12)'}}>
  <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">

    
    <a href="#" className="flex items-center gap-3 group">
      <img src="/assets/images/Bawor-Logo.png" alt="BAWOR Logo" className="h-9 w-auto" />
      <div className="leading-tight">
        <span className="font-display font-600 text-bawor-cream text-lg tracking-tight">BAWOR</span>
        <span className="block text-[10px] text-bawor-teallt/80 font-body tracking-wide uppercase">BPS Kab. Banyumas</span>
      </div>
    </a>

    
    <ul className="hidden md:flex items-center gap-8">
      <li><a href="#beranda" className="nav-link">Beranda</a></li>
      <li><a href="#statistik" className="nav-link">Statistik</a></li>
      <li><a href="#fitur" className="nav-link">Fitur</a></li>
      <li><a href="#cara-kerja" className="nav-link">Cara Kerja</a></li>
      <li><a href="/settings" className="nav-link">Settings</a></li>
    </ul>

    
    <div className="flex items-center gap-3">
      
      <button id="themeToggleBtn" className="theme-toggle-btn" aria-label="Ganti Mode Tampilan" title="Ganti Mode Tampilan">
        
      </button>
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
      <li><a href="#beranda" className="nav-link block">Beranda</a></li>
      <li><a href="#fitur" className="nav-link block">Fitur</a></li>
      <li><a href="#statistik" className="nav-link block">Statistik</a></li>
      <li><a href="#cara-kerja" className="nav-link block">Cara Kerja</a></li>
      <li><a href="/settings" className="nav-link block">Settings</a></li>
      <li><a href="/login" className="nav-link block">Masuk</a></li>
    </ul>
  </div>
</nav>



<section id="beranda" className="hero-bg relative min-h-screen flex items-center pt-16">

  
  <div className="absolute top-24 right-12 w-72 h-72 rounded-full bg-bawor-teal/10 blur-3xl pointer-events-none"></div>
  <div className="absolute bottom-20 left-8  w-96 h-96 rounded-full bg-bawor-teallt/8 blur-3xl pointer-events-none"></div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-bawor-navy/40 blur-3xl pointer-events-none"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-20 lg:py-0">
    <div className="grid lg:grid-cols-2 gap-14 lg:gap-8 items-center min-h-[calc(100vh-4rem)]">

      
      <div className="flex flex-col justify-center">

        
        <h1 className="animate-fade-up delay-200 font-display font-600 leading-[1.08] mb-6">
          <span className="block text-5xl lg:text-6xl xl:text-7xl text-white">Halo,</span>
          <span className="block text-5xl lg:text-6xl xl:text-7xl italic text-white">Selamat Datang</span>
          <span className="block text-5xl lg:text-6xl xl:text-7xl text-white">di <span className="text-bawor-teallt">Bawor</span>!👋</span>
        </h1>

        
        <p className="animate-fade-up delay-300 text-bawor-cream/65 text-base lg:text-lg leading-relaxed max-w-md mb-10 font-light">
          Bawor merupakan asisten virtual BPS Kabupaten Banyumas yang dirancang untuk menjawab rasa ingin tahu Anda terhadap data Banyumas secara efisien
        </p>

        
        <div className="animate-fade-up delay-400 flex flex-wrap gap-4 mb-12">
          <button data-action="goToApp" className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            Mulai Bertanya Sekarang
          </button>
        </div>

        
        <div className="animate-fade-up delay-500 flex items-center gap-4 text-sm text-bawor-cream/40">
          <img src="/assets/images/Logo_BPS.png" alt="Logo BPS" className="w-12 h-12 rounded-full object-cover" />
          <span>Data resmi dari <span className="text-bawor-cream/70 font-medium">BPS Kabupaten Banyumas</span> · Selalu diperbarui</span>
        </div>
      </div>

          
      <div className="absolute top-2 right-[-2rem] lg:right-[-4rem] z-10 animate-fade-up delay-300 animate-float">
        <img src="/assets/images/logofull.png" alt="BAWOR" className="w-72 sm:w-80 lg:w-[28rem] xl:w-[32rem] object-contain opacity-90 drop-shadow-2xl" />
      </div>

  
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-fade-in delay-600">
    <span className="text-xs text-bawor-cream/30 tracking-widest uppercase">Gulir ke bawah</span>
    <svg className="w-4 h-4 text-bawor-teallt animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
  </div>
</div></div></section>



<section className="py-16 border-y border-white/5" style={{background: 'rgba(14,124,123,0.06)'}}>
  <div className="max-w-4xl mx-auto px-6 lg:px-10 flex flex-col items-center gap-12">

    
    <div className="animate-fade-up delay-200 animate-float w-full max-w-md">
      <div className="glass-dark rounded-2xl overflow-hidden shadow-2xl">

        
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <img src="/assets/images/Bawor-Logo.png" alt="BAWOR" className="w-8 h-8 object-contain" />
            <div>
              <p className="text-sm font-semibold text-bawor-cream">BAWOR Assistant</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow"></span>
                <span className="text-[11px] text-emerald-400">Online</span>
              </div>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/60"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400/60"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400/60"></span>
          </div>
        </div>

        
        <div className="p-5 space-y-4 min-h-[280px]">

          
          <div className="flex justify-end">
            <div className="chat-bubble-user text-white text-sm px-4 py-2.5 max-w-[80%] leading-relaxed">
              Berapa jumlah penduduk Banyumas tahun 2024?
            </div>
          </div>

          
          <div className="flex gap-2.5 items-end">
            <img src="/assets/images/Bawor-Logo.png" alt="BAWOR" className="w-7 h-7 object-contain flex-shrink-0" />
            <div className="chat-bubble-bot text-bawor-cream/90 text-sm px-4 py-3 max-w-[80%] leading-relaxed">
              Berdasarkan data BPS, jumlah penduduk Kabupaten Banyumas pada tahun 2024 adalah <span className="text-bawor-teallt font-semibold">1.823.452 jiwa</span>, dengan kepadatan 1.038 jiwa/km².
            </div>
          </div>

          
          <div className="flex justify-end">
            <div className="chat-bubble-user text-white text-sm px-4 py-2.5 max-w-[80%] leading-relaxed">
              Bagaimana tren kemiskinannya?
            </div>
          </div>

          
          <div className="flex gap-2.5 items-end">
            <img src="/assets/images/Bawor-Logo.png" alt="BAWOR" className="w-7 h-7 object-contain flex-shrink-0" />
            <div className="chat-bubble-bot px-4 py-3">
              <div className="flex gap-1.5 items-center">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
            <input type="text" placeholder="Tanya sesuatu tentang data Banyumas…" className="flex-1 bg-transparent text-sm text-bawor-cream placeholder-bawor-cream/30 outline-none" />
            <button className="btn-primary text-xs px-3 py-1.5 rounded-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>
      </div>

      
      <div className="flex gap-3 mt-4 justify-center flex-wrap">
        <div className="glass rounded-full px-4 py-1.5 text-xs text-bawor-cream/70 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-bawor-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>
          Respons Instan
        </div>
      </div>
    </div>

    
    <div id="statistik" className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div className="stat-card p-6 text-center">
        <p className="font-display text-4xl font-600 text-bawor-teallt mb-1">1,8 Jt</p>
        <p className="text-sm text-bawor-cream/55">Jiwa Penduduk</p>
      </div>
      <div className="stat-card p-6 text-center">
        <p className="font-display text-4xl font-600 text-bawor-gold mb-1">50+</p>
        <p className="text-sm text-bawor-cream/55">Indikator Tersedia</p>
      </div>
      <div className="stat-card p-6 text-center col-span-2 lg:col-span-1">
        <p className="font-display text-4xl font-600 text-bawor-teallt mb-1">27</p>
        <p className="text-sm text-bawor-cream/55">Kecamatan Tercakup</p>
      </div>
    </div>

  </div>
</section>


<section className="py-24 lg:py-32 border-t border-white/5">
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    
    <div className="text-center mb-16 lg:mb-20">
      <h2 className="font-display font-600 text-4xl lg:text-5xl text-bawor-cream leading-tight mb-4">
        Filosofi Logo BAWOR
      </h2>
      <p className="text-bawor-cream/55 text-base lg:text-lg max-w-xl mx-auto">
        Setiap elemen pada logo dipilih dengan penuh makna perpaduan budaya Banyumas dan teknologi modern.
      </p>
    </div>

    
    <div className="hidden lg:flex justify-center mb-20">
      <div className="relative" style={{width: '600px'}}>
        <img src="/assets/images/logofull.png" alt="Logo BAWOR" className="w-full" style={{filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'}} />

        
        <div className="anno-dot" style={{top: '13%', right: '33%', background: '#1AAFA8', boxShadow: '0 0 0 4px rgba(26,175,168,0.25)'}}></div>
        <div className="anno-dot" style={{top: '41%', left: '26%', background: '#E8A923', boxShadow: '0 0 0 4px rgba(232,169,35,0.25)'}}></div>
        <div className="anno-dot" style={{top: '71%', right: '29%', background: '#1AAFA8', boxShadow: '0 0 0 4px rgba(26,175,168,0.25)'}}></div>

        
        <div className="absolute" style={{top: '32%', left: '-310px', width: '275px'}}>
          <div className="anno-arrow" style={{right: '-40px', left: 'auto', borderRight: '6px solid rgba(232,169,35,0.4)'}}></div>
          <div className="anno-line" style={{right: '-36px', left: 'auto', background: 'rgba(232,169,35,0.3)'}}></div>
          <div className="glass-dark rounded-xl p-5" style={{borderRight: '3px solid #E8A923'}}>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-bawor-gold"></div>
              <h4 className="font-semibold text-bawor-cream text-sm">Beskap</h4>
            </div>
            <p className="text-xs text-bawor-cream/50 leading-relaxed">Pakaian formal tradisional Jawa yang merepresentasikan kesopanan dan profesionalisme layanan.</p>
          </div>
        </div>

        
        <div className="absolute" style={{top: '2%', right: '-310px', width: '275px'}}>
          <div className="anno-arrow" style={{borderRight: '6px solid rgba(26,175,168,0.4)'}}></div>
          <div className="anno-line" style={{background: 'rgba(26,175,168,0.3)'}}></div>
          <div className="glass-dark rounded-xl p-5" style={{borderLeft: '3px solid #1AAFA8'}}>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-bawor-teallt"></div>
              <h4 className="font-semibold text-bawor-cream text-sm">Blangkon</h4>
            </div>
            <p className="text-xs text-bawor-cream/50 leading-relaxed">Tutup kepala khas Jawa yang melambangkan kearifan lokal, sopan santun, dan identitas budaya Banyumas.</p>
          </div>
        </div>

        
        <div className="absolute" style={{top: '63%', right: '-310px', width: '275px'}}>
          <div className="anno-arrow" style={{borderRight: '6px solid rgba(26,175,168,0.4)'}}></div>
          <div className="anno-line" style={{background: 'rgba(26,175,168,0.3)'}}></div>
          <div className="glass-dark rounded-xl p-5" style={{borderLeft: '3px solid #1AAFA8'}}>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-bawor-teallt"></div>
              <h4 className="font-semibold text-bawor-cream text-sm">Batik Kantil</h4>
            </div>
            <p className="text-xs text-bawor-cream/50 leading-relaxed">Motif batik khas Banyumas yang menggambarkan warisan budaya lokal yang terus dilestarikan.</p>
          </div>
        </div>

      </div>
    </div>

    
    <div className="lg:hidden flex justify-center mb-12">
      <img src="/assets/images/logofull.png" alt="Logo BAWOR" className="w-64" style={{filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.3))'}} />
    </div>

    </div>
</section>



<section id="fitur" className="py-24 lg:py-32">
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    
    <div className="text-center mb-16 lg:mb-20">
      <h2 className="font-display font-600 text-4xl lg:text-5xl text-bawor-cream leading-tight">
        Keunggulan Bawor
      </h2>
    </div>

    
    <div className="grid md:grid-cols-3 gap-6">

      
      <div className="stat-card p-7 flex flex-col gap-4">
        <div className="icon-ring">
          <svg className="w-6 h-6 text-bawor-teallt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z"/></svg>
        </div>
        <div>
          <h3 className="font-semibold text-bawor-cream text-base mb-1.5">Analisis Statistik Deskriptif</h3>
          <p className="text-sm text-bawor-cream/55 leading-relaxed text-justify">Setiap jawaban disertai perhitungan statistik dasar seperti rata-rata, median, nilai minimum-maksimum, dan standar deviasi. Data mentah langsung diolah menjadi informasi ringkas yang siap digunakan.</p>
        </div>
      </div>

      
      <div className="stat-card p-7 flex flex-col gap-4">
        <div className="icon-ring">
          <svg className="w-6 h-6 text-bawor-teallt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <div>
          <h3 className="font-semibold text-bawor-cream text-base mb-1.5">Sumber Data Resmi dan Terverifikasi</h3>
          <p className="text-sm text-bawor-cream/55 leading-relaxed text-justify">Seluruh informasi berasal dari basis data Badan Pusat Statistik Kabupaten Banyumas. Akurasi dan kredibilitas data terjamin, tidak seperti chatbot umum yang rentan memberikan informasi tidak valid.</p>
        </div>
      </div>

      
      <div className="stat-card p-7 flex flex-col gap-4">
        <div className="icon-ring">
          <svg className="w-6 h-6 text-bawor-teallt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div>
          <h3 className="font-semibold text-bawor-cream text-base mb-1.5">Adanya Visualisasi Data</h3>
          <p className="text-sm text-bawor-cream/55 leading-relaxed text-justify">Hasil analisis tidak hanya berupa teks. BAWOR menyajikan grafik batang, garis, atau diagram lingkaran langsung di ruang obrolan. Pengguna dapat melihat tren dan pola data Banyumas secara visual tanpa perlu mengunduh atau mengolah data secara manual.</p>
        </div>
      </div>

    </div>
  </div>
</section>



<section id="cara-kerja" className="py-24 lg:py-32 border-t border-white/5" style={{background: 'rgba(14,124,123,0.04)'}}>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    <div className="text-center mb-16">
      <span className="font-display font-600 text-4xl lg:text-5xl text-bawor-cream leading-tight">Mekanisme Kerja</span>
    </div>

    <div className="grid md:grid-cols-3 gap-8 relative">
      
      <div className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px" style={{background: 'linear-gradient(90deg,rgba(26,175,168,.5),rgba(26,175,168,.15),rgba(26,175,168,.5))'}}></div>

      
      <div className="text-center flex flex-col items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-display font-600 text-bawor-cream step-box-teal">01</div>
        </div>
        <div>
          <h3 className="font-semibold text-bawor-cream text-base mb-2">Registrasi Akun</h3>
          <p className="text-sm text-bawor-cream/55 leading-relaxed max-w-xs mx-auto">Pengguna membuat akun menggunakan email yang valid.</p>
        </div>
      </div>

      
      <div className="text-center flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-display font-600 text-bawor-navy" style={{background: 'linear-gradient(135deg,#E8A923,#f0c040)', boxShadow: '0 12px 32px rgba(232,169,35,.35)'}}>02</div>
        <div>
          <h3 className="font-semibold text-bawor-cream text-base mb-2">Ajukan Pertanyaan</h3>
          <p className="text-sm text-bawor-cream/55 leading-relaxed max-w-xs mx-auto">Pengguna menyampaikan pertanyaan seputar data statistik Kabupaten Banyumas.</p>
        </div>
      </div>

      
      <div className="text-center flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-display font-600 text-bawor-cream step-box-teal">03</div>
        <div>
          <h3 className="font-semibold text-bawor-cream text-base mb-2">Hasil</h3>
          <p className="text-sm text-bawor-cream/55 leading-relaxed max-w-xs mx-auto">Bawor menyajikan jawaban efisien disertai data akurat, sumber resmi, dan visualisasi yang mudah dipahami.</p>
        </div>
      </div>
    </div>
  </div>
</section>



<footer className="border-t border-white/8 py-10">
  <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">

    
    <div className="flex items-center gap-3">
      <img src="/assets/images/Bawor-Logo.png" alt="BAWOR" className="w-8 h-8 object-contain" />
      <div>
        <span className="font-display font-600 text-bawor-cream text-sm">BAWOR</span>
        <span className="block text-[10px] text-bawor-cream/35 uppercase tracking-wide">BPS Kabupaten Banyumas</span>
      </div>
    </div>

    
    <p className="text-xs text-bawor-cream/30 text-center">
      © 2026 BAWOR · BPS Kabupaten Banyumas
    </p>

    
    <div className="flex items-center gap-2">
      <img src="/assets/images/Logo_BPS.png" alt="Logo BPS" className="w-12 h-12 rounded-full object-cover opacity -95" />
      <span className="text-xs text-bawor-cream/30">Data resmi BPS</span>
    </div>
  </div>
</footer>




</div>
    </div>
  )
}

