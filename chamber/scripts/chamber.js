import { loadMembers } from './members.js';
import { setupViewToggle } from './viewToggle.js';
import { highlightCurrentPage, setHamburgerMenu } from './wayfinding.js';
import { getWeather } from './weather.js';
import { loadSpotlights } from "./spotlights.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  
  const memberContainer = document.getElementById("memberContainer");
  if (memberContainer) {
    loadMembers("memberContainer");
    setupViewToggle("memberContainer");
  }

  
  const spotlightContainer = document.getElementById("spotlight-container");
  if (spotlightContainer) {
    loadSpotlights("spotlight-container");
  }

  // Ejecuta en todas las páginas
  highlightCurrentPage();
  getWeather();
  setHamburgerMenu();
});
