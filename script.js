/* -------------------- Helper utilities -------------------- */
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }
function escapeHtml(s){
  if(!s && s !== 0) return '';
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

/* -------------------- Jobs data (dilengkapi) -------------------- */
const jobs = [
  { title:'Software Engineer', company:'InnoTech Indonesia', location:'Jakarta', salary:'Rp 8–18 juta', skills:['JavaScript','Node.js','React'], desc:'Membangun dan memelihara aplikasi web, bekerja dengan tim produk untuk deliver fitur.' },
  { title:'Frontend Developer', company:'WebCraft Studio', location:'Jakarta', salary:'Rp 6–12 juta', skills:['HTML','CSS','JavaScript','Vue.js'], desc:'Membangun tampilan antarmuka yang responsif dan optimal di berbagai perangkat.' },
  { title:'Backend Developer', company:'CodeBase Solutions', location:'Bandung', salary:'Rp 7–14 juta', skills:['Node.js','Express','MongoDB','SQL'], desc:'Merancang API, database dan arsitektur server untuk aplikasi skala menengah-besar.' },
  { title:'Mobile App Developer', company:'AppLab', location:'Jakarta', salary:'Rp 7–11 juta', skills:['Flutter','Dart','Firebase'], desc:'Mengembangkan aplikasi mobile Android & iOS, integrasi API dan optimasi performa.' },
  { title:'UI/UX Designer', company:'DesignLab', location:'Bandung', salary:'Rp 5–10 juta', skills:['Figma','User Research','Prototyping'], desc:'Mendesain pengalaman pengguna dan prototipe interaktif untuk produk digital.' },
  { title:'Graphic Designer', company:'CreativeStudio', location:'Surabaya', salary:'Rp 4–8 juta', skills:['Photoshop','Illustrator','Figma'], desc:'Membuat materi visual untuk branding, kampanye digital, dan cetak.' },
  { title:'Product Manager', company:'BuildTech', location:'Jakarta', salary:'Rp 9–16 juta', skills:['Roadmap','Stakeholder','Agile'], desc:'Mengelola roadmap produk, koordinasi tim, dan mencapai target bisnis.' },
  { title:'Akuntan', company:'FinancePlus', location:'Surabaya', salary:'Rp 5–9 juta', skills:['Excel','Accounting','Tax'], desc:'Mengolah laporan keuangan, rekonsiliasi dan kepatuhan pajak.' },
  { title:'Analis Keuangan', company:'MoneyMind', location:'Jakarta', salary:'Rp 6–12 juta', skills:['Financial Modeling','Excel','Power BI'], desc:'Menganalisis performa keuangan dan membuat rekomendasi strategis.' },
  { title:'Customer Service', company:'HelpDesk Co', location:'Semarang', salary:'Rp 3–6 juta', skills:['Communication','Problem Solving','CRM'], desc:'Melayani pelanggan, menjawab pertanyaan dan menyelesaikan keluhan.' },
  { title:'Administrasi Perkantoran', company:'OfficeWorks', location:'Yogyakarta', salary:'Rp 3–5 juta', skills:['Admin','MS Office','Organisasi'], desc:'Mengelola dokumen, jadwal, dan kebutuhan administrasi harian kantor.' },
  { title:'HR / Rekrutmen', company:'PeopleWorks', location:'Jakarta', salary:'Rp 5–10 juta', skills:['Recruitment','Interviewing','HRIS'], desc:'Merekrut talenta, mengelola proses onboarding dan administrasi karyawan.' },
  { title:'Marketing', company:'BrandBoost', location:'Jakarta', salary:'Rp 5–11 juta', skills:['Content','Campaign','Analytics'], desc:'Membuat dan menjalankan strategi pemasaran untuk meningkatkan awareness.' },
  { title:'Sales Executive', company:'SalesPro', location:'Bandung', salary:'Rp 4–9 juta', skills:['Negotiation','CRM','Prospecting'], desc:'Menjalin hubungan dengan klien dan mencapai target penjualan.' },
  { title:'Guru SD', company:'Sekolah Ceria', location:'Jakarta', salary:'Rp 3–6 juta', skills:['Teaching','Class Management','Communication'], desc:'Mendidik siswa SD, membuat rencana pembelajaran, dan evaluasi.' },
  { title:'Guru SMP/SMA', company:'Sekolah Terpadu', location:'Surabaya', salary:'Rp 3–7 juta', skills:['Subject Knowledge','Assessment','Classroom Management'], desc:'Mengajar mata pelajaran sesuai kurikulum dan memfasilitasi pembelajaran.' },
  { title:'Tutor Bimbel', company:'Bimbel Prima', location:'Yogyakarta', salary:'Rp 2–5 juta', skills:['Teaching','Patience','Subject Expertise'], desc:'Membantu siswa dalam persiapan ujian dan memperkuat konsep pelajaran.' },
  { title:'Dosen', company:'Universitas Negeri', location:'Bandung', salary:'Rp 8–15 juta', skills:['Research','Teaching','Academic Writing'], desc:'Mengajar, melakukan penelitian dan membimbing mahasiswa.' },
  { title:'Perawat', company:'RS Sehat', location:'Jakarta', salary:'Rp 4–8 juta', skills:['Patient Care','Clinical Skills','Compassion'], desc:'Memberikan perawatan pasien, monitoring dan administrasi medis.' },
  { title:'Dokter Umum', company:'Klinik Sehat', location:'Surabaya', salary:'Rp 8–20 juta', skills:['Medical Knowledge','Diagnosis','Patient Care'], desc:'Melakukan pemeriksaan, diagnosa dan penatalaksanaan pasien umum.' },
  { title:'Apoteker', company:'Apotek Sejahtera', location:'Bandung', salary:'Rp 5–10 juta', skills:['Pharmacy','Compounding','Regulation'], desc:'Mengelola stok obat, meracik resep dan memberikan informasi obat.' },
  { title:'Ahli Gizi', company:'Wellness Center', location:'Jakarta', salary:'Rp 4–9 juta', skills:['Nutrition','Counseling','Meal Planning'], desc:'Menyusun rencana nutrisi dan memberi konseling gizi.' },
  { title:'Operator Produksi', company:'Industri Maju', location:'Bekasi', salary:'Rp 3–6 juta', skills:['Machine Operation','Safety','Quality'], desc:'Mengoperasikan mesin produksi dan memastikan kualitas produk.' },
  { title:'Quality Control', company:'FactoryCheck', location:'Cikarang', salary:'Rp 4–7 juta', skills:['Inspection','QC Processes','Reporting'], desc:'Memeriksa kualitas produk dan melakukan tindakan korektif.' },
  { title:'Teknisi Mesin', company:'TechMaintain', location:'Semarang', salary:'Rp 4–8 juta', skills:['Maintenance','Troubleshooting','Mechanical'], desc:'Merawat dan memperbaiki mesin produksi serta peralatan pabrik.' },
  { title:'Driver', company:'LogiTrans', location:'Jakarta', salary:'Rp 3–5 juta', skills:['Driving','Timeliness','Licence'], desc:'Mengantar barang atau penumpang sesuai rute dan jadwal.' },
  { title:'Kurir', company:'SpeedCourier', location:'Bekasi', salary:'Rp 3–5 juta', skills:['Delivery','Navigation','Customer Service'], desc:'Mengirim paket dan memastikan barang sampai tepat waktu.' },
  { title:'Operator Forklift', company:'Warehouse Pro', location:'Jakarta', salary:'Rp 3–6 juta', skills:['Forklift Operation','Safety','Material Handling'], desc:'Memindahkan barang di gudang menggunakan forklift sesuai SOP.' },
  { title:'Barista', company:'Kopi Kita', location:'Bandung', salary:'Rp 3–5 juta', skills:['Coffee Making','Customer Service','Latte Art'], desc:'Membuat minuman kopi, melayani pelanggan dan menjaga kebersihan area.' },
  { title:'Chef', company:'Dapur Rasa', location:'Bali', salary:'Rp 4–10 juta', skills:['Cooking','Menu Planning','Food Safety'], desc:'Mengolah menu makanan, menjaga kualitas rasa dan standar kebersihan.' },
  { title:'Waiter/Waitress', company:'Resto Enak', location:'Yogyakarta', salary:'Rp 2.5–5 juta', skills:['Service','Communication','Hospitality'], desc:'Melayani tamu, menerima pesanan dan menjaga pengalaman makan.' },
  { title:'Resepsionis', company:'Hotel Prima', location:'Jakarta', salary:'Rp 3–6 juta', skills:['Customer Service','Booking Systems','Communication'], desc:'Menyambut tamu, mengelola reservasi dan administrasi front desk.' },
  { title:'Content Creator', company:'MediaWorks', location:'Jakarta', salary:'Rp 4–10 juta', skills:['Video','Script','Editing'], desc:'Menciptakan konten kreatif untuk platform digital dan sosial media.' },
  { title:'Video Editor', company:'EditHouse', location:'Bandung', salary:'Rp 4–9 juta', skills:['Premiere Pro','After Effects','Storytelling'], desc:'Mengedit footage menjadi konten yang menarik dan sesuai brief.' },
  { title:'Fotografer', company:'FotoStudio', location:'Jakarta', salary:'Rp 3–8 juta', skills:['Photography','Lighting','Composition'], desc:'Melakukan sesi foto, editing dan pengolahan hasil foto.' },
  { title:'Social Media Specialist', company:'SocialBoost', location:'Jakarta', salary:'Rp 4–9 juta', skills:['Social Strategy','Analytics','Content'], desc:'Mengelola akun sosial, strategi konten dan monitoring performa.' },
  { title:'Animator 2D/3D', company:'Anim8 Studio', location:'Jakarta', salary:'Rp 5–12 juta', skills:['After Effects','Maya','Animation'], desc:'Membuat animasi untuk iklan, film atau game.' },
  { title:'Game Developer', company:'PlayWorks', location:'Bandung', salary:'Rp 6–14 juta', skills:['Unity','C#','Game Design'], desc:'Mengembangkan game untuk platform mobile atau PC.' },
  { title:'VFX Artist', company:'VisualFX', location:'Jakarta', salary:'Rp 6–14 juta', skills:['Compositing','Nuke','After Effects'], desc:'Menciptakan efek visual dan mengolah footage untuk produksi.' },
  { title:'Staff Administrasi Pemerintahan', company:'Kantor Kecamatan', location:'Jakarta', salary:'Rp 3–6 juta', skills:['Admin','Documents','Public Service'], desc:'Melayani administrasi publik dan pengelolaan arsip.' },
  { title:'Pegawai BUMN', company:'PT Nusantara', location:'Jakarta', salary:'Rp 6–15 juta', skills:['Management','Policy','Reporting'], desc:'Bekerja di berbagai fungsi di perusahaan milik negara.' },
  { title:'Arsiparis', company:'Arsip Nasional', location:'Jakarta', salary:'Rp 4–8 juta', skills:['Archiving','Cataloging','Records Management'], desc:'Mengelola arsip dan memastikan keteraturan dokumen historis.' },
  { title:'Surveyor', company:'SurveyPro', location:'Semarang', salary:'Rp 4–9 juta', skills:['Surveying','GPS','Mapping'], desc:'Melakukan pengukuran lahan, data lapangan dan pemetaan.' },
  { title:'Petugas Lapangan', company:'FieldOps', location:'Jakarta', salary:'Rp 3–7 juta', skills:['Fieldwork','Reporting','Coordination'], desc:'Melakukan tugas lapangan sesuai proyek dan melaporkan hasil.' },
  { title:'Security', company:'SecureGuard', location:'Surabaya', salary:'Rp 2.5–4.5 juta', skills:['Monitoring','Patrol','Safety'], desc:'Menjaga keamanan area kerja dan mengawasi akses.' },
  { title:'Freelancer', company:'- (Freelance)', location:'Remote/Various', salary:'Bervariasi', skills:['Discipline','Self-Management','Skill-specific'], desc:'Bekerja proyek per proyek sesuai keahlian dan kontrak.' },
  { title:'Copywriter', company:'AdWords', location:'Jakarta', salary:'Rp 3–8 juta', skills:['Copywriting','SEO','Creativity'], desc:'Menulis materi promosi, iklan dan konten yang persuasif.' },
  { title:'Translator', company:'TransLang', location:'Jakarta', salary:'Rp 3–7 juta', skills:['Language','Translation','Proofreading'], desc:'Menerjemahkan dokumen dan menjaga kualitas terjemahan.' },
  { title:'Data Analyst', company:'DataSolve', location:'Jakarta', salary:'Rp 6–12 juta', skills:['SQL','Python','Excel'], desc:'Mengolah dan menganalisis data untuk kebutuhan bisnis dan pelaporan.' },
  { title:'Data Entry', company:'AdminCorp', location:'Yogyakarta', salary:'Rp 2.5–4.5 juta', skills:['Typing','Accuracy','MS Excel'], desc:'Memasukkan data ke sistem dan memastikan akurasi entri.' },
  { title:'Project Manager', company:'Projex', location:'Jakarta', salary:'Rp 9–18 juta', skills:['Planning','Leadership','Risk Management'], desc:'Mengelola proyek dari awal hingga selesai sesuai scope dan waktu.' },
  { title:'Logistic Staff', company:'LogiChain', location:'Bekasi', salary:'Rp 3–6 juta', skills:['Inventory','Distribution','Coordination'], desc:'Mengatur distribusi barang dan pemrosesan logistik.' },
  { title:'Digital Marketing', company:'PromoMax', location:'Surabaya', salary:'Rp 5–11 juta', skills:['SEO','Ads','Analytics'], desc:'Merancang kampanye digital untuk meningkatkan leads dan conversions.' },
  { title:'SEO Specialist', company:'SearchBoost', location:'Jakarta', salary:'Rp 5–10 juta', skills:['SEO','Analytics','Content Strategy'], desc:'Optimasi website agar lebih terlihat di mesin pencari.' },
  { title:'Business Analyst', company:'BizConsult', location:'Jakarta', salary:'Rp 7–13 juta', skills:['Analysis','Requirements','Stakeholder'], desc:'Menganalisis kebutuhan bisnis dan menerjemahkan jadi solusi IT.' },
  { title:'QA Tester', company:'SoftTest', location:'Jakarta', salary:'Rp 4–8 juta', skills:['Selenium','Manual Testing','Test Cases'], desc:'Melakukan pengujian untuk memastikan kualitas software.' },
  { title:'IT Support', company:'TechHelp', location:'Bandung', salary:'Rp 3–6 juta', skills:['Troubleshooting','Networking','Hardware'], desc:'Memberikan dukungan teknis dan pemecahan masalah TI.' },
  { title:'Financial Analyst', company:'MoneyInsight', location:'Surabaya', salary:'Rp 6–12 juta', skills:['Excel','Financial Modeling','Analysis'], desc:'Menganalisis laporan keuangan dan memberikan insight untuk keputusan.' },
  { title:'UX Researcher', company:'UserLab', location:'Bandung', salary:'Rp 5–9 juta', skills:['User Testing','Surveys','Analysis'], desc:'Melakukan riset pengguna dan menginformasikan desain produk.' }
];
/* -------------------- end jobs data -------------------- */

/* -------------------- DOM references -------------------- */
const jobsGrid = $('#jobsGrid');
const jobModal = $('#jobModal');
const modalBody = $('#modalBody');
const modalClose = $('#modalClose');

const slidesContainer = $('#slidesContainer');
const slides = $all('.slide');
const dots = $all('.dot');
const prevBtn = $('#prevBtn');
const nextBtn = $('#nextBtn');
const themeToggle = $('#themeToggle');

const cvForm = $('#cvForm');
const cvPreview = $('#cvPreview');
const downloadPdfBtn = $('#downloadPdfBtn');

/* -------------------- Render jobs grid -------------------- */
function renderJobs(){
  if(!jobsGrid) return;
  jobsGrid.innerHTML = '';
  jobs.forEach((j, idx) => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.dataset.index = idx;

    // prepare small meta display (company • location)
    const meta = `${escapeHtml(j.company || '-') } • ${escapeHtml(j.location || '-')}`;

    card.innerHTML = `
      <div class="job-title">${escapeHtml(j.title)}</div>
      <div class="job-meta">${meta}</div>
      <div class="job-meta" style="margin-top:8px;color:var(--muted);font-size:13px">${escapeHtml(j.salary || '-')}</div>
    `;
    // click opens modal
    card.addEventListener('click', ()=> openJobModal(idx));
    card.addEventListener('keypress', (e)=> { if(e.key === 'Enter') openJobModal(idx); });
    jobsGrid.appendChild(card);
  });
}

