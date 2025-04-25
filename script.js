const apiKey = "6cc7483652c10b1c2c9c34ce647c604a";
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const forecastDiv = document.getElementById('forecast');

// Get Weather by city name
getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    getForecast(city);
  } else {
    alert("Please enter a city name!");
  }
});

// Auto-location weather when page loads
window.onload = function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      await getWeatherByCoords(lat, lon);
    });
  }
};

async function getWeather(city) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    if (data.cod !== 200) {
      alert(data.message);
      return;
    }
    displayWeather(data);
  } catch (err) {
    alert("Error fetching weather!");
  }
}

async function getForecast(city) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    displayForecast(data);
  } catch (err) {
    console.error(err);
  }
}

async function getWeatherByCoords(lat, lon) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    console.error(err);
  }
}

function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.innerHTML = `<strong>${data.main.temp.toFixed(1)}°C</strong>`;
  description.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.style.display = 'block';
}

function displayForecast(data) {
  forecastDiv.innerHTML = "<h3>Next 3 Days Forecast:</h3>";
  const forecasts = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!forecasts[date] && item.dt_txt.includes("12:00:00")) {
      forecasts[date] = item;
    }
  });

  const forecastHTML = Object.keys(forecasts).slice(0, 3).map(date => {
    const item = forecasts[date];
    return `
      <div class="forecast-day">
        <strong>${date}</strong> - ${item.main.temp.toFixed(1)}°C, ${item.weather[0].description}
      </div>
    `;
  }).join('');

  forecastDiv.innerHTML += forecastHTML;
}
// Auto-detect user's location weather
window.addEventListener('load', () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getWeatherByCoordinates(lat, lon);
      }, error => {
          console.error('Error getting location:', error);
      });
  }
});

// Function to get weather using coordinates
async function getWeatherByCoordinates(lat, lon) {
  const apiKey = "6cc7483652c10b1c2c9c34ce647c604a"; // replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  const response = await fetch(apiUrl);
  const data = await response.json();
  
  document.getElementById('city').innerText = data.name;
  document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('temperature').innerText = `${data.main.temp.toFixed(2)}°C`;
  document.getElementById('description').innerText = data.weather[0].description;
}
