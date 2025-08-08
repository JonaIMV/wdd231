

import { initMenuToggle } from './menuToggle.js';
import { highlightCurrentPage } from './wayFinding.js';
import { initHeroSlider } from './hero-slide.js';
import { initPropertyCarousel } from './property-carousel.js';
document.addEventListener("DOMContentLoaded", () => {
    initMenuToggle();
    highlightCurrentPage();
    initHeroSlider();
  initPropertyCarousel();
  
  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Puedes agregar más funciones aquí si luego importas otros módulos
});
