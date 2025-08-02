const apiKey = "a22c8e4af28a05302f1a809f8f228969";
const city = "Cancun";
const units = "metric";
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

const currentWeather = document.getElementById("current-weather");
const forecastList = document.getElementById("forecast");

function showLoading() {
  if (currentWeather) currentWeather.textContent = "Loading current weather...";
  if (forecastList) forecastList.innerHTML = "<li>Loading forecast...</li>";
}

function clearLoading() {
  if (currentWeather) currentWeather.textContent = "";
  if (forecastList) forecastList.innerHTML = "";
}

export async function getWeather() {
  showLoading();
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (!currentWeather || !forecastList) {
      console.error("Weather container elements not found.");
      return;
    }

    // Current weather
    const today = data.list[0];
    const temp = Math.round(today.main.temp);
    const desc = today.weather[0].description;
    const icon = today.weather[0].icon;
    const humidity = today.main.humidity;

    currentWeather.innerHTML = `
      <p>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
        <strong>${temp}°C</strong> - ${desc}, Humidity: ${humidity}%
      </p>
    `;

    // Forecast for next days (every 24 hours from current)
    forecastList.innerHTML = "";
    const forecastSteps = [8, 16, 24]; // Approx every 24h (3-hour intervals * 8 = 24h)

    forecastSteps.forEach(i => {
      const day = data.list[i];
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayTemp = Math.round(day.main.temp);
      const dayIcon = day.weather[0].icon;
      const dayDesc = day.weather[0].description;

      forecastList.innerHTML += `
        <li>
          <img class="weather-icon" src="https://openweathermap.org/img/wn/${dayIcon}@2x.png" alt="${dayDesc}">
          <strong>${dayName}</strong>: ${dayTemp}°C
        </li>
      `;
    });
  } catch (error) {
    console.error("Error fetching weather:", error);
    if (currentWeather) currentWeather.textContent = "Unable to load weather data.";
  }
}

