export async function loadPlaces(containerId) {
  try {
    const response = await fetch('data/places.json');
    if (!response.ok) throw new Error('Failed to fetch places data');
    const data = await response.json();
    const container = document.getElementById(containerId);
    if (!Array.isArray(data)) throw new Error("Expected data to be an array");
    data.forEach(place => {
      const card = document.createElement('div');
      card.classList.add('place-card');
      const image = document.createElement('img');
      image.src = place.image;
      image.alt = `Image of ${place.name}`;
      image.loading = 'lazy';
      image.classList.add('gallery-img');
      image.width = 245;
      image.height = 150;
      const info = document.createElement('div');
      info.classList.add('place-info');
      const title = document.createElement('h2');
      title.textContent = place.name;
      const address = document.createElement('address');
      address.textContent = place.location;
      const desc = document.createElement('p');
      desc.textContent = place.description;
      const button = document.createElement('button');
      button.textContent = 'Learn more';
      info.appendChild(title);
      info.appendChild(address);
      info.appendChild(desc);
      info.appendChild(button);
      card.appendChild(image);
      card.appendChild(info);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading places:', error);
  }
}