/* -------------------- Modal logic -------------------- */
function openJobModal(index){
  const j = jobs[index];
  if(!j) return;
  const skillsHtml = (j.skills && j.skills.length) ? `<ul>${j.skills.map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</ul>` : '<p>-</p>';
  modalBody.innerHTML = `
    <div style="display:flex;gap:16px;align-items:flex-start;flex-direction:column">
      <div>
        <h2 style="margin:0 0 6px">${escapeHtml(j.title)}</h2>
        <div class="muted">${escapeHtml(j.company)} • ${escapeHtml(j.location)}</div>
        <div style="margin-top:10px;color:var(--muted)"><strong>Gaji:</strong> ${escapeHtml(j.salary || '-')}</div>
      </div>

      <div style="margin-top:12px">
        <strong>Skill yang dibutuhkan</strong>
        <div style="margin-top:6px">${skillsHtml}</div>
      </div>

      <div style="margin-top:12px">
        <strong>Deskripsi Pekerjaan</strong>
        <p style="margin-top:6px">${escapeHtml(j.desc || j.description || '-')}</p>
      </div>

      <div style="margin-top:16px;display:flex;gap:10px;align-self:flex-end">
        <button class="btn primary" onclick="applyMock(${index})">Lamar Sekarang</button>
        <button class="btn outline" onclick="closeModal()">Tutup</button>
      </div>
    </div>
  `;
  jobModal.classList.remove('hidden');
  // focus for accessibility
  modalClose.focus();
}

