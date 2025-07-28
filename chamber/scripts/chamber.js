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

  
  highlightCurrentPage();

  
  getWeather();

  
  setHamburgerMenu();

  
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

  if (window.location.pathname.endsWith("thankyou.html")) {
    import("./thankyou.js")
      .then(module => {
        if (module.loadThankYouData) {
          module.loadThankYouData();
        }
      })
      .catch(err => {
        console.error("Failed to load thankyou.js module:", err);
      });
  }
});
