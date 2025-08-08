let currentIndex = 0;
let properties = [];

function createCard(property) {
  return `
    <div class="property-card">
      <img src="${property.image}" alt="${property.title}" loading="lazy">
      <h3>${property.title}</h3>
      <p><strong>${property.location}</strong></p>
      <p>${property.description}</p>
      <p class="price">${property.price}</p>
    </div>
  `;
}

function renderCards(container) {
  const cardsToShow = properties.slice(currentIndex, currentIndex + 2);
  // Loop back to start if at end
  if (cardsToShow.length < 2) {
    cardsToShow.push(...properties.slice(0, 2 - cardsToShow.length));
  }

  container.innerHTML = cardsToShow.map(createCard).join("");
  currentIndex = (currentIndex + 2) % properties.length;
}

export async function initPropertyCarousel() {
  const container = document.getElementById("property-carousel");
  if (!container) return;

  try {
    const res = await fetch("data/properties.json");
    properties = await res.json();

    renderCards(container);
    setInterval(() => renderCards(container), 5000); // Change every 5s
  } catch (error) {
    console.error("Error loading properties:", error);
  }
}
    