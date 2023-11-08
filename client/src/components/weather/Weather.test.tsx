/* eslint-disable testing-library/render-result-naming-convention */
import { render, waitFor } from '@testing-library/react';
import Weather from './Weather';

test('renders weather page', () => {
  const screen = render(<Weather />);
  expect(screen.getByText(/Current weather conditions/i)).toBeInTheDocument();
});

test('weather fetch success', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          success: true,
          body: {
            city: 'Bucharest',
            latitude: 44.4375,
            longitude: 26.125,
            timezone: 'Europe/Bucharest - EET',
            elevation: 85,
            temperature: '12.5 °C',
            isDay: false,
            precipitation: '0 mm',
            windSpeed: '13.6 km/h',
          },
        }),
    } as Response),
  );
  const screen = render(<Weather />);
  await waitFor(() => {
    expect(screen.getByText(/Europe/i)).toBeInTheDocument();
  });
});
