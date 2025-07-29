import { loadMembers } from './members.js';
import { setupViewToggle } from './viewToggle.js';
import { highlightCurrentPage, setHamburgerMenu } from './wayfinding.js';
import { getWeather } from './weather.js';
import { loadSpotlights } from "./spotlights.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Load members and toggle view if member container is present
  const memberContainer = document.getElementById("memberContainer");
  if (memberContainer) {
    loadMembers("memberContainer");
    setupViewToggle("memberContainer");
  }

  // Load spotlight section if present
  const spotlightContainer = document.getElementById("spotlight-container");
  if (spotlightContainer) {
    loadSpotlights("spotlight-container");
  }

  // Highlight current nav item and set responsive menu
  highlightCurrentPage();
  setHamburgerMenu();

  // Display weather data
  getWeather();

  // Handle join page logic
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

  // Handle thank you page logic
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

  // Set last modified date in footer
  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }

  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    const currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear;
  }
});
