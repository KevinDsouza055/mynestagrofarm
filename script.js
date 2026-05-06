/* ============================================================
   MY NEST AGRO FARM RESORT — Main JavaScript
   ============================================================ */

/* ─── Navbar ─── */
(function() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.nav-overlay');

  // Scroll behaviour
  function handleScroll() {
    if (navbar) {
      if (window.scrollY > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav && mobileNav.classList.toggle('open');
      overlay && overlay.classList.toggle('open');
      document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
})();

/* ─── Fade-In on Scroll ─── */
(function() {
  const faders = document.querySelectorAll('.fade-in');
  if (!faders.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  faders.forEach(el => observer.observe(el));
})();

/* ─── Testimonial Slider ─── */
(function() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.t-dot');
  let current = 0, autoTimer;

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(autoTimer); goTo(i); startAuto(); }));

  function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 4500); }
  startAuto();
})();

/* ─── Room Image Sliders ─── */
(function() {
  document.querySelectorAll('.room-full-card').forEach(card => {
    const slider = card.querySelector('.room-slider');
    if (!slider) return;
    const slides = slider.querySelectorAll('.room-slide');
    const prev = card.querySelector('.slider-prev');
    const next = card.querySelector('.slider-next');
    let idx = 0;

    function goTo(n) {
      idx = (n + slides.length) % slides.length;
      slider.style.transform = `translateX(-${idx * 100}%)`;
    }
    prev?.addEventListener('click', () => goTo(idx - 1));
    next?.addEventListener('click', () => goTo(idx + 1));
  });
})();

/* ─── Gallery Filter & Lightbox ─── */
(function() {
  // Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = cat === 'all' || item.dataset.category === cat;
        item.style.display = show ? '' : 'none';
        item.style.animation = show ? 'fadeInUp 0.4s ease both' : '';
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbContent = document.getElementById('lb-content');
  const lbCaption = document.getElementById('lb-caption');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox) return;
      lbContent.textContent = item.querySelector('.g-ph')?.textContent || '🌿';
      lbCaption.textContent = item.dataset.caption || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('lb-close')?.addEventListener('click', closeLb);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });

  function closeLb() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
})();

/* ─── Contact Form ─── */
(function() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const checkin = form.querySelector('[name="checkin"]')?.value || '';
    const checkout = form.querySelector('[name="checkout"]')?.value || '';
    const guests = form.querySelector('[name="guests"]')?.value || '';
    const msg = form.querySelector('[name="message"]')?.value || '';

    const wa = `Hello! I'd like to book a stay at My Nest Agro Farm Resort.%0A%0A` +
      `Name: ${name}%0APhone: ${phone}%0ACheck-in: ${checkin}%0ACheck-out: ${checkout}%0AGuests: ${guests}%0AMessage: ${msg}`;

    window.open(`https://wa.me/918879170570?text=${wa}`, '_blank');
  });
})();

/* ─── WhatsApp & Call Floating Buttons ─── */
(function() {
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.addEventListener('click', () => window.open('https://wa.me/918879170570', '_blank'));
  });
  document.querySelectorAll('[data-call]').forEach(el => {
    el.addEventListener('click', () => window.location.href = 'tel:+918879170570');
  });
})();
