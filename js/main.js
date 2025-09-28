// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for reveal-on-scroll + active nav link
const panels = document.querySelectorAll('.panel');
const navLinks = document.querySelectorAll('.site-nav a');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      const id = entry.target.getAttribute('id');
      if (id) {
        navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
      }
    }
  });
}, { threshold: 0.35 });

panels.forEach((p) => io.observe(p));

// Lightbox (accessible, minimal)
const lb = document.getElementById('lightbox');
const lbImg = document.querySelector('.lb-image');
const lbCap = document.querySelector('.lb-caption');
const lbClose = document.querySelector('.lb-close');

function openLightbox(src, caption = '') {
  lbImg.src = src;
  lbImg.alt = caption || '';
  lbCap.textContent = caption || '';
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lbClose.focus();
}

function closeLightbox() {
  lb.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const img = e.target.closest('.art img');
  if (img) {
    const src = img.getAttribute('src');
    const cap = img.getAttribute('data-lightbox') || img.alt || '';
    openLightbox(src, cap);
  }
  if (e.target.closest('.lb-close') || e.target === lb) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (lb.getAttribute('aria-hidden') === 'false' && (e.key === 'Escape' || e.key === 'Esc')) {
    closeLightbox();
  }
});

// Respect aria-disabled on demo buttons/links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[aria-disabled="true"]');
  if (a) e.preventDefault();
});
