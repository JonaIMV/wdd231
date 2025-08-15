import { initMenuToggle } from './menuToggle.js';
import { highlightCurrentPage } from './wayFinding.js';
import { initHeroSlider } from './hero-slide.js';
import { initPropertyCarousel } from './property-carousel.js';
import { loadProperties } from './properties.js';
import { initPropertyModal, showLastViewedProperty } from './property-modal.js';
import { loadExchangeRates } from './exchange-rates.js';
import { initContactForm } from './form-handler.js';
import { initThankYouPage } from './thankyou.js';

document.addEventListener("DOMContentLoaded", async () => {
  initMenuToggle();
  highlightCurrentPage();
  initHeroSlider();
  initPropertyCarousel();

  
  if (
    document.getElementById('usd-rate') ||
    document.getElementById('eur-rate') ||
    document.getElementById('cad-rate')
  ) {
    loadExchangeRates();
  }

  initContactForm();

  if (window.location.pathname.endsWith('thankyou.html')) {
    initThankYouPage();
  }

  
  const propertiesContainer = document.getElementById('properties-container');
  if (propertiesContainer) {
    const properties = await loadProperties('properties-container', 'data/forSale.json');
    if (properties) {
      initPropertyModal(properties);
    }
  }

  
  const lastViewedContainer = document.getElementById('lastViewedPropertyContainer');
  if (lastViewedContainer) {
    showLastViewedProperty();
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
