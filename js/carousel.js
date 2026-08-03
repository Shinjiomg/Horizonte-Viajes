function initHeroCarousel() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const indicators = [...carousel.querySelectorAll('[data-indicator]')];
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  let current = 0;
  let timer;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('opacity-100', i === current);
      slide.classList.toggle('opacity-0', i !== current);
      slide.classList.toggle('z-10', i === current);
      slide.classList.toggle('z-0', i !== current);
    });
    indicators.forEach((dot, i) => {
      dot.classList.toggle('w-14', i === current);
      dot.classList.toggle('bg-accent', i === current);
      dot.classList.toggle('w-10', i !== current);
      dot.classList.toggle('bg-white/45', i !== current);
    });
  }

  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  indicators.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAutoplay(); }));
  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', startAutoplay);

  goTo(0);
  startAutoplay();
}

document.addEventListener('DOMContentLoaded', initHeroCarousel);
