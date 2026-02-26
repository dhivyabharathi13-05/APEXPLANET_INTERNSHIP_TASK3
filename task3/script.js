const apiKey = "API_KEY";
async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        // Weather API
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const weatherData = await weatherResponse.json();

        document.getElementById("cityName").innerText = weatherData.name;
        document.getElementById("temperature").innerText =
            "Temperature: " + weatherData.main.temp + "°C";
        document.getElementById("description").innerText =
            "Condition: " + weatherData.weather[0].description;
        document.getElementById("humidity").innerText =
            "Humidity: " + weatherData.main.humidity + "%";
        document.getElementById("wind").innerText =
            "Wind Speed: " + weatherData.wind.speed + " m/s";

        // Air Quality API (using coordinates)
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;

        const aqiResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const aqiData = await aqiResponse.json();

        const aqi = aqiData.list[0].main.aqi;
        document.getElementById("aqiValue").innerText = "AQI Level: " + aqi;
        document.getElementById("aqiStatus").innerText = getAQIStatus(aqi);

    } catch (error) {
        alert("City not found!");
        console.error(error);
    }
}

function getAQIStatus(aqi) {
    switch (aqi) {
        case 1: return "Good 😊";
        case 2: return "Fair 🙂";
        case 3: return "Moderate 😐";
        case 4: return "Poor 😷";
        case 5: return "Very Poor 🚨";
        default: return "Unknown";
    }
}