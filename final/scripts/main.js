import { initMenuToggle } from './menuToggle.js';
import { highlightCurrentPage } from './wayFinding.js';
import { initHeroSlider } from './hero-slide.js';
import { initPropertyCarousel } from './property-carousel.js';
import { loadProperties } from './properties.js';
import { initPropertyModal } from './property-modal.js';
import { loadExchangeRates } from './exchange-rates.js';

document.addEventListener("DOMContentLoaded", async () => {

  initMenuToggle();
  highlightCurrentPage();
  initHeroSlider();
  initPropertyCarousel();

  // Solo carga tasas si está el contenedor de tasas
  if (document.getElementById("rates-list")) {
    loadExchangeRates();
  }

  // Solo carga propiedades si está el contenedor de properties
  if (document.getElementById("properties-container")) {
    const properties = await loadProperties('properties-container', 'data/forSale.json');
    if (properties) {
      initPropertyModal(properties);
    }
  }

  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

