import config from '../config';
import { WeatherResponse } from '../models/WeatherResponse';

const mapWeatherConditions = (weatherConditions: WeatherResponse) => {
  const { city } = config.WEATHER_CONFIG;
  return {
    city,
    latitude: weatherConditions.latitude,
    longitude: weatherConditions.longitude,
    timezone: `${weatherConditions.timezone} - ${weatherConditions.timezone_abbreviation}`,
    elevation: weatherConditions.elevation,
    temperature: `${weatherConditions.current.temperature_2m} ${weatherConditions.current_units.temperature_2m}`,
    isDay: weatherConditions.current.is_day === 1 ? true : false,
    precipitation: `${weatherConditions.current.precipitation} ${weatherConditions.current_units.precipitation}`,
    windSpeed: `${weatherConditions.current.wind_speed_10m} ${weatherConditions.current_units.wind_speed_10m}`,
  };
};

export default mapWeatherConditions;
