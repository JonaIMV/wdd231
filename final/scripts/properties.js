export async function loadProperties(containerId, jsonUrl) {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const properties = await response.json();
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id ${containerId} not found.`);
      return;
    }

    container.innerHTML = ''; // Limpia contenido previo

    properties.forEach(prop => {
      const card = document.createElement('div');
      card.classList.add('property-card');
      card.dataset.propId = prop.id; // agrega id para mejor referencia

      card.innerHTML = `
        <img src="${prop.image}" alt="${prop.alt}" loading="lazy" />
        <h4>${prop.title}</h4>
        <p>${prop.description}</p>
        <p class="price">${prop.price}</p>
        <p class="location">${prop.location}</p>
      `;

      container.appendChild(card);
    });

    return properties; // **devuelve el array de propiedades**

  } catch (error) {
    console.error('Error loading properties:', error);
  }
}
