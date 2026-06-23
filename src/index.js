function displayWeather(response) {
  // Defines where the information of temperature will be displayed.
  let temperatureElement = document.querySelector("#current-temperature");
  let conditionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#weather-icon");

  // Extracts the information from the API
  let temperature = Math.round(response.data.temperature.current);
  let conditions = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let icon = response.data.condition.icon_url;

  let info = response.data;
  console.log(info);

  // Replaces the on-screen information with the data just received.
  temperatureElement.innerHTML = temperature;
  conditionElement.innerHTML = conditions;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  iconElement.innerHTML = `<img src="${icon}">`;
}

function searchWeather(event) {
  // Prevents the form field to be reset after sending the request.
  event.preventDefault();

  // Obtains from the form the city to be used for the search.
  let cityReceived = document.querySelector("#city-received");
  let city = cityReceived.value;

  // Modifies the name of the city in the header of the page
  // with the name of the city received in the previous lines.
  let cityName = document.querySelector("#city");
  cityName.innerHTML = city;

  // Defines the API key and URL using the city as value
  // to perform the search.
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Executes the API and then runs the function needed to display the result.
  axios.get(apiUrl).then(displayWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", searchWeather);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
