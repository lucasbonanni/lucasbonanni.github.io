/* ==========================================================================
   Lucas Bonanni — Personal Website / main.js
   Handles: dark mode, mobile nav, parallax, scroll animations, filters, form
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. DARK MODE
     -------------------------------------------------------------------------- */
  const THEME_KEY = 'lb-theme';
  const html = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    // Update all toggle buttons on the page
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    applyTheme(saved || getSystemTheme());
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme') || getSystemTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Watch OS preference changes (only applies when no manual override)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  initTheme();

  /* --------------------------------------------------------------------------
     2. MOBILE NAV + HAMBURGER
     -------------------------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const hamburger = nav.querySelector('.nav__hamburger');
    const links = nav.querySelector('.nav__links');

    if (!hamburger || !links) return;

    hamburger.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      nav.classList.toggle('nav--open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when any link is clicked
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        nav.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close nav on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        links.classList.remove('open');
        nav.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Wire theme toggles
    nav.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  }

  /* --------------------------------------------------------------------------
     3. PARALLAX — JS-driven for iOS compatibility
     The .hero-full__bg div gets background-attachment:fixed on desktop,
     but on touchscreen devices we drive it with transform instead.
     -------------------------------------------------------------------------- */
  function initParallax() {
    const heroBg = document.querySelector('.hero-full__bg');
    if (!heroBg) return;

    // Only engage JS parallax on pointer:coarse (touch) devices where
    // background-attachment:fixed is unreliable.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;

    // JS parallax via translate for mobile
    heroBg.style.backgroundAttachment = 'scroll';
    heroBg.style.willChange = 'transform';

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --------------------------------------------------------------------------
     4. SCROLL ANIMATIONS — IntersectionObserver
     -------------------------------------------------------------------------- */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    // Skip animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     5. FILTER BAR — project / blog cards
     Expects .filter-btn[data-filter] and .filterable[data-category]
     -------------------------------------------------------------------------- */
  function initFilters() {
    document.querySelectorAll('.filter-bar').forEach(bar => {
      const btns = bar.querySelectorAll('.filter-btn');
      if (!btns.length) return;

      // Container for the cards is identified by data-filter-target on the bar
      const targetId = bar.getAttribute('data-filter-target');
      const container = targetId
        ? document.getElementById(targetId)
        : bar.closest('section, .section');

      if (!container) return;
      const cards = container.querySelectorAll('.filterable');

      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active state
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-filter');

          cards.forEach(card => {
            if (filter === 'all') {
              card.classList.remove('hidden');
            } else {
              const cats = card.getAttribute('data-category') || '';
              card.classList.toggle('hidden', !cats.includes(filter));
            }
          });
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. CONTACT FORM
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const formWrap = form.closest('.form-wrap');
    const submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener('submit', e => {
      e.preventDefault();

      // Validate required fields
      let hasError = false;
      form.querySelectorAll('[required]').forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          hasError = true;
        }
      });

      // Basic email validation
      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value.trim())) {
          emailField.classList.add('error');
          hasError = true;
        }
      }

      if (hasError) {
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Disable button and show loading state
      submitBtn.disabled = true;
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending…';

      // Simulate async send (replace with real fetch when backend is ready)
      setTimeout(() => {
        if (formWrap) formWrap.classList.add('submitted');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }, 1100);
    });

    // Clear error state on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
    });
  }

  function resetForm() {
    const formWrap = document.querySelector('.form-wrap.submitted');
    if (!formWrap) return;
    const form = formWrap.querySelector('#contact-form');
    if (form) form.reset();
    formWrap.classList.remove('submitted');
  }

  // Expose resetForm globally for the "Send another" button
  window.resetForm = resetForm;

  /* --------------------------------------------------------------------------
     7. ACTIVE NAV LINK
     Sets .active on the nav link matching the current page filename.
     -------------------------------------------------------------------------- */
  function setActiveNavLink() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav__links a').forEach(a => {
      const href = a.getAttribute('href') || '';
      // Match filename
      const hrefFile = href.split('/').pop().split('?')[0];
      const pathFile = path.split('/').pop().split('?')[0];

      if (
        (pathFile === '' || pathFile === 'index.html') && (hrefFile === 'index.html' || href === '/') ||
        hrefFile && hrefFile !== 'index.html' && pathFile === hrefFile
      ) {
        a.classList.add('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. INIT
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initParallax();
    initScrollAnimations();
    initFilters();
    initContactForm();
    setActiveNavLink();
  });

})();
