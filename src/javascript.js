function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
  chooseEmoji(response);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "83a222ot49ddfde0622ffadcc7bfbdb5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function chooseEmoji(response) {
  let emoticon = document.querySelector("#emoji");
  if (response.data.condition.description === "clear sky") {
    emoticon.innerHTML = "🌞";
  }
  if (response.data.condition.description === "shower rain") {
    emoticon.innerHTML = "☔️";
  }
  if (response.data.condition.description === "few clouds") {
    emoticon.innerHTML = "⛅";
  }
  if (response.data.condition.description === "scattered clouds") {
    emoticon.innerHTML = "☁️";
  }
  if (response.data.condition.description === "broken clouds") {
    emoticon.innerHTML = "🌥️";
  }
  if (response.data.condition.description === "rain") {
    emoticon.innerHTML = "🌧️";
  }
  if (response.data.condition.description === "thunderstorm") {
    emoticon.innerHTML = "⛈️";
  }
  if (response.data.condition.description === "snow") {
    emoticon.innerHTML = "❄️";
  }
  if (response.data.condition.description === "mist") {
    emoticon.innerHTML = "🌫️";
  }
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function formatEmoji(response) {
  let emojiIcon = document.querySelector(".weather-forecast-icon");
  if (response.daily.condition.description === "clear sky") {
    emojiIcon.innerHTML = "🌞";
  }
  if (response.daily.condition.description === "shower rain") {
    emojiIcon.innerHTML = "☔️";
  }
  if (response.daily.condition.description === "few clouds") {
    emojiIcon.innerHTML = "⛅";
  }
  if (response.daily.condition.description === "scattered clouds") {
    emojiIcon.innerHTML = "☁️";
  }
  if (response.daily.condition.description === "broken clouds") {
    emojiIcon.innerHTML = "🌥️";
  }
  if (response.daily.condition.description === "rain") {
    emojiIcon.innerHTML = "🌧️";
  }
  if (response.daily.condition.description === "thunderstorm") {
    emojiIcon.innerHTML = "⛈️";
  }
  if (response.daily.condition.description === "snow") {
    emojiIcon.innerHTML = "❄️";
  }
  if (response.daily.condition.description === "mist") {
    emojiIcon.innerHTML = "🌫️";
  }
}

function getForecast(city) {
  let apiKey = "83a222ot49ddfde0622ffadcc7bfbdb5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <div class="weather-forecast-icon">${formatEmoji(response)}</div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong>${Math.round(day.temperature.maximum)}º</strong>
                </div>
                <div class="weather-forecast-temperature">${Math.round(
                  day.temperature.minimum
                )}º</div>
              </div>
            </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let forecastElement = document.querySelector("#forecast");
let searchFormDocument = document.querySelector("#search-form");
searchFormDocument.addEventListener("submit", handleSearchSubmit);

searchCity("Wrocław");
