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

// Animate timeline items with stagger
function animateTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach((item, i) => {
    const rect = item.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 80 && !item.classList.contains('visible')) {
      setTimeout(() => {
        item.classList.add('visible');
      }, i * 200);
    }
  });
}

// Intersection Observer for counters/progress
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
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

// Timeline animation on scroll
window.addEventListener('scroll', animateTimeline);
window.addEventListener('load', animateTimeline);
animateTimeline();
