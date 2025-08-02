
export async function loadMembers(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Failed to fetch members: ${response.statusText}`);
    const members = await response.json();
    container.innerHTML = ''; 
    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');
      card.innerHTML = `
        <h3>${member.name}</h3>
        <p class="tagline">Membership level: ${member.membership}</p>
        <img src="images/${member.image}" alt="${member.name} logo" />
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading members:', error);
    container.textContent = 'Failed to load members data.';
  }
}
