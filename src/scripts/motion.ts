// Progressive enhancement: all content is visible before, during and without JS.
const html = document.documentElement;
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
const toggles = [...document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]')];
let paused = false;
const entrances = new Set<Animation>();
const running = () => !paused && !preference.matches;

function syncMotion() {
  html.dataset.motion = preference.matches ? 'reduced' : paused ? 'paused' : 'running';
  html.dataset.pageVisible = String(!document.hidden);
  if (!running()) entrances.forEach(animation => animation.finish());
  toggles.forEach(button => {
    button.hidden = preference.matches;
    button.setAttribute('aria-pressed', String(paused));
    button.querySelector('span')!.textContent = paused ? 'Play motion' : 'Pause motion';
  });
  document.dispatchEvent(new CustomEvent('unified:motion-change'));
}
toggles.forEach(button => button.addEventListener('click', () => { paused = !paused; syncMotion(); }));
preference.addEventListener('change', syncMotion);
document.addEventListener('visibilitychange', () => { html.dataset.pageVisible = String(!document.hidden); });
syncMotion();

function enter(element: Element, delay = 0) {
  if (!running() || !('animate' in element)) return;
  const isArt = element.matches('.connection-art, .industry-art, .content-story');
  const isRow = element.matches('.service-index article, .industry-preview a, .approach-list li');
  const animation = element.animate([
    { transform: isArt ? 'translateY(22px) scale(.97)' : isRow ? 'translateX(-22px)' : 'translateY(24px)' },
    { transform: 'none' },
  ], { duration: isArt ? 900 : 720, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
  entrances.add(animation);
  animation.finished.finally(() => entrances.delete(animation));
}

if ('IntersectionObserver' in window) {
  const entranceObserver = new IntersectionObserver(entries => {
    let stagger = 0;
    for (const entry of entries) if (entry.isIntersecting) {
      enter(entry.target, (stagger++ % 4) * 75);
      entranceObserver.unobserve(entry.target);
    }
  }, { threshold: .06, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll([
    '.section-heading > *', '.service-index article', '.journey-steps li',
    '.industry-preview a', '.industry-art', '.approach-feature > div',
    '.home-faq-grid > div:first-child', '.city-pair a', '.partnership-strip > *',
    '.cta-inner > *', '.page-intro .container > *', '.service-detail-heading > *',
    '.industry-card', '.approach-list li', '.location-card', '.partnership-grid > *',
    '.partner-capabilities a', '.footer-main > div',
  ].join(',')).forEach(element => entranceObserver.observe(element));

  // Animation clocks only run for artwork currently on screen.
  const artworkObserver = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.classList.toggle('motion-in-view', entry.isIntersecting);
  }, { threshold: .08 });
  document.querySelectorAll('.connection-art').forEach(element => artworkObserver.observe(element));
}

document.addEventListener('unified:scenario-change', event => {
  const panel = (event as CustomEvent<HTMLElement>).detail;
  panel.querySelectorAll('.scenario-copy, .connection-art').forEach((element, index) => enter(element, index * 80));
});
document.querySelectorAll<HTMLDetailsElement>('.faq-list details, .mobile-nav').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      const body = details.querySelector('p, nav');
      if (body) enter(body);
    }
  });
});
