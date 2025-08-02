import { loadMembers } from './members.js';
import { setupViewToggle } from './viewToggle.js';
import { highlightCurrentPage, setHamburgerMenu } from './wayfinding.js';
import { getWeather } from './weather.js';
import { loadSpotlights } from './spotlights.js';
import { loadPlaces } from './discover.js';
import { showVisitMessage } from "./visits.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  highlightCurrentPage();
  setHamburgerMenu();

  // 🔹 Load weather ONLY if elements exist
  const currentWeather = document.getElementById("current-weather");
  const forecastList = document.getElementById("forecast");

  if (currentWeather && forecastList) {
    getWeather();
}

  // 🔹 Load directory members
  const memberContainer = document.getElementById("memberContainer");
  if (memberContainer) {
    loadMembers("memberContainer");
    setupViewToggle("memberContainer");
  }

  // 🔹 Load spotlights if container is present
  const spotlightContainer = document.getElementById("spotlight-container");
  if (spotlightContainer) {
    loadSpotlights("spotlight-container");
  }

  // 🔹 Load Discover cards
  const placesContainer = document.getElementById("places-container");
  if (placesContainer) {
    loadPlaces("places-container");
  }

  // 🔹 Show visit message if container is present
  showVisitMessage("visit-message");

  // 🔹 Load join-us behavior
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

  // 🔹 Load thank-you page behavior
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

  // 🔹 Set last modified and current year
  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
