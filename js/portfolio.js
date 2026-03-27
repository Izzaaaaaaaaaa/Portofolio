// =============================================
// portfolio.js — Fetch data.json, render cards,
//                filter by category, modal view
// =============================================

const STATIC_ITEMS = [
  {
    id: 'uiux-1',
    category: 'uiux',
    title: 'FUNK Paint E-commerce',
    subtitle: 'UI/UX Design Project',
    type: 'mockup'
  },
  {
    id: 'uiux-2',
    category: 'uiux',
    title: 'Peken Banyumas UMKM',
    subtitle: 'UI/UX Design Project',
    type: 'peken'
  },
  {
    id: 'uiux-3',
    category: 'uiux',
    title: 'Panti Wredha Budhi Dharma Kasih',
    subtitle: 'UI/UX Design Project',
    type: 'panti'
  },
  {
    id: 'uiux-4',
    category: 'uiux',
    title: 'Cuantelligent',
    subtitle: 'UI/UX Design Project',
    type: 'cuan'
  },
  {
    id: 'uiux-5',
    category: 'uiux',
    title: 'Trash to Points',
    subtitle: 'UI/UX Design Project',
    type: 'trash'
  },
  {
    id: 'webdev-1',
    category: 'webdev',
    title: 'E-commerce Website',
    subtitle: 'Web Development Project',
    type: 'placeholder',
    icon: 'fa-solid fa-code'
  },
  {
    id: 'webdev-2',
    category: 'webdev',
    title: 'Portfolio Website',
    subtitle: 'Web Development Project',
    type: 'placeholder',
    icon: 'fa-solid fa-laptop-code'
  }
];

// ---- Build card HTML ----
function buildCertCard(item) {
  return `
    <div class="portfolio-item fade-up" data-category="${item.category}">
      <div class="portfolio-card">
        <img src="${item.image}" alt="${item.alt}" loading="lazy" />
        <div class="portfolio-overlay">
          <h4>${item.title}</h4>
          <p>${item.subtitle}</p>
          <button class="view-btn" data-img="${item.image}" data-title="${item.title}">View</button>
        </div>
      </div>
    </div>`;
}

function buildMockupCard() {
  return `
    <div class="portfolio-item fade-up" data-category="uiux">
      <div class="portfolio-card">
        <div class="mockup-showcase">
          <div class="mockup-device">
            <div class="mockup-screen">
              <div class="mockup-header">
                <div class="mockup-logo">FUNK Point</div>
                <div class="mockup-nav">HOME SHOP WISHLIST</div>
              </div>
              <div class="mockup-content">
                <div class="mockup-hero">
                  <div class="mockup-text">
                    <h3>FUNK Point</h3>
                    <p>Fashion Collection</p>
                  </div>
                  <div class="mockup-image"></div>
                </div>
                <div class="mockup-products">
                  <div class="mockup-product"></div>
                  <div class="mockup-product"></div>
                  <div class="mockup-product"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="portfolio-overlay">
          <h4>FUNK Paint E-commerce</h4>
          <p>UI/UX Design Project</p>
          <button class="view-btn" data-type="funkpaint">View</button>
        </div>
      </div>
    </div>`;
}

function buildTrashCard() {
  return `
    <div class="portfolio-item fade-up" data-category="uiux">
      <div class="portfolio-card">
        <div class="trash-showcase">
          <div class="trash-phone">
            <div class="trash-status-bar">9:41</div>
            <div class="trash-header">
              <div class="trash-avatar"></div>
              <div class="trash-greeting">
                <div class="trash-name"></div>
                <div class="trash-level"></div>
              </div>
            </div>
            <div class="trash-stats">
              <div class="trash-stat-box">
                <div class="trash-stat-num">10</div>
                <div class="trash-stat-lbl">Poin</div>
              </div>
              <div class="trash-stat-box">
                <div class="trash-stat-num">2</div>
                <div class="trash-stat-lbl">Sampah</div>
              </div>
            </div>
            <div class="trash-mission">
              <div class="trash-mission-text"></div>
              <div class="trash-btn-mulai"></div>
            </div>
            <div class="trash-bottomnav">
              <span>🏠</span><span>🎯</span><span class="trash-qr">📷</span><span>🎁</span><span>📚</span>
            </div>
          </div>
        </div>
        <div class="portfolio-overlay">
          <h4>Trash to Points</h4>
          <p>UI/UX Design Project</p>
          <button class="view-btn" data-type="trash">View</button>
        </div>
      </div>
    </div>`;
}

