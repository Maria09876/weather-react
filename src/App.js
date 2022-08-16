import React, {useState} from "react";
import './App.css';
import axios from "axios";



function App() {
  
const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [date, setDate]=useState("")

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78f09a110a25bd1cb32562e763e9441e&units=metric`;
    axios.get(url).then(getLocation);
  }

  function updateCity(event) {
    setCity(event.target.value);
    createDate()
  }

  function getLocation(response) {
    setLoaded(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function createDate() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let day = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

    let date = `${currentDay} ${day}, ${currentMonth}`
    let time = `${hours}:${minutes}`
    
    return setDate(
      <div>
        <h2>{date} </h2>
        <h3> {time}</h3>
    </div>
    ) 
  
  }


    let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" onChange={updateCity} placeholder="Type a city..." />
      <input type="submit" value="Search" />
    </form>
  );
 
  
 
 

  if (loaded) {
    return (
      <div>
        {form}
        {date}
        <ul style={{listStyle:'none'}}>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.temperature}</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>
            {" "}
            <img src={weather.icon} alt={weather.description} />{" "}
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        {form}
        {date}
        <h3>Temperature:20°C</h3>
        <h3>Description: Clear Sky</h3>
        <h3>Wind: 15km/h</h3>
        <h3>Humidity: 30%</h3>     
      </div>);
  }
    
}


export default App;
