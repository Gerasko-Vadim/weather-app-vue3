import axios from "axios"
const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
const mapKey = import.meta.env.VITE__MAPBOX_KEY; 

export default{
    getWeatherCity:({lat,lang,lon}:getWeatherCityType) => 
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lang=${lang}&lon=${lon}&appid=${apiKey}&units=metric`),
    
    getAllCities:(value:string)=> axios.get( `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapKey}&types=place&limit=10`)
}

type getWeatherCityType = {
    lat:string,
    lang:string,
    lon:string,
}