/* ================= slide control (full-page snap) ================= */
const slidesContainer = document.getElementById('slidesContainer');
const slides = Array.from(document.querySelectorAll('.slide'));
const dotNav = document.getElementById('dotNav');
const dots = Array.from(document.querySelectorAll('.dot'));
let currentIndex = 0;
let isScrolling = false;

/* helper to go to slide index (0-based) */
function goToSlide(n){
  n = Math.max(0, Math.min(slides.length - 1, n));
  currentIndex = n;
  const top = slides[n].offsetTop;
  slidesContainer.scrollTo({ top, behavior: 'smooth' });
  updateDots();
}

/* update dot active */
function updateDots(){
  dots.forEach(d => d.classList.remove('active'));
  if(dots[currentIndex]) dots[currentIndex].classList.add('active');
}

/* dot click */
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => goToSlide(idx));
});

/* wheel / touch handling -> pager behaviour */
let wheelTimeout;
slidesContainer.addEventListener('wheel', (e) => {
  if(isScrolling) return;
  isScrolling = true;
  if (e.deltaY > 0) goToSlide(currentIndex + 1);
  else if (e.deltaY < 0) goToSlide(currentIndex - 1);
  clearTimeout(wheelTimeout);
  wheelTimeout = setTimeout(()=> isScrolling = false, 600);
});

/* arrow keys */
window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowDown') goToSlide(currentIndex + 1);
  if(e.key === 'ArrowUp') goToSlide(currentIndex - 1);
});

/* sync current index on manual scroll (e.g. mobile fling) */
let scrollTick;
slidesContainer.addEventListener('scroll', () => {
  clearTimeout(scrollTick);
  scrollTick = setTimeout(() => {
    const pos = slidesContainer.scrollTop;
    let nearest = 0, minDiff = Infinity;
    slides.forEach((s, i) => {
      const diff = Math.abs(s.offsetTop - pos);
      if(diff < minDiff){ minDiff = diff; nearest = i; }
    });
    currentIndex = nearest;
    updateDots();
  }, 120);
});

/* prev/next floating buttons */
document.getElementById('prevBtn').addEventListener('click', ()=> goToSlide(currentIndex - 1));
document.getElementById('nextBtn').addEventListener('click', ()=> goToSlide(currentIndex + 1));

/* hash links from nav */
document.querySelectorAll('.nav-link').forEach(a=>{
  a.addEventListener('click', (ev)=>{
    ev.preventDefault();
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      const target = document.querySelector(href);
      const idx = slides.indexOf(target);
      if(idx >= 0) goToSlide(idx);
    }
  });
});

/* initial */
updateDots();

/* ================= theme toggle (pastel <-> dark) ================= */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  if(document.body.classList.contains('theme-dark')){
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-pastel');
    themeToggle.textContent = '🌙';
  } else {
    document.body.classList.remove('theme-pastel');
    document.body.classList.add('theme-dark');
    themeToggle.textContent = '☀️';
  }
});

/* ================= Intersection animations ================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.glass-panel, .glass-card, .cv-card').forEach(el=>{
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.slide').forEach(slide => observer.observe(slide));

/* ================= CV generation & PDF ================= */
const cvForm = document.getElementById('cvForm');
const cvPreview = document.getElementById('cvPreview');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

cvForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  generatePreview();
});

downloadPdfBtn.addEventListener('click', () => {
  if(cvPreview.innerText.trim().length === 0 || cvPreview.querySelector('.cv-empty')) {
    alert('Silakan generate preview CV terlebih dahulu.');
    return;
  }
  generatePdf();
});

function generatePreview(){
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const education = document.getElementById('education').value.trim();
  const skills = document.getElementById('skillsInput') ? document.getElementById('skillsInput').value.trim() : document.getElementById('skillsInput');
  const experience = document.getElementById('experience').value.trim();

  const skillList = skills ? skills.split(',').map(s=>s.trim()).filter(Boolean) : [];

  const html = `
    <div class="cv-content">
      <h2 style="margin:0 0 6px">${escapeHtml(name || 'Nama Lengkap')}</h2>
      <p style="margin:0;color:var(--muted)">${escapeHtml(education)}</p>
      <div style="margin-top:12px">
        <strong>Kontak</strong>
        <p style="margin:6px 0">${escapeHtml(email)} ${phone ? ' • ' + escapeHtml(phone) : ''}</p>
      </div>
      <div style="margin-top:10px">
        <strong>Skill</strong>
        <p style="margin:6px 0">${skillList.length ? escapeHtml(skillList.join(', ')) : '-'}</p>
      </div>
      <div style="margin-top:10px">
        <strong>Pengalaman</strong>
        <p style="margin:6px 0">${escapeHtml(experience || '-')}</p>
      </div>
    </div>
  `;
  cvPreview.innerHTML = html;
}

