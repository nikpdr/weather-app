function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");

  currentCity.innerHTML = `${cityInput.value}`;
  retrieveWeather(cityInput.value);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

function retrieveWeather(city) {
  let apiKey = "b3588d10137e7691b17d27af3f8dd9d5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();
  return `${day} ${month} ${currentDate} ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response.data);
  let weatherIcon = document.querySelector("#weather-icon");
  let temp = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#temperature");
  tempDisplay.innerHTML = `${temp}`;
  let dateElement = document.querySelector("#date");
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="card">
              <div class="forecast-date">${day}</div>
              <img
                src="http://openweathermap.org/img/wn/02d@2x.png"
                alt=""
                class="forecast-image"
                width="35px"
              />
              <div class="forecast-temperatures">
                <span class="forecast-high">28° |</span>
                <span class="forecast-low"> 18°</span>
              </div>
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b3588d10137e7691b17d27af3f8dd9d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCityTemp);
}

function showCurrentCityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let city = response.data.name;
  let usersCity = document.querySelector("#current-city");
  currentTemp.innerHTML = `${temperature}`;
  usersCity.innerHTML = `${city}`;
}
let currentCityBtn = document.querySelector("#current-city-btn");
currentCityBtn.addEventListener("click", getGeolocation);

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temperature");
  fahrenheitElement = (celsiusTemperature * 9) / 5 + 32;
  fahrenheitTemp.innerHTML = Math.round(fahrenheitElement);
}

function changeToCelsius(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector("#temperature");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

displayForecast();

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);
