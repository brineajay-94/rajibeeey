// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
  }
});

// Animate number counters
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (!target || el.dataset.animated) return;
  el.dataset.animated = true;

  let current = 0;
  const increment = Math.ceil(target / 60);
  const step = () => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      return;
    }
    el.textContent = current.toLocaleString();
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Animate progress bars
function animateProgress(el) {
  const percent = parseInt(el.dataset.percent);
  if (!percent || el.dataset.animated) return;
  el.dataset.animated = true;
  el.style.width = percent + '%';
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate counters
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      // Animate progress fills
      entry.target.querySelectorAll('[data-percent]').forEach(animateProgress);
    }
  });
}, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

// Observe sections with animations
document.querySelectorAll('.hero, .about-section, .games-section').forEach(section => {
  observer.observe(section);
});

// Hero progress starts immediately since it's visible on load
setTimeout(() => {
  document.querySelectorAll('.hero [data-percent]').forEach(animateProgress);
  document.querySelectorAll('.hero [data-target]').forEach(animateCounter);
}, 300);