function buildCuanCard() {
  return `
    <div class="portfolio-item fade-up" data-category="uiux">
      <div class="portfolio-card">
        <div class="cuan-showcase">
          <div class="cuan-screen">
            <div class="cuan-topbar">
              <div class="cuan-logo">Cuan<span>telligent</span></div>
              <div class="cuan-nav"><span></span><span></span><span></span></div>
            </div>
            <div class="cuan-body">
              <div class="cuan-sidebar">
                <div class="cuan-menu active"></div>
                <div class="cuan-menu"></div>
                <div class="cuan-menu"></div>
                <div class="cuan-robot">🤖</div>
              </div>
              <div class="cuan-main">
                <div class="cuan-stat-row">
                  <div class="cuan-stat teal"></div>
                  <div class="cuan-stat green"></div>
                  <div class="cuan-stat yellow"></div>
                </div>
                <div class="cuan-chart"></div>
                <div class="cuan-chat-bubble"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="portfolio-overlay">
          <h4>Cuantelligent</h4>
          <p>UI/UX Design Project</p>
          <button class="view-btn" data-type="cuan">View</button>
        </div>
      </div>
    </div>`;
}

function buildPantiCard() {
  return `
    <div class="portfolio-item fade-up" data-category="uiux">
      <div class="portfolio-card">
        <div class="panti-showcase">
          <div class="panti-screen">
            <div class="panti-topbar">
              <div class="panti-logo">BDK</div>
              <div class="panti-nav"><span></span><span></span><span></span></div>
            </div>
            <div class="panti-hero">
              <div class="panti-hero-text"></div>
              <div class="panti-hero-img"></div>
            </div>
            <div class="panti-cards-row">
              <div class="panti-mini-card blue"></div>
              <div class="panti-mini-card orange"></div>
              <div class="panti-mini-card green"></div>
            </div>
            <div class="panti-table">
              <div class="panti-row"></div>
              <div class="panti-row short"></div>
              <div class="panti-row"></div>
            </div>
          </div>
        </div>
        <div class="portfolio-overlay">
          <h4>Panti Wredha Budhi Dharma Kasih</h4>
          <p>UI/UX Design Project</p>
          <button class="view-btn" data-type="panti">View</button>
        </div>
      </div>
    </div>`;
}

function buildPekenCard() {
  return `
    <div class="portfolio-item fade-up" data-category="uiux">
      <div class="portfolio-card">
        <div class="peken-showcase">
          <div class="peken-screen">
            <div class="peken-topbar">
              <div class="peken-logo">Peken</div>
              <div class="peken-nav-dots"><span></span><span></span><span></span></div>
            </div>
            <div class="peken-sidebar">
              <div class="peken-menu-item active"></div>
              <div class="peken-menu-item"></div>
              <div class="peken-menu-item"></div>
              <div class="peken-menu-item"></div>
            </div>
            <div class="peken-main">
              <div class="peken-stat-row">
                <div class="peken-stat green"></div>
                <div class="peken-stat yellow"></div>
                <div class="peken-stat red"></div>
              </div>
              <div class="peken-chart"></div>
              <div class="peken-table-row"></div>
              <div class="peken-table-row short"></div>
            </div>
          </div>
        </div>
        <div class="portfolio-overlay">
          <h4>Peken Banyumas UMKM</h4>
          <p>UI/UX Design Project</p>
          <button class="view-btn" data-type="peken">View</button>
        </div>
      </div>
    </div>`;
}

function buildPlaceholderCard(item) {
  return `
    <div class="portfolio-item fade-up" data-category="${item.category}">
      <div class="portfolio-card">
        <div class="placeholder-project">
          <i class="${item.icon}"></i>
          <h4>${item.title}</h4>
          <p>${item.subtitle}</p>
        </div>
        <div class="portfolio-overlay">
          <h4>${item.title}</h4>
          <p>${item.subtitle}</p>
          <button class="view-btn" data-type="soon">View</button>
        </div>
      </div>
    </div>`;
}

// ---- Render all cards into grid ----
function renderGrid(certItems) {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  let html = certItems.map(buildCertCard).join('');

  STATIC_ITEMS.forEach(item => {
    if (item.type === 'mockup') html += buildMockupCard();
    else if (item.type === 'peken') html += buildPekenCard();
    else if (item.type === 'panti') html += buildPantiCard();
    else if (item.type === 'cuan') html += buildCuanCard();
    else if (item.type === 'trash') html += buildTrashCard();
    else html += buildPlaceholderCard(item);
  });

  grid.innerHTML = html;

  // Attach observer to new cards
  grid.querySelectorAll('.fade-up').forEach(el => {
    scrollObserver.observe(el);
  });

  // Attach filter + modal events
  attachFilterEvents();
  attachModalEvents();
}

