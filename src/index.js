//

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="forecast-result">
    <p>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" width="40px" id="forecast-icon" /><br /><strong>${Math.round(
          forecastDay.temp.day
        )}°C</strong
      ><br />${formatDay(forecastDay.dt)}
    </p>
  </div>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

//

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#clouds").innerHTML = response.data.clouds.all;
  document.querySelector("#weather").innerHTML =
    response.data.weather[0].description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

//

function getForecast(coordinates) {
  let apiKey = "50efe2b7a32906a329c55edd74659275";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//

function searchCity(city) {
  let apiKey = "50efe2b7a32906a329c55edd74659275";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

//

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//

searchCity("Jakarta");

//

function searchNewYork() {
  searchCity("New York");
}

function searchLondon() {
  searchCity("London");
}

function searchParis() {
  searchCity("Paris");
}

function searchBeijing() {
  searchCity("Beijing");
}

function searchSeoul() {
  searchCity("Seoul");
}

function searchTokyo() {
  searchCity("Tokyo");
}

let newYork = document.querySelector("#new-york");
newYork.addEventListener("click", searchNewYork);

let london = document.querySelector("#london");
london.addEventListener("click", searchLondon);

let paris = document.querySelector("#paris");
paris.addEventListener("click", searchParis);

let beijing = document.querySelector("#beijing");
beijing.addEventListener("click", searchBeijing);

let seoul = document.querySelector("#seoul");
seoul.addEventListener("click", searchSeoul);

let tokyo = document.querySelector("#tokyo");
tokyo.addEventListener("click", searchTokyo);
