const apiKey = "6cc7483652c10b1c2c9c34ce647c604a";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("weatherResult");
  
    if (!city) {
      resultDiv.innerHTML = `<p style="color: red;">Please enter a city name.</p>`;
      return;
    }
  
    resultDiv.innerHTML = `<p>Loading...</p>`;
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then(data => {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        resultDiv.innerHTML = `
          <h2>${data.name}</h2>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
          <p><strong>${temp}°C</strong> - ${desc}</p>
        `;
      })
      .catch(error => {
        resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
      });
  }
  