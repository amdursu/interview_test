import { useEffect, useState } from 'react';
import { Tag } from 'primereact/tag';
import config from '../../config';
import { APIResponse } from '../../models/APIResponse';
import { WeatherConditions } from '../../models/WeatherConditions';
import './Weather.scss';

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherConditions>();
  const getWeatherConditions = async () => {
    const res: Response = await fetch(
      `${config.API_URL}/currentWeatherConditions`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const response: APIResponse = await res.json();
    if (response.success) {
      return response.body as WeatherConditions;
    } else {
      return response.message;
    }
  };

  useEffect(() => {
    getWeatherConditions().then((weatherConditions) => {
      setWeatherData(weatherConditions as WeatherConditions);
    });
  }, []);

  return (
    <div className="weatherContainer">
      <h3>
        Current weather conditions in{' '}
        <Tag className="weatherTag" value={weatherData?.city}></Tag>
      </h3>
      <div className="infoLine">
        {weatherData?.isDay ? (
          <Tag
            className="weatherTag"
            severity="warning"
            value="Currently Day Time"
          ></Tag>
        ) : (
          <Tag
            className="weatherTag"
            severity="info"
            value="Currently Night Time"
          ></Tag>
        )}
      </div>
      <div className="infoLine">
        Latitude{' '}
        <Tag className="weatherTag" value={weatherData?.latitude}></Tag>
      </div>
      <div className="infoLine">
        Longitude{' '}
        <Tag className="weatherTag" value={weatherData?.longitude}></Tag>
      </div>
      <div className="infoLine">
        Timezone{' '}
        <Tag className="weatherTag" value={weatherData?.timezone}></Tag>
      </div>
      <div className="infoLine">
        Elevation{' '}
        <Tag className="weatherTag" value={weatherData?.elevation}></Tag>
      </div>
      <div className="infoLine">
        Temperature{' '}
        <Tag className="weatherTag" value={weatherData?.temperature}></Tag>
      </div>
      <div className="infoLine">
        Precipitation{' '}
        <Tag className="weatherTag" value={weatherData?.precipitation}></Tag>
      </div>
      <div className="infoLine">
        Wind Speed{' '}
        <Tag className="weatherTag" value={weatherData?.windSpeed}></Tag>
      </div>
    </div>
  );
};

export default Weather;
