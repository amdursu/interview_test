import { useState } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import './App.scss';
import Login from './components/login/Login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Weather from './components/weather/Weather';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const navigate = useNavigate();

  const homeNavButtons = (
    <>
      <Button label="Home" link onClick={() => navigate('/home')}></Button>
      <Button
        label="Weather Conditions"
        link
        onClick={() => navigate('/weather')}
      ></Button>
      <Button
        label="Logout"
        link
        onClick={() => {
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          navigate('/login');
        }}
      ></Button>
    </>
  );

  const start = <h3 className="appTitle">Auchan Technical Test</h3>;
  const end = isLoggedIn ? (
    homeNavButtons
  ) : (
    <Button
      label="Login"
      link
      onClick={() => {
        navigate('/login');
      }}
    ></Button>
  );

  return (
    <>
      <PrimeReactProvider>
        <Menubar start={start} end={end} />
        <div className="container">
          <Routes>
            <Route path="/" element={<UserAuthenticated />} />
            <Route
              path="/home"
              element={
                <Home user={JSON.parse(localStorage.getItem('user')!)} />
              }
            />
            <Route
              path="/login"
              element={
                <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
      </PrimeReactProvider>
    </>
  );
}

const UserAuthenticated = () => {
  return !!localStorage.getItem('user') ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
