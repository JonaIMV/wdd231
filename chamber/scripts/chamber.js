document.addEventListener("DOMContentLoaded", () => {
  // Ensure the DOM is ready
  const membersContainer = document.getElementById("memberContainer");

  if (!membersContainer) {
    console.error("Member container not found!");
    return;
  }

  async function getMembers() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error(`Failed to fetch members: ${response.statusText}`);

      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  }

  function displayMembers(members) {
    const membersContainer = document.getElementById("memberContainer");
    if (!membersContainer) {
      console.error("The member container is not present.");
      return;
    }

    membersContainer.innerHTML = ''; 
    members.forEach(member => {
      const memberCard = document.createElement("div");
      memberCard.classList.add("member-card");

      memberCard.innerHTML = `
        <h3>${member.name}</h3>
        <p class="tagline">${member.membershipLevel}</p>
        <img src="images/${member.image}" alt="${member.name} Logo" />
        <p><strong>Email:</strong> ${member.email}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      `;

      membersContainer.appendChild(memberCard);
    });
  }

  
  getMembers();

  
  const gridViewButton = document.getElementById("gridView");
  const listViewButton = document.getElementById("listView");

  gridViewButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
  });

  listViewButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
  });
});
