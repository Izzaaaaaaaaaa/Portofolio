// ---------------------------
// app.js — UI + Firebase CRUD
// ---------------------------

// ---- Firebase config (user-provided earlier) ----
const firebaseConfig = {
  apiKey: "AIzaSyDDNaUbinHWyv5mcFf9MMQyxWr6sBl3q9s",
  authDomain: "portfolio-izzaty.firebaseapp.com",
  projectId: "portfolio-izzaty",
  storageBucket: "portfolio-izzaty.firebasestorage.app",
  messagingSenderId: "336759212773",
  appId: "1:336759212773:web:68e02daaa85684e073220c",
  measurementId: "G-DFSDG9C0T5"
};

if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// ---- Responsive nav ----
const hambtn = document.getElementById('hambtn');
const navLinks = document.getElementById('navLinks');
if(hambtn){
  hambtn.addEventListener('click', ()=> {
    if(navLinks.style.display === 'flex') navLinks.style.display = 'none';
    else navLinks.style.display = 'flex';
  });
}

// ---- typing words (hero) ----
(function typing(){
  const el = document.querySelector('.words');
  if(!el) return;
  const arr = ['Web Design','UI/UX Designer','Frontend'];
  let i=0;
  setInterval(()=>{ i=(i+1)%arr.length; el.textContent = arr[i]; }, 2000);
})();

// ---- Folder toggle on index ----
document.addEventListener('click', (e)=>{
  const f = e.target.closest('.folder');
  if(f){
    f.classList.toggle('active');
  }
});

// ---- Detail modal (index) ----
function showDetailHTML(html){
  const modal = document.getElementById('detailModal');
  const content = document.getElementById('detailContent');
  if(!modal || !content) return;
  content.innerHTML = html;
  modal.style.display = 'flex';
}
function closeDetail(){ const m = document.getElementById('detailModal'); if(m) m.style.display='none'; }

// ---- quick popup for folders (index uses modal already) ----
function openPopup(folderKey){
  // build HTML per folderKey (manual preview)
  let html = '';
  if(folderKey === 'sertif' || folderKey === 'lomba'){
    html = `<h2>Sertifikat</h2>
      <img src="sertifikat/Sertifikat lomba silat.jpg" style="width:100%;border-radius:8px;margin:8px 0" />
      <p>Detail: Sertifikat lomba silat dan kegiatan lainnya.</p>`;
  } else if(folderKey === 'ui'){
    html = `<h2>UI Design</h2>
      <img src="project/ui1.jpg" style="width:100%;border-radius:8px;margin:8px 0" />
      <p>Demo UI screens & case study.</p>`;
  } else {
    html = `<p>No content</p>`;
  }
  showDetailHTML(html);
}
function closePopup(){ closeDetail(); }

// ---- Contact form handler (simple demo: shows toast) ----
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const msg = document.getElementById('cf-message').value.trim();
    if(!name || !email || !msg){ alert('Mohon isi semua field'); return; }
    alert('Terima kasih! Pesanmu sudah terkirim (demo).');
    contactForm.reset();
  });
}

// -----------------------------
// Firestore CRUD for portfolio.html
// -----------------------------
let editingId = null;

async function uploadFile(file){
  if(!file) return null;
  const path = `portfolios/${Date.now()}_${file.name.replace(/\s+/g,'_')}`;
  const ref = storage.ref().child(path);
  await ref.put(file);
  const url = await ref.getDownloadURL();
  return { url, path };
}

