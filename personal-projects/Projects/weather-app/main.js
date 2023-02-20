const api = {
    key: "9f8b0bd6dd93dd0304dbd9b7c37628af",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(searchbox.value);
    }
}

function getResult(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.textContent = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();

    let date = document.querySelector(".location .date");
    date.textContent = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.textContent = `${Math.round(weather.main.temp)}°C`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.textContent = weather.weather[0].main;

    let hilow = document.querySelector(".current .hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let wind = document.querySelector(".current .wind");
    wind.textContent = `${weather.wind.speed} m/s`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday",];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`;
}

