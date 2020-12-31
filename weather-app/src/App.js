import React from 'react';
import Header from './components/Header';
import './App.css';

import 'weather-icons/css/weather-icons.css';
import Weather from './components/Weather.component';
import Ciudad from './components/Ciudad.component';

// api call api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
const API_key = "e8ff68f250834a783798ee124432d5c8";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      humidity: undefined,
      pressure: undefined,
      wind: undefined,
      sunrise: undefined,
      sunset: undefined,
      lat: undefined,
      lon: undefined,
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell
  }

  CalUnixTimestampTime(time){
    let timestampValue = new Date(time*1000).toLocaleTimeString('es-CO');
    return timestampValue
  }

  CalUnixTimestampDate(time){
    let timestampValue = new Date(time*1000).toLocaleDateString('es-CO');
    return timestampValue
  }

  get_weatherIcon(icons,rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon:this.weatherIcon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon:this.weatherIcon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon:this.weatherIcon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon:this.weatherIcon.Snow});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon:this.weatherIcon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon:this.weatherIcon.Clear});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon:this.weatherIcon.Clouds});
        break;
      default:
        this.setState({icon:this.weatherIcon.Clouds});
    }
  }

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    console.log(city);

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);

    const response = await api_call.json();

    console.log(response);

    const lon = response.coord.lon;
    const lat = response.coord.lat;

    console.log(lon, lat);

    const api_call2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_key}`);

    const response2 = await api_call2.json();

    console.log(response2);

    const diasSiguientes = [
      this.CalUnixTimestampDate(response2.daily[0].dt),
      this.CalUnixTimestampDate(response2.daily[1].dt),
      this.CalUnixTimestampDate(response2.daily[2].dt),
      this.CalUnixTimestampDate(response2.daily[3].dt),
      this.CalUnixTimestampDate(response2.daily[4].dt),
      this.CalUnixTimestampDate(response2.daily[5].dt)
    ];

    const tempMinDiasSiguientes = [
      this.calCelsius(response2.daily[0].temp.min),
      this.calCelsius(response2.daily[1].temp.min),
      this.calCelsius(response2.daily[2].temp.min),
      this.calCelsius(response2.daily[3].temp.min),
      this.calCelsius(response2.daily[4].temp.min),
      this.calCelsius(response2.daily[5].temp.min)
    ];

    const tempMaxDiasSiguientes = [
      this.calCelsius(response2.daily[0].temp.max),
      this.calCelsius(response2.daily[1].temp.max),
      this.calCelsius(response2.daily[2].temp.max),
      this.calCelsius(response2.daily[3].temp.max),
      this.calCelsius(response2.daily[4].temp.max),
      this.calCelsius(response2.daily[5].temp.max)
    ];

    console.log(diasSiguientes, tempMinDiasSiguientes, tempMaxDiasSiguientes);

    this.setState({
      city : response.name,
      celsius : this.calCelsius(response.main.temp),
      temp_max : this.calCelsius(response.main.temp_max),
      temp_min : this.calCelsius(response.main.temp_min),
      description : response.weather[0].description,
      humidity: response.main.humidity,
      pressure: response.main.pressure,
      wind: response.wind.speed,
      sunrise: this.CalUnixTimestampTime(response.sys.sunrise),
      sunset: this.CalUnixTimestampTime(response.sys.sunset),
      lon: response.coord.lon,
      lat: response.coord.lat,
      diasSiguientes: diasSiguientes,
      tempMinDiasSiguientes: tempMinDiasSiguientes,
      tempMaxDiasSiguientes: tempMaxDiasSiguientes,
      error: false
    });

    this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
  };

  render(){
    //Obtener Fecha
    const fecha = new Date().getFullYear();

    return(
      <div className="App">
      <Header
      titulo='Clima App'
      />
      <Ciudad loadweather={this.getWeather}/>
      <Weather 
      city={this.state.city}
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      weatherIcon={this.state.icon}
      humidity={this.state.humidity}
      pressure={this.state.pressure}
      wind={this.state.wind}
      sunrise={this.state.sunrise}
      sunset={this.state.sunset}
      diasSiguientes={this.state.diasSiguientes}
      tempMinDiasSiguientes={this.state.tempMinDiasSiguientes}
      tempMaxDiasSiguientes={this.state.tempMaxDiasSiguientes}
      />
      </div>
    );
  }
}

export default App;