/* minimal HTML-escape to avoid injection in preview */
function escapeHtml(s){
  if(!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* generate pdf via jsPDF */
async function generatePdf(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:'pt', format:'a4'});
  // simple text layout
  const lines = cvPreview.innerText.split('\n').map(l => l.trim()).filter(Boolean);
  let y = 40;
  doc.setFontSize(14);
  doc.text('Curriculum Vitae', 40, y);
  y += 22;
  doc.setFontSize(11);
  lines.forEach(line => {
    doc.text(line, 40, y);
    y += 16;
  });
  const name = document.getElementById('name').value.trim() || 'CV';
  doc.save(`${name.replace(/\s+/g,'_')}_CV.pdf`);
}

/* ================= Jobs data and modal ================= */
const jobs = [
  { 
    title: "Software Engineer",
    category: "Teknologi",
    description: "Mengembangkan aplikasi, sistem, dan platform digital.",
  },
  { 
    title: "Frontend Developer",
    category: "Teknologi",
    description: "Membangun tampilan website menggunakan HTML, CSS, dan JS.",
  },
  { 
    title: "Backend Developer",
    category: "Teknologi",
    description: "Mengelola server, database, dan API.",
  },
  { 
    title: "Mobile App Developer",
    category: "Teknologi",
    description: "Membuat aplikasi Android & iOS.",
  },
  { 
    title: "UI/UX Designer",
    category: "Desain",
    description: "Mendesain pengalaman pengguna dan tampilan interface.",
  },
  { 
    title: "Graphic Designer",
    category: "Desain",
    description: "Membuat desain visual untuk branding dan media digital.",
  },
  { 
    title: "Product Manager",
    category: "Teknologi / Manajemen",
    description: "Mengatur strategi, fitur, dan perkembangan produk digital.",
  },

  // EKONOMI & BISNIS  
  { title: "Akuntan", category: "Ekonomi", description: "Mengelola laporan keuangan dan audit." },
  { title: "Analis Keuangan", category: "Ekonomi", description: "Menganalisis kondisi finansial bisnis." },
  { title: "Customer Service", category: "Layanan", description: "Memberikan bantuan kepada pelanggan." },
  { title: "Administrasi Perkantoran", category: "Perkantoran", description: "Mengelola dokumen dan operasional kantor." },
  { title: "HR / Rekrutmen", category: "Sumber Daya Manusia", description: "Merekrut dan mengelola karyawan." },
  { title: "Marketing", category: "Bisnis", description: "Mengatur promosi dan strategi pemasaran." },
  { title: "Sales Executive", category: "Bisnis", description: "Menjual produk dan menjaga hubungan klien." },

  // PENDIDIKAN  
  { title: "Guru SD", category: "Pendidikan", description: "Mengajar siswa sekolah dasar." },
  { title: "Guru SMP/SMA", category: "Pendidikan", description: "Mengajar pelajaran sesuai bidang." },
  { title: "Tutor Bimbel", category: "Pendidikan", description: "Membantu siswa memahami materi pelajaran." },
  { title: "Dosen", category: "Pendidikan", description: "Mengajar di perguruan tinggi." },

  // KESEHATAN  
  { title: "Perawat", category: "Kesehatan", description: "Merawat pasien di klinik atau rumah sakit." },
  { title: "Dokter Umum", category: "Kesehatan", description: "Memberikan pelayanan medis dasar." },
  { title: "Apoteker", category: "Kesehatan", description: "Meracik dan mengelola obat." },
  { title: "Ahli Gizi", category: "Kesehatan", description: "Mengatur pola makan dan kesehatan nutrisi." },

  // INDUSTRI  
  { title: "Operator Produksi", category: "Pabrik / Industri", description: "Menjalankan mesin produksi." },
  { title: "Quality Control", category: "Industri", description: "Mengawasi kualitas hasil produksi." },
  { title: "Teknisi Mesin", category: "Industri", description: "Maintenance alat dan permesinan." },

  // TRANSPORTASI  
  { title: "Driver", category: "Transportasi", description: "Mengemudikan kendaraan untuk pengiriman." },
  { title: "Kurir", category: "Logistik", description: "Mengantar paket kepada pelanggan." },
  { title: "Operator Forklift", category: "Logistik", description: "Mengoperasikan forklift untuk memindahkan barang." },

  // HOSPITALITY  
  { title: "Barista", category: "Kuliner", description: "Membuat dan menyajikan kopi." },
  { title: "Chef", category: "Kuliner", description: "Mengolah dan membuat makanan." },
  { title: "Waiter/Waitress", category: "Hospitality", description: "Melayani tamu restoran." },
  { title: "Resepsionis", category: "Perhotelan", description: "Melayani tamu di hotel atau kantor." },

  // MEDIA  
  { title: "Content Creator", category: "Media", description: "Membuat konten untuk media sosial." },
  { title: "Video Editor", category: "Media", description: "Mengedit dan merangkai video." },
  { title: "Fotografer", category: "Media", description: "Mengambil foto untuk kebutuhan profesional." },
  { title: "Social Media Specialist", category: "Media", description: "Mengelola akun media sosial." },

  // KREATIF DIGITAL  
  { title: "Animator 2D/3D", category: "Animasi", description: "Membuat animasi untuk film atau iklan." },
  { title: "Game Developer", category: "Game", description: "Membangun game untuk mobile/PC." },
  { title: "VFX Artist", category: "Film", description: "Membuat efek visual untuk video." },

  // PEMERINTAHAN  
  { title: "Staff Administrasi Pemerintahan", category: "Pemerintahan", description: "Mengelola data dan layanan publik." },
  { title: "Pegawai BUMN", category: "BUMN", description: "Bekerja di perusahaan milik negara." },
  { title: "Arsiparis", category: "Pemerintahan", description: "Mengelola arsip dan dokumen negara." },

  // PEKERJAAN LAPANGAN  
  { title: "Surveyor", category: "Lapangan", description: "Melakukan pengukuran dan survei lokasi." },
  { title: "Petugas Lapangan", category: "Lapangan", description: "Bekerja di area proyek atau konstruksi." },
  { title: "Security", category: "Keamanan", description: "Menjaga keamanan lingkungan kerja." },

  // FREELANCE  
  { title: "Freelancer", category: "Freelance", description: "Bekerja sesuai proyek, fleksibel waktu." },
  { title: "Copywriter", category: "Freelance", description: "Menulis teks promosi dan artikel." },
  { title: "Translator", category: "Freelance", description: "Menerjemahkan dokumen atau percakapan." },

  // LAINNYA  
  { title: "Data Analyst", category: "Teknologi", description: "Analisis data untuk kebutuhan bisnis." },
  { title: "Data Entry", category: "Admin", description: "Memasukkan dan mengelola data." },
  { title: "Project Manager", category: "Manajemen", description: "Memimpin dan mengawasi proyek." },
  { title: "Logistic Staff", category: "Logistik", description: "Mengatur distribusi dan pengiriman barang." },
  { title: "Digital Marketing", category: "Marketing", description: "Mengelola kampanye digital." },
  { title: "SEO Specialist", category: "Marketing", description: "Optimasi website agar tampil di Google." }
];


