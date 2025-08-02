import { loadMembers } from './members.js';
import { setupViewToggle } from './viewToggle.js';
import { highlightCurrentPage, setHamburgerMenu } from './wayfinding.js';
import { getWeather } from './weather.js';
import { loadSpotlights } from './spotlights.js';
import { loadPlaces } from './discover.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Load Members if on directory page
  const memberContainer = document.getElementById("memberContainer");
  if (memberContainer) {
    loadMembers("memberContainer");
    setupViewToggle("memberContainer");
  }

  // Load Spotlights if available
  const spotlightContainer = document.getElementById("spotlight-container");
  if (spotlightContainer) {
    loadSpotlights("spotlight-container");
  }

  // Highlight nav and hamburger toggle
  highlightCurrentPage();
  setHamburgerMenu();

  // Load weather info
  getWeather();

  // Load Join Us logic
  if (window.location.pathname.endsWith("join.html")) {
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

  // Load Thank You page logic
  if (window.location.pathname.endsWith("thankyou.html")) {
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

  // Set Last Modified and Current Year
  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Load Discover page places
  const placesContainer = document.getElementById("places-container");
  if (placesContainer) {
    loadPlaces("places-container");
  }
});
