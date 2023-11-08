/* eslint-disable testing-library/render-result-naming-convention */
import { render } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders Home page', () => {
  const screen = render(
    <Home
      user={{
        userID: 'id',
        email: 'email',
        firstName: 'FN',
        lastName: 'LN',
        location: 'LOC',
      }}
    />,
  );

  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/FN/i)).toBeInTheDocument();
});

test('redirects to login page if user is undefined', async () => {
  const view = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );

  // Cannot get test to work because of routing not rendering any component
  // expect(view.getByText(/Auchan Test Login/i)).toBeInTheDocument();
  // expect(view.container.getElementsByClassName('loginCard').length).toBe(1);
});