/* render jobs grid */
const jobsGrid = document.getElementById('jobsGrid');
jobs.forEach((j, i)=>{
  const el = document.createElement('div');
  el.className = 'job-card';
  el.innerHTML = `<div class="job-title">${escapeHtml(j.title)}</div>
                  <div class="job-meta">${escapeHtml(j.company)} • ${escapeHtml(j.location)}</div>
                  <div class="job-meta">${escapeHtml(j.salary)}</div>`;
  el.addEventListener('click', ()=> openJobModal(i));
  jobsGrid.appendChild(el);
});

/* modal logic */
const jobModal = document.getElementById('jobModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openJobModal(index){
  const j = jobs[index];
  modalBody.innerHTML = `
    <h2>${escapeHtml(j.title)}</h2>
    <p class="muted">${escapeHtml(j.company)} • ${escapeHtml(j.location)}</p>
    <p><strong>Gaji:</strong> ${escapeHtml(j.salary)}</p>
    <p><strong>Skill dibutuhkan:</strong> ${escapeHtml(j.skills.join(', '))}</p>
    <hr/>
    <p>${escapeHtml(j.desc)}</p>
    <div style="margin-top:16px;display:flex;gap:10px">
      <button class="btn primary" onclick="applyMock('${escapeHtml(j.title)}')">Lamar Sekarang</button>
      <button class="btn outline" onclick="closeModal()">Tutup</button>
    </div>
  `;
  jobModal.classList.remove('hidden');
}

modalClose.addEventListener('click', closeModal);
jobModal.addEventListener('click', (e)=> { if(e.target === jobModal) closeModal(); });

function closeModal(){ jobModal.classList.add('hidden'); modalBody.innerHTML=''; }

function applyMock(title){
  alert('Fitur lamar (mock) -> mengirim CV ke: ' + title);
  closeModal();
}

/* ================= init: set theme and initial visibility ================= */
(function init(){
  // default pastel theme
  document.body.classList.add('theme-pastel'); // or 'theme-dark'
  // show first slide on load
  goToSlide(0);
})();
