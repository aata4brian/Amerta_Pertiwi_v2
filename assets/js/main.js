(() => {
  document.documentElement.classList.remove('no-js');
  const config = window.PATAKBANTENG_CONFIG || {};
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // Menu ponsel
  const menuToggle = $('.menu-toggle');
  const mainNav = $('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.classList.toggle('open');
      mainNav.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  $$('.dropdown-toggle').forEach(button => {
    button.addEventListener('click', event => {
      if (window.innerWidth <= 1100) {
        event.preventDefault();
        const item = button.closest('.nav-item');
        const open = item.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
      }
    });
  });

  document.addEventListener('click', event => {
    if (window.innerWidth > 1100) return;
    if (!event.target.closest('.site-header') && mainNav?.classList.contains('open')) menuToggle?.click();
  });

  // Tandai menu aktif berdasarkan nama file.
  const current = location.pathname.split('/').pop() || 'index.html';
  $$('[data-page]').forEach(link => {
    const pages = (link.dataset.page || '').split(',');
    if (pages.includes(current)) link.classList.add('active');
  });

  // Tombol WhatsApp memakai config pusat agar mudah diperbarui.
  $$('[data-wa]').forEach(link => {
    const key = link.dataset.wa;
    const number = config.whatsapp?.[key];
    const message = link.dataset.message || 'Halo, saya ingin meminta informasi tentang Desa Wisata Patakbanteng.';
    if (number) {
      link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      link.target = '_blank'; link.rel = 'noopener';
    } else {
      link.href = 'kontak.html#direktori-kontak';
      link.title = 'Nomor resmi belum diisi. Lihat direktori kontak.';
    }
  });

  // Tombol peta memakai config; fallback tetap menuju bagian peta di halaman perjalanan.
  $$('[data-map]').forEach(link => {
    const url = config.maps?.[link.dataset.map];
    if (url) { link.href = url; link.target = '_blank'; link.rel = 'noopener'; }
    else { link.href = 'perjalanan.html#peta'; link.title = 'Tautan Google Maps resmi belum diisi.'; }
  });

  // Media sosial kosong tidak dibuat menjadi tautan rusak.
  $$('[data-social]').forEach(link => {
    const url = config.social?.[link.dataset.social];
    if (url) { link.href = url; link.target = '_blank'; link.rel = 'noopener'; }
    else { link.href = 'kontak.html'; link.title = 'Tautan media sosial resmi belum diisi.'; }
  });

  // Video profil hanya dibuka jika URL resmi telah diisi.
  const videoPlay = $('[data-video-profile]');
  if (videoPlay) {
    videoPlay.addEventListener('click', () => {
      if (config.videoProfilYoutube) window.open(config.videoProfilYoutube, '_blank', 'noopener');
      else alert('Tautan video profil YouTube belum diisi pada assets/js/config.js.');
    });
  }

  // Reveal ringan saat elemen masuk layar.
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    reveals.forEach(item => observer.observe(item));
  } else reveals.forEach(item => item.classList.add('visible'));

  // Accordion.
  $$('.accordion-button').forEach(button => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
  }));

  // Filter kartu.
  $$('.filter-bar').forEach(bar => {
    const target = document.getElementById(bar.dataset.target);
    if (!target) return;
    $$('.filter-btn', bar).forEach(button => button.addEventListener('click', () => {
      $$('.filter-btn', bar).forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      $$('.filter-item', target).forEach(item => item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter));
    }));
  });

  // Lightbox galeri.
  const lightbox = $('.lightbox');
  if (lightbox) {
    const lightboxImage = $('img', lightbox);
    const close = () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; };
    $$('.gallery-item').forEach(button => button.addEventListener('click', () => {
      lightboxImage.src = $('img', button).src;
      lightboxImage.alt = $('img', button).alt;
      lightbox.classList.add('open'); document.body.style.overflow = 'hidden';
    }));
    $('.lightbox-close', lightbox)?.addEventListener('click', close);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  // Form kontak statis: arahkan isi ke WhatsApp jika nomor telah tersedia.
  const contactForm = $('#contact-form');
  if (contactForm) contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const message = `Halo, saya ${data.get('nama')}.\nKategori: ${data.get('kategori')}\nKontak: ${data.get('kontak')}\n\n${data.get('pesan')}`;
    const number = config.whatsapp?.pusatInformasi;
    if (number) window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    else alert('Formulir sudah siap, tetapi nomor WhatsApp pusat informasi belum diisi pada assets/js/config.js.');
  });

  // Tombol kembali ke atas dan tahun.
  const topButton = $('.back-to-top');
  window.addEventListener('scroll', () => topButton?.classList.toggle('show', scrollY > 600), { passive: true });
  topButton?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  $$('[data-year]').forEach(item => item.textContent = new Date().getFullYear());
})();
