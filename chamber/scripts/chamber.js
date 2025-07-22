import { loadMembers } from './members.js';
import { setupViewToggle } from './viewToggle.js';
import { highlightCurrentPage, setHamburgerMenu } from './wayfinding.js';
import { getWeather } from './weather.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  loadMembers("memberContainer");
  setupViewToggle("memberContainer");
  highlightCurrentPage();
  getWeather();
  setHamburgerMenu();
});