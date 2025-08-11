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

  // Solo cargar tasas de cambio si existen los elementos correspondientes
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

  // Solo cargar propiedades si existe el contenedor
  const propertiesContainer = document.getElementById('properties-container');
  if (propertiesContainer) {
    const properties = await loadProperties('properties-container', 'data/forSale.json');
    if (properties) {
      initPropertyModal(properties);
    }
  }

  // Mostrar última propiedad vista si existe el contenedor
  const lastViewedContainer = document.getElementById('lastViewedPropertyContainer');
  if (lastViewedContainer) {
    showLastViewedProperty();
  }

  // Actualizar fecha de última modificación si existe elemento
  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }

  // Actualizar año actual si existe elemento
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
