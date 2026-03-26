// ================================
// main.js — Nav, Typing, Scroll FX
// ================================

// ---- Responsive nav ----
const hambtn = document.getElementById('hambtn');
const navLinks = document.getElementById('navLinks');
if (hambtn) {
  hambtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ---- Typing effect (hero) ----
(function typing() {
  const el = document.querySelector('.words');
  if (!el) return;
  const words = ['Software Engineering Student', 'Web Developer', 'UI/UX Designer'];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    el.textContent = words[i];
  }, 2500);
})();

// ---- Smooth scrolling for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    // close mobile nav if open
    if (navLinks) navLinks.classList.remove('open');
  });
});

// ---- Intersection Observer — scroll animations ----
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(
    '.card, .highlight-item, .portfolio-item, .about-photo, .contact-card, .contact-info, .footer-section'
  ).forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
});

// ---- Contact form handler ----
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    if (!name || !email || !message) { alert('Mohon isi semua field'); return; }

    const subject = `Portfolio Contact from ${name}`;
    const body    = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.location.href = `mailto:zazizahara@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
});

// ---- Close modal on outside click ----
window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal').forEach(m => {
    if (m.style.display === 'flex' && e.target === m) m.style.display = 'none';
  });
});
