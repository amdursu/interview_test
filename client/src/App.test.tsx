import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();
const mockedUsedRoutes = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
  useRoutes: () => mockedUsedRoutes,
}));

test('renders test paragraph', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
});
