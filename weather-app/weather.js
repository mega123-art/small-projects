document.addEventListener("DOMContentLoaded",()=>{
    const cityinput=document.getElementById("city-input")
    const getweatherbtn=document.getElementById("get-weather-btn")
    const weatherinfo=document.getElementById("weather-info")
    const citynamedisplay=document.getElementById("temperature")
    const descriptiodisplay=document.getElementById("description")
const errormsg=document.getElementById("error-messag")
const API_KEY="your secret key here please read the text file"


getweatherbtn.addEventListener("click", async () => {
    const city = cityinput.value.trim();
    if (city === "") return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("response", response);
    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    return data;
  }
  function displayWeatherData(weatherData) {
    console.log(weatherData);
    const { name, main, weather } = weatherData;
    citynamedisplay.textContent = name;
    descriptiodisplay.textContent = `${weather[0].description}`;
    temperaturedisplay.textContent = `${main.temp}`;

    weatherinfo.classList.remove("hidden");
    errormsg.classList.add("hidden");
  }
  function showError() {
    weatherinfo.classList.add("hidden");
    errormsg.classList.remove("hidden");
  }
});