// ---- Intersection Observer (shared with main.js via window) ----
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

// ---- Category filter ----
function attachFilterEvents() {
  const btns  = document.querySelectorAll('.category-btn');
  const items = document.querySelectorAll('.portfolio-item');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.category;
      items.forEach(item => {
        item.classList.toggle('hidden', cat !== 'all' && item.dataset.category !== cat);
      });
    });
  });
}

// ---- Modal ----
function openModal(html) {
  const modal   = document.getElementById('detailModal');
  const content = document.getElementById('detailContent');
  content.innerHTML = html;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
}

function closeDetail() {
  const modal = document.getElementById('detailModal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

function attachModalEvents() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type  = btn.dataset.type;
      const img   = btn.dataset.img;
      const title = btn.dataset.title;

      if (img) {
        openModal(`
          <h3 style="color:var(--accent-light);margin-bottom:12px">${title}</h3>
          <img src="${img}" alt="${title}" style="width:100%;max-width:500px;border-radius:10px;" />
        `);
      } else if (type === 'funkpaint') {
        openFunkPaintDetail();
      } else if (type === 'peken') {
        openPekenDetail();
      } else if (type === 'panti') {
        openPantiDetail();
      } else if (type === 'cuan') {
        openCuanDetail();
      } else if (type === 'trash') {
        openTrashDetail();
      } else {
        alert('Project details coming soon!');
      }
    });
  });
}

function openFunkPaintDetail() {
  openModal(`
    <div class="project-detail">
      <h2>FUNK Paint E-commerce</h2>
      <div class="project-info">
        <div class="project-description">
          <p>Platform e-commerce fashion dengan desain modern dan user-friendly.</p>
          <h3>Fitur:</h3>
          <ul>
            <li>Product catalog &amp; detail</li>
            <li>Shopping cart &amp; checkout</li>
            <li>Order tracking</li>
            <li>User authentication</li>
          </ul>
          <p><strong>Tools:</strong> Figma, UI/UX Design</p>
          <p><strong>Design Link:</strong>
            <a href="https://www.figma.com/design/FxJGhGN1TctneJyKXhluQN/PPL?node-id=885-1545&t=6fSdU8yGOqqrbQWp-1"
               target="_blank" style="color:var(--accent);text-decoration:underline">View on Figma</a>
          </p>
        </div>
        <div class="project-mockup">
          <div class="mockup-large">
            <div class="mockup-device-large">
              <div class="mockup-screen-large">
                <div class="mockup-header-large"><div class="mockup-logo-large">FUNK Paint</div></div>
                <div class="mockup-hero-large">
                  <div class="mockup-hero-text"><h3>FUNK Paint</h3><p>Fashion Collection</p></div>
                  <div class="mockup-hero-image"></div>
                </div>
                <div class="mockup-products-large">
                  <div class="mockup-product-large"></div>
                  <div class="mockup-product-large"></div>
                  <div class="mockup-product-large"></div>
                  <div class="mockup-product-large"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

function openTrashDetail() {
  openModal(`
    <div class="project-detail">
      <h2>Trash to Points — Gamified App</h2>
      <div class="project-info">
        <div class="project-description">
          <p>Aplikasi mobile gamifikasi yang mendorong pengguna untuk membuang sampah dengan benar, menyelesaikan misi lingkungan, dan menukarkan poin dengan hadiah nyata.</p>
          <h3>Fitur Utama:</h3>
          <ul>
            <li><i class="fa-solid fa-trash-can"></i> Kumpulkan sampah &amp; scan QR</li>
            <li><i class="fa-solid fa-bullseye"></i> Misi &amp; tantangan harian</li>
            <li><i class="fa-solid fa-coins"></i> Sistem poin &amp; reward</li>
            <li><i class="fa-solid fa-gamepad"></i> Mini games bertema lingkungan</li>
            <li><i class="fa-solid fa-book-open"></i> Edukasi pengelolaan sampah</li>
            <li><i class="fa-solid fa-newspaper"></i> Info &amp; berita terbaru</li>
          </ul>
          <p><strong>Tools:</strong> Figma, UI/UX Design</p>
          <p><strong>Type:</strong> Mobile App (Android/iOS)</p>
        </div>
        <div class="project-mockup">
          <div class="trash-detail-mockup">
            <div class="trash-detail-phone">
              <div class="trash-detail-statusbar">9:41</div>
              <div class="trash-detail-header">
                <div class="trash-detail-avatar"></div>
                <div>
                  <div class="trash-detail-name">Hai, Izzaty!!!</div>
                  <div class="trash-detail-lvl">🏅 Level</div>
                </div>
              </div>
              <div class="trash-detail-stats">
                <div class="trash-detail-stat">
                  <strong>10</strong>
                  <span>Poin Hari Ini</span>
                  <div class="trash-progress"></div>
                </div>
                <div class="trash-detail-stat">
                  <strong>2</strong>
                  <span>Sampah Dibuang</span>
                </div>
              </div>
              <div class="trash-detail-mission">
                <div class="trash-detail-mission-text">Dapatkan 45 poin</div>
                <div class="trash-detail-timer">02 : 23 : 04</div>
                <div class="trash-detail-mulai">Mulai</div>
              </div>
              <div class="trash-detail-section">Edukasi</div>
              <div class="trash-detail-edu"></div>
              <div class="trash-detail-bottomnav">
                <span>🏠</span><span>🎯</span><span class="active">📷</span><span>🎁</span><span>📚</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

function openCuanDetail() {
  openModal(`
    <div class="project-detail">
      <h2>Cuantelligent — Platform Monitoring UMKM</h2>
      <div class="project-info">
        <div class="project-description">
          <p>Platform cerdas untuk monitoring dan pengelolaan keuangan UMKM. Menggabungkan fitur pembukuan, analitik kesehatan usaha, dan AI chatbot dalam satu aplikasi.</p>
          <h3>Fitur Utama:</h3>
          <ul>
            <li><i class="fa-solid fa-book"></i> Buku kas digital</li>
            <li><i class="fa-solid fa-heart-pulse"></i> Monitoring kesehatan usaha</li>
            <li><i class="fa-solid fa-robot"></i> AI Chatbot asisten UMKM</li>
            <li><i class="fa-solid fa-chart-line"></i> Analitik &amp; laporan keuangan</li>
            <li><i class="fa-solid fa-handshake"></i> Koneksi UMKM &amp; investor</li>
          </ul>
          <p><strong>Tools:</strong> Figma, UI/UX Design</p>
          <p><strong>Design Link:</strong>
            <a href="https://www.figma.com/design/rlrPAIJmJnConuulTWrkYi/CuanTelligent?node-id=1-31791&t=WBmlaFTW21ha36qO-1"
               target="_blank" style="color:var(--accent);text-decoration:underline">View on Figma</a>
          </p>
        </div>
        <div class="project-mockup">
          <div class="cuan-detail-mockup">
            <div class="cuan-detail-screen">
              <div class="cuan-detail-topbar">
                <div class="cuan-detail-logo">Cuan<span>telligent</span></div>
              </div>
              <div class="cuan-detail-body">
                <div class="cuan-detail-sidebar">
                  <div class="cuan-detail-menu active">Dashboard</div>
                  <div class="cuan-detail-menu">Buku Kas</div>
                  <div class="cuan-detail-menu">Monitoring</div>
                  <div class="cuan-detail-menu">Chatbot</div>
                </div>
                <div class="cuan-detail-content">
                  <div class="cuan-detail-stats">
                    <div class="cuan-detail-stat teal">Kas<br/><strong>Masuk</strong></div>
                    <div class="cuan-detail-stat green">Kesehatan<br/><strong>Usaha</strong></div>
                    <div class="cuan-detail-stat yellow">Laba<br/><strong>Bersih</strong></div>
                  </div>
                  <div class="cuan-detail-chart"></div>
                  <div class="cuan-detail-chatbot">
                    <div class="cuan-bot-icon">🤖</div>
                    <div class="cuan-bot-bubble">Halo! Ada yang bisa saya bantu?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

function openPantiDetail() {
  openModal(`
    <div class="project-detail">
      <h2>Panti Wredha Budhi Dharma Kasih — Purbalingga</h2>
      <div class="project-info">
        <div class="project-description">
          <p>Sistem pendataan dan distribusi bantuan untuk Panti Wredha Budhi Dharma Kasih Purbalingga. Platform ini menghubungkan donatur dengan panti lansia secara transparan dan terorganisir.</p>
          <h3>Fitur Publik:</h3>
          <ul>
            <li><i class="fa-solid fa-house-heart"></i> Profil &amp; sejarah pendirian panti</li>
            <li><i class="fa-solid fa-hand-holding-dollar"></i> Forum donasi tunai</li>
            <li><i class="fa-solid fa-box-open"></i> Forum donasi barang</li>
          </ul>
          <h3>Fitur Admin:</h3>
          <ul>
            <li><i class="fa-solid fa-chart-bar"></i> Monitoring bantuan tunai &amp; barang</li>
            <li><i class="fa-solid fa-boxes-stacked"></i> Pemantauan stok barang</li>
            <li><i class="fa-solid fa-users"></i> Data penghuni panti</li>
            <li><i class="fa-solid fa-circle-check"></i> Verifikasi bantuan</li>
            <li><i class="fa-solid fa-clock-rotate-left"></i> Riwayat bantuan</li>
          </ul>
          <p><strong>Tools:</strong> Figma, UI/UX Design</p>
          <p><strong>Design Link:</strong>
            <a href="https://www.figma.com/design/QKs2O1JDglDaTCqppRobMG/Panti-Wredha-BDK?node-id=1580-106&t=mkuXACMqOAj9DIVJ-1"
               target="_blank" style="color:var(--accent);text-decoration:underline">View on Figma</a>
          </p>
        </div>
        <div class="project-mockup">
          <div class="panti-detail-mockup">
            <div class="panti-detail-screen">
              <div class="panti-detail-topbar">
                <div class="panti-detail-logo">Panti Wredha BDK</div>
                <div class="panti-detail-navlinks">
                  <span>Dashboard</span><span>Profil</span><span>Donasi</span>
                </div>
              </div>
              <div class="panti-detail-hero">
                <div class="panti-detail-hero-text">
                  <div class="panti-detail-title"></div>
                  <div class="panti-detail-subtitle"></div>
                  <div class="panti-detail-btn"></div>
                </div>
                <div class="panti-detail-hero-img"></div>
              </div>
              <div class="panti-detail-stats">
                <div class="panti-detail-stat blue">Donasi<br/><strong>Tunai</strong></div>
                <div class="panti-detail-stat orange">Donasi<br/><strong>Barang</strong></div>
                <div class="panti-detail-stat green">Penghuni<br/><strong>Aktif</strong></div>
                <div class="panti-detail-stat purple">Stok<br/><strong>Barang</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

function openPekenDetail() {
  openModal(`
    <div class="project-detail">
      <h2>Peken Banyumas — Platform UMKM</h2>
      <div class="project-info">
        <div class="project-description">
          <p>Desain UI/UX platform digital untuk pengelolaan UMKM di Pasar Peken Banyumas. Memudahkan pedagang dalam mengelola usaha secara terpadu dalam satu website.</p>
          <h3>Fitur Utama:</h3>
          <ul>
            <li><i class="fa-solid fa-store"></i> Pendaftaran &amp; sewa lapak online</li>
            <li><i class="fa-solid fa-chart-line"></i> Monitoring perkembangan usaha</li>
            <li><i class="fa-solid fa-book"></i> Pembukuan keuangan UMKM</li>
            <li><i class="fa-solid fa-clock-rotate-left"></i> Riwayat transaksi</li>
            <li><i class="fa-solid fa-boxes-stacked"></i> Pemantauan stok barang</li>
          </ul>
          <p><strong>Tools:</strong> Figma, UI/UX Design</p>
          <p><strong>Design Link:</strong>
            <a href="https://www.figma.com/design/txce0iq615uOJlflnxWI7L/Peken-Banyumas?node-id=0-1&t=hM1iedHC3AT9yu7d-1"
               target="_blank" style="color:var(--accent);text-decoration:underline">View on Figma</a>
          </p>
        </div>
        <div class="project-mockup">
          <div class="peken-detail-mockup">
            <div class="peken-detail-screen">
              <div class="peken-detail-topbar">
                <div class="peken-detail-logo">Peken Banyumas</div>
              </div>
              <div class="peken-detail-body">
                <div class="peken-detail-sidebar">
                  <div class="peken-detail-menu active">Dashboard</div>
                  <div class="peken-detail-menu">Sewa Lapak</div>
                  <div class="peken-detail-menu">Monitoring</div>
                  <div class="peken-detail-menu">Pembukuan</div>
                  <div class="peken-detail-menu">Transaksi</div>
                  <div class="peken-detail-menu">Stok</div>
                </div>
                <div class="peken-detail-content">
                  <div class="peken-detail-stats">
                    <div class="peken-detail-stat green">Lapak<br/><strong>Aktif</strong></div>
                    <div class="peken-detail-stat yellow">Stok<br/><strong>Monitor</strong></div>
                    <div class="peken-detail-stat red">Transaksi<br/><strong>Hari Ini</strong></div>
                  </div>
                  <div class="peken-detail-chart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

// ---- Close button ----
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeDetail);
});
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/data.json')
    .then(res => res.json())
    .then(data => renderGrid(data))
    .catch(err => {
      console.error('Failed to load data.json:', err);
      renderGrid([]); // render static items only
    });
});
