export function initHeroSlider(interval = 5000) {
  const slides = document.querySelectorAll(".slide");
  if (slides.length <= 1) return;

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("active");

    current = (current + 1) % slides.length;

    slides[current].classList.add("active");
  }, interval);
}
