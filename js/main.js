/* ============================================================
   MAIN.JS — Interactions globales du portfolio
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────
     1. NAVBAR — Ombre au scroll
  ────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });


  /* ──────────────────────────────────────
     2. HAMBURGER — Menu mobile
  ────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Fermer le menu en cliquant sur un lien
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });


  /* ──────────────────────────────────────
     3. ACTIVE NAV LINK — Suivi de section
  ────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-center a');

  const markActive = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 110) current = s.id;
    });
    navAs.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', markActive, { passive: true });
  markActive();


  /* ──────────────────────────────────────
     4. SCROLL REVEAL — Animations entrée
  ────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 90);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll('.fade-up').forEach(el => revealObs.observe(el));


  /* ──────────────────────────────────────
     5. PROJECT FILTER — Filtres par catégorie
  ────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.f-btn');
  const projCards  = document.querySelectorAll('.proj-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle actif
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projCards.forEach(card => {
        const cats = card.dataset.cat || '';
        const show = filter === 'all' || cats.includes(filter);

        if (show) {
          card.style.display = 'flex';
          // Micro-animation apparition
          requestAnimationFrame(() => {
            card.style.opacity   = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity    = '1';
              card.style.transform  = 'translateY(0)';
            });
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


 /* ──────────────────────────────────────
     6. CONTACT FORM — Feedback envoi
  ────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', () => {
    const btn = contactForm.querySelector('[type=submit]');
    btn.innerHTML = '<i class="fa fa-check fa-xs"></i> Envoi en cours...';
    btn.disabled = true;
  });


  /* ──────────────────────────────────────
     7. DOC LINKS — Placeholder si pas de fichier
  ────────────────────────────────────── */
  document.querySelectorAll('.doc-link[data-placeholder], .stage-doc-link[data-placeholder]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const label = link.querySelector('.doc-label')?.textContent || 'Ce fichier';
      alert(`📄 ${label}\n\nRemplace le href="#" par le vrai chemin vers ton fichier PDF.\nEx : href="assets/docs/rapport-jurisnova.pdf"`);
    });
  });

});
