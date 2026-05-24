
gsap.registerPlugin(ScrollTrigger);

// ── THEME TOGGLE ──
const toggle = document.getElementById('themeToggle');
let dark = false;
toggle.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  toggle.textContent = dark ? '☀️' : '🌙';
});

// ── HERO PARALLAX ──
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroBg.style.transform = `scale(1.05) translateY(${y * 0.3}px)`;
}, { passive: true });

// ── HERO ENTRANCE ──
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.to('#heroEyebrow', { opacity: 1, duration: 0.8, delay: 0.3 })
  .to('#heroTitle',   { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
  .to('#heroSub',     { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
  .to('#heroCta',     { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
  .to('#heroScroll',  { opacity: 1, duration: 0.6 }, '-=0.2');

gsap.set('#heroTitle, #heroSub, #heroCta', { y: 28 });

// ── SCROLL REVEALS ──
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 28 },
    {
      opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    }
  );
});

gsap.utils.toArray('.reveal-left').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, x: -36 },
    {
      opacity: 1, x: 0, duration: 0.85, ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
});

gsap.utils.toArray('.reveal-right').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, x: 36 },
    {
      opacity: 1, x: 0, duration: 0.85, ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
});

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) {
    navbar.style.padding = '14px 48px';
  } else {
    navbar.style.padding = '20px 48px';
  }
}, { passive: true });

// ── CAPSULE TIMER ──
function updateTimer() {
  const unlock = new Date('2026-01-12T12:00:00');
  const now = new Date();
  const diff = unlock - now;
  if (diff <= 0) {
    document.getElementById('capsuleTimer').textContent = 'Ready to open';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  document.getElementById('capsuleTimer').textContent = `${d}d ${h}h ${m}m`;
}
updateTimer();
setInterval(updateTimer, 60000);

// ── BENTO HOVER TILT ──
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 4,
      rotateX: -y * 4,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 1000
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
  });
});
