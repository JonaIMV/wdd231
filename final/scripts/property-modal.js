export function initPropertyModal(properties) {
  const modal = document.getElementById('propertyModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImages = document.getElementById('modalImages');
  const modalDescription = document.getElementById('modalDescription');
  const closeBtn = document.querySelector('.close');

  let currentIndex = 0;
  let currentImages = [];

  // Abre modal
  document.querySelectorAll('.property-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      const property = properties[index];
      modalTitle.textContent = property.title;
      modalDescription.textContent = property.description;
      currentImages = property.images;

      // Generar slider con flechas y puntos
      modalImages.innerHTML = `
        <div class="image-slider">
          <span class="slider-arrow left">&#10094;</span>
          ${currentImages.map((img, i) => `
            <img src="${img}" alt="${property.title}" loading="lazy" class="${i === 0 ? 'active' : ''}">
          `).join('')}
          <span class="slider-arrow right">&#10095;</span>
          <div class="slider-dots">
            ${currentImages.map((_, i) => `
              <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
            `).join('')}
          </div>
        </div>
      `;

      currentIndex = 0;
      modal.style.display = 'block';
      initSliderControls();
    });
  });

  // Cerrar modal
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Funciones de control de slider
  function initSliderControls() {
    const imgs = modalImages.querySelectorAll('img');
    const dots = modalImages.querySelectorAll('.dot');

    function showImage(index) {
      imgs.forEach((img, i) => img.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      currentIndex = index;
    }

    modalImages.querySelector('.slider-arrow.left').addEventListener('click', () => {
      let newIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      showImage(newIndex);
    });

    modalImages.querySelector('.slider-arrow.right').addEventListener('click', () => {
      let newIndex = (currentIndex + 1) % currentImages.length;
      showImage(newIndex);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        let index = parseInt(dot.dataset.index);
        showImage(index);
      });
    });
  }
}
