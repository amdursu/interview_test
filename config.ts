export default {
  AWS_REMOTE_CONFIG: {
    credentials: {
      accessKeyId: 'AKIA3UCOMQT2IFZSDTER',
      secretAccessKey: '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',
    },
    region: 'eu-west-1',
  },
  AWS_DYNAMO_TABLE: 'auchan_test_users',
  WEATHER_CONFIG: {
    baseURL: 'https://api.open-meteo.com/v1/forecast',
    latitude: '44.4323',
    longitude: '26.1063',
    current: 'temperature_2m,is_day,precipitation,wind_speed_10m',
    city: 'Bucharest',
  },
};