function closeModal(){
  jobModal.classList.add('hidden');
  modalBody.innerHTML = '';
}

function applyMock(index){
  const j = jobs[index];
  alert(`(Mock) Mengirim CV untuk posisi: ${j.title} di ${j.company}\nSilakan gunakan fitur download CV untuk melampirkan berkas.`);
  closeModal();
}

/* close handlers */
if(modalClose) modalClose.addEventListener('click', closeModal);
if(jobModal) jobModal.addEventListener('click', (e)=> { if(e.target === jobModal) closeModal(); });

/* -------------------- Slides control (scroll-snap + wheel / keys) -------------------- */
let currentIndex = 0;
let isPaging = false;

function updateDots(){
  dots.forEach(d => d.classList.remove('active'));
  if(dots[currentIndex]) dots[currentIndex].classList.add('active');
}

function goToSlide(n){
  n = Math.max(0, Math.min(slides.length - 1, n));
  currentIndex = n;
  const top = slides[n].offsetTop;
  slidesContainer.scrollTo({ top, behavior: 'smooth' });
  updateDots();
}

/* dot click */
dots.forEach((dot, idx)=> dot.addEventListener('click', ()=> goToSlide(idx) ));

/* wheel/trackpad - debounce paging */
let wheelTimeout;
if(slidesContainer){
  slidesContainer.addEventListener('wheel', (e)=>{
    if(isPaging) return;
    isPaging = true;
    if(e.deltaY > 0) goToSlide(currentIndex + 1);
    else if(e.deltaY < 0) goToSlide(currentIndex - 1);
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(()=> isPaging = false, 600);
  });
}

