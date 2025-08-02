import { loadMembers } from './members.js';
import { setupViewToggle } from './viewToggle.js';
import { highlightCurrentPage, setHamburgerMenu } from './wayfinding.js';
import { getWeather } from './weather.js';
import { loadSpotlights } from './spotlights.js';
import { loadPlaces } from './discover.js';
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const memberContainer = document.getElementById("memberContainer"); // Load Members if on directory page
  if (memberContainer) {
    loadMembers("memberContainer");
    setupViewToggle("memberContainer");
  }
  const spotlightContainer = document.getElementById("spotlight-container");// Load Spotlights if available
  if (spotlightContainer) {
    loadSpotlights("spotlight-container");
  }
  highlightCurrentPage();// Highlight nav and hamburger toggle
  setHamburgerMenu();

  getWeather();

  if (window.location.pathname.endsWith("join.html")) {  // Load Join Us logic
    import("./join-us.js")
      .then(module => {
        if (module.initJoinPage) {
          module.initJoinPage();
        }
      })
      .catch(err => {
        console.error("Failed to load join-us.js module:", err);
      });
  }
  if (window.location.pathname.endsWith("thankyou.html")) {  // Load Thank You page logic
    import("./join-us.js")
      .then(module => {
        if (module.initThankYouPage) {
          module.initThankYouPage();
        }
      })
      .catch(err => {
        console.error("Failed to load thankyou page module:", err);
      });
  }
  const lastModifiedEl = document.getElementById("lastModified"); // Set Last Modified and Current Year
  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  const placesContainer = document.getElementById("places-container"); // Load Discover page places
  if (placesContainer) {
    loadPlaces("places-container");
  }
});
