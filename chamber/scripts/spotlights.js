
export async function loadSpotlights(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }

  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`Failed to fetch members: ${response.status}`);

    const members = await response.json();

    
    const filtered = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

    if (filtered.length === 0) {
      container.textContent = "No Gold or Silver members found.";
      return;
    }

    
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(3, filtered.length));

    container.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p><strong>Membership:</strong> ${member.membership}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
    container.textContent = "Failed to load spotlights.";
  }
}
