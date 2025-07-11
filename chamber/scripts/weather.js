const apiKey = "a22c8e4af28a05302f1a809f8f228969";
const city = "Cancun";
const units = "metric"; 
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

const currentWeather = document.getElementById("current-weather");
const forecastList = document.getElementById("forecast");

currentWeather.textContent = "Loading current weather...";
forecastList.innerHTML = "<li>Loading forecast...</li>";

async function getWeather() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();

    
    const today = data.list[0];
    const temp = Math.round(today.main.temp);
    const desc = today.weather[0].description;
    const icon = today.weather[0].icon;
    const humidity = today.main.humidity;

    currentWeather.innerHTML = `
      <p><strong>${temp}°C</strong></p>
      <p>${desc}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
      <p>Humidity: ${humidity}%</p>
    `;
    forecastList.innerHTML = "";
    for (let i = 7; i <= 39; i += 8) {
      const day = data.list[i];
      const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
      const dayTemp = Math.round(day.main.temp);
      const dayIcon = day.weather[0].icon;
      const dayDesc = day.weather[0].description;

      forecastList.innerHTML += `
        <li>
          <strong>${date}</strong>: ${dayTemp}°C
          <img src="https://openweathermap.org/img/wn/${dayIcon}@2x.png" alt="${dayDesc}">
        </li>
      `;
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    currentWeather.textContent = "Unable to load weather data.";
  }
}

getWeather();
