const yearSpan = document.getElementById("year");
const lastModifiedP = document.getElementById("lastModified");

const now = new Date();
yearSpan.textContent = now.getFullYear();


const modDate = new Date(document.lastModified);
const formattedDate = modDate.toLocaleString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

lastModifiedP.textContent = `Last Modification: ${formattedDate}`;


const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