async function loadPortfolios(){
  const el = document.getElementById('portfolio-list');
  if(!el) return;
  el.innerHTML = '<p>Loading...</p>';
  try{
    const snap = await db.collection('portfolios').orderBy('createdAt','desc').get();
    el.innerHTML = '';
    if(snap.empty){
      el.innerHTML = '<p class="muted">Belum ada portofolio — tambahkan lewat tombol New Portfolio.</p>';
      return;
    }
    snap.forEach(doc=>{
      const d = doc.data();
      const id = doc.id;
      const card = document.createElement('div');
      card.className = 'portfolio-card';
      card.innerHTML = `
        <img src="${d.imageUrl || 'https://via.placeholder.com/800x400'}" class="portfolio-thumb" alt="${escapeHtml(d.title)}" />
        <h4>${escapeHtml(d.title)}</h4>
        <small class="muted">${escapeHtml(d.category || '')} — ${escapeHtml(d.date || '')}</small>
        <div style="margin-top:auto;display:flex;gap:8px;justify-content:flex-end">
          <button class="primary" onclick="viewDetailAdmin('${id}')">Detail</button>
          <button onclick="openEditForm('${id}')">Edit</button>
          <button onclick="deletePortfolio('${id}')">Delete</button>
        </div>
      `;
      el.appendChild(card);
    });
  }catch(err){
    console.error(err);
    el.innerHTML = `<p class="muted">Error: ${err.message}</p>`;
  }
}
function escapeHtml(t){ if(!t) return ''; return t.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

// detail admin modal
async function viewDetailAdmin(id){
  try{
    const doc = await db.collection('portfolios').doc(id).get();
    if(!doc.exists) return alert('Data tidak ditemukan');
    const d = doc.data();
    const html = `
      <h2 style="color:var(--accent)">${escapeHtml(d.title)}</h2>
      <p><b>Category:</b> ${escapeHtml(d.category || '')}</p>
      <p><b>Date:</b> ${escapeHtml(d.date || '')}</p>
      <img src="${d.imageUrl || ''}" style="width:100%;border-radius:8px;margin:12px 0" />
      <p>${escapeHtml(d.description || '')}</p>
      ${d.link ? `<p><a href="${d.link}" target="_blank">Open Link</a></p>` : ''}
    `;
    document.getElementById('detailContentAdmin').innerHTML = html;
    document.getElementById('detailModalAdmin').style.display = 'flex';
  }catch(err){ console.error(err); alert('Gagal: '+err.message); }
}
function closeDetailAdmin(){ const m=document.getElementById('detailModalAdmin'); if(m) m.style.display='none'; }

// create/edit form open
function openCreateForm(){
  editingId = null;
  document.getElementById('portfolioForm').reset();
  document.getElementById('formTitle').textContent = 'New Portfolio';
  document.getElementById('formModal').style.display = 'flex';
}
async function openEditForm(id){
  editingId = id;
  document.getElementById('formTitle').textContent = 'Edit Portfolio';
  document.getElementById('formModal').style.display = 'flex';
  try{
    const doc = await db.collection('portfolios').doc(id).get();
    const d = doc.data();
    document.getElementById('title').value = d.title || '';
    document.getElementById('category').value = d.category || '';
    document.getElementById('date').value = d.date || '';
    document.getElementById('description').value = d.description || '';
    document.getElementById('link').value = d.link || '';
  }catch(err){ console.error(err); alert('Gagal load: '+err.message); }
}
function closeForm(){ const m=document.getElementById('formModal'); if(m) m.style.display='none'; }

// submit create/edit
async function submitForm(){
  try{
    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value.trim();
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value.trim();
    const link = document.getElementById('link').value.trim();
    const file = document.getElementById('image').files[0];

    if(!title) return alert('Isi title terlebih dahulu');

    let imageData = null;
    if(file) imageData = await uploadFile(file);

    const data = { title, category, date, description, link };
    if(imageData){ data.imageUrl = imageData.url; data.imagePath = imageData.path; }

    if(editingId){
      await db.collection('portfolios').doc(editingId).update(data);
      alert('Updated!');
    } else {
      data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await db.collection('portfolios').add(data);
      alert('Created!');
    }
    closeForm();
    loadPortfolios();
  }catch(err){ console.error(err); alert('Gagal submit: '+err.message); }
}

// delete
async function deletePortfolio(id){
  if(!confirm('Delete this portfolio?')) return;
  try{
    const doc = await db.collection('portfolios').doc(id).get();
    if(doc.exists){
      const d = doc.data();
      if(d.imagePath){ await storage.ref().child(d.imagePath).delete().catch(()=>{}); }
      await db.collection('portfolios').doc(id).delete();
    }
    loadPortfolios();
  }catch(err){ console.error(err); alert('Gagal hapus: '+err.message); }
}

// auto-load portfolios when on admin page
if(window.location.pathname.includes('portfolio.html')){
  window.addEventListener('DOMContentLoaded', loadPortfolios);
}

// close modals when clicked outside
window.addEventListener('click', (e)=>{
  const modal = document.querySelectorAll('.modal');
  modal.forEach(m=>{
    if(m.style.display === 'flex' && e.target === m) m.style.display = 'none';
  });
});
