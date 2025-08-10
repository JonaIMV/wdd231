export function initPropertyModal(properties) {
  const modal = document.getElementById('propertyModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImages = document.getElementById('modalImages');
  const modalDescription = document.getElementById('modalDescription');
  const closeBtn = document.querySelector('.close');

  let currentIndex = 0;
  let currentImages = [];

  document.querySelectorAll('.property-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      const property = properties[index];
      modalTitle.textContent = property.title;
      modalDescription.textContent = property.description;
      currentImages = property.images;

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
      localStorage.setItem('lastViewedProperty', JSON.stringify(property));
      initSliderControls();
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  function initSliderControls() {
    const slider = modalImages.querySelector('.image-slider');
    const images = slider.querySelectorAll('img');
    const leftArrow = slider.querySelector('.slider-arrow.left');
    const rightArrow = slider.querySelector('.slider-arrow.right');
    const dots = slider.querySelectorAll('.dot');

    function showSlide(index) {
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;
      currentIndex = index;

      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    leftArrow.onclick = () => showSlide(currentIndex - 1);
    rightArrow.onclick = () => showSlide(currentIndex + 1);
    dots.forEach(dot => {
      dot.onclick = () => showSlide(Number(dot.dataset.index));
    });

    showSlide(currentIndex);
    }
    
}
export function showLastViewedProperty() {
  const container = document.getElementById('lastViewedPropertyContainer');
  if (!container) return;

  const lastViewed = localStorage.getItem('lastViewedProperty');
  if (!lastViewed) {
    container.innerHTML = '<p>No property viewed yet.</p>';
    return;
  }

  const property = JSON.parse(lastViewed);
  container.innerHTML = `
    <h2>Last Viewed Property</h2>
    <div class="last-viewed-property-card">
      <img src="${property.image || (property.images && property.images[0]) || 'images/placeholder.png'}" 
           alt="${property.title}" loading="lazy">
      <div class="last-viewed-property-info">
        <h3>${property.title}</h3>
        <p>${property.description}</p>
        <p class="price">${property.price || 'N/A'}</p>
      </div>
    </div>
  `;
}



