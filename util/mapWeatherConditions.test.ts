import mapWeatherConditions from './mapWeatherConditions';

describe('mapWeatherConditions', () => {
  test('should return correct mapped value', () => {
    const rawInput = {
      latitude: 44,
      longitude: 26,
      generationtime_ms: 0.047087669372558594,
      utc_offset_seconds: 7200,
      timezone: 'Europe/Bucharest',
      timezone_abbreviation: 'EET',
      elevation: 85,
      current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°C',
        is_day: '',
        precipitation: 'mm',
        wind_speed_10m: 'km/h',
      },
      current: {
        time: '2023-11-08T19:15',
        interval: 900,
        temperature_2m: 12.4,
        is_day: 0,
        precipitation: 0,
        wind_speed_10m: 13.8,
      },
    };
    const result = mapWeatherConditions(rawInput);

    expect(result).toEqual({
      city: 'Bucharest',
      latitude: 44,
      longitude: 26,
      timezone: 'Europe/Bucharest - EET',
      elevation: 85,
      temperature: '12.4 °C',
      isDay: false,
      precipitation: '0 mm',
      windSpeed: '13.8 km/h',
    });
  });
});