/* keyboard arrows */
window.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowDown') goToSlide(currentIndex + 1);
  if(e.key === 'ArrowUp') goToSlide(currentIndex - 1);
});

/* prev/next buttons */
if(prevBtn) prevBtn.addEventListener('click', ()=> goToSlide(currentIndex - 1));
if(nextBtn) nextBtn.addEventListener('click', ()=> goToSlide(currentIndex + 1));

/* sync index on manual scroll */
let scrollTick;
if(slidesContainer){
  slidesContainer.addEventListener('scroll', ()=>{
    clearTimeout(scrollTick);
    scrollTick = setTimeout(()=>{
      const pos = slidesContainer.scrollTop;
      let nearest = 0, minDiff = Infinity;
      slides.forEach((s,i)=>{
        const diff = Math.abs(s.offsetTop - pos);
        if(diff < minDiff){ minDiff = diff; nearest = i; }
      });
      currentIndex = nearest;
      updateDots();
    }, 120);
  });
}

/* on nav-link anchors (in navbar) - if present */
$all('.nav-link').forEach(a => {
  a.addEventListener('click', (ev)=>{
    ev.preventDefault();
    const href = a.getAttribute('href');
    if(!href || !href.startsWith('#')) return;
    const target = $(href);
    if(target) {
      const idx = slides.indexOf(target);
      if(idx >= 0) goToSlide(idx);
    }
  });
});

