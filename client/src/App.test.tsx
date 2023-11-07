import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders test paragraph', () => {
  render(<App />);
  const linkElement = screen.getByText(/AUCHAN TECHNICAL TEST/i);
  expect(linkElement).toBeInTheDocument();
});
