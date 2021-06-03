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

function showTemperature(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#temperature");
  tempDisplay.innerHTML = `${temp}`;
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

let now = new Date();
let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();

let currentDay = document.querySelector("#current-day");
let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");

currentDay.innerHTML = `${day}`;
currentDate.innerHTML = `${month} ${date}`;
currentTime.innerHTML = `${hour}:${minute}`;

function changeToCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#current-temp");

  celsiusTemp.innerHTML = "19";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#current-temp");
  fahrenheitTemp.innerHTML = "63";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);