/* -------------------- Theme toggle -------------------- */
if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
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
}

/* -------------------- Intersection animation for .glass-panel -------------------- */
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

$all('.slide').forEach(s => observer.observe(s));

/* -------------------- CV Generator & PDF -------------------- */
if(cvForm){
  cvForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    generatePreview();
  });
}

if(downloadPdfBtn){
  downloadPdfBtn.addEventListener('click', ()=>{
    // ensure preview exists
    if(!cvPreview || !cvPreview.innerText.trim() || cvPreview.querySelector('.cv-empty')) {
      alert('Silakan generate preview CV terlebih dahulu.');
      return;
    }
    generatePdf();
  });
}

function generatePreview(){
  const name = escapeHtml( $('#name')?.value?.trim() || '' );
  const email = escapeHtml( $('#email')?.value?.trim() || '' );
  const phone = escapeHtml( $('#phone')?.value?.trim() || '' );
  const education = escapeHtml( $('#education')?.value?.trim() || '' );
  const skillsRaw = escapeHtml( $('#skillsInput')?.value?.trim() || '' );
  const experience = escapeHtml( $('#experience')?.value?.trim() || '' );

  const skillsArr = skillsRaw ? skillsRaw.split(',').map(s=>s.trim()).filter(Boolean) : [];

  const html = `
    <div class="cv-content">
      <h2 style="margin:0 0 6px">${name || 'Nama Lengkap'}</h2>
      <p style="margin:0;color:var(--muted)">${education || '-'}</p>

      <div style="margin-top:12px">
        <strong>Kontak</strong>
        <p style="margin:6px 0">${email || '-'} ${phone ? ' • ' + phone : ''}</p>
      </div>

      <div style="margin-top:10px">
        <strong>Skill</strong>
        <p style="margin:6px 0">${skillsArr.length ? escapeHtml(skillsArr.join(', ')) : '-'}</p>
      </div>

      <div style="margin-top:10px">
        <strong>Pengalaman</strong>
        <p style="margin:6px 0">${experience || '-'}</p>
      </div>
    </div>
  `;
  if(cvPreview) cvPreview.innerHTML = html;
}

async function generatePdf(){
  // using jsPDF (already included in index.html)
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({unit:'pt', format:'a4'});
    const lines = cvPreview.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    let y = 40;
    doc.setFontSize(16);
    doc.text('Curriculum Vitae', 40, y);
    y += 26;
    doc.setFontSize(11);
    lines.forEach(line => {
      // basic line wrap - jsPDF will handle some wrapping but keep lines short
      doc.text(line, 40, y);
      y += 16;
      if(y > 770){ doc.addPage(); y = 40; }
    });
    const name = $('#name')?.value?.trim() || 'CV';
    doc.save(`${name.replace(/\s+/g,'_')}_CV.pdf`);
  } catch(err){
    console.error('Error generatePdf:', err);
    alert('Gagal meng-generate PDF (lihat console).');
  }
}

/* -------------------- Init -------------------- */
(function init(){
  // render jobs
  renderJobs();

  // set default theme if none
  if(!document.body.classList.contains('theme-dark') && !document.body.classList.contains('theme-pastel')){
    document.body.classList.add('theme-pastel');
  }

  // ensure first slide visible
  setTimeout(()=> goToSlide(0), 60);
})();
