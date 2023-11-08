import { Navigate, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';
import { LoginProps } from '../../models/LoginProps';
import './Login.scss';
import { useState } from 'react';
import config from '../../config';
import { APIResponse } from '../../models/APIResponse';

function Login({ isLoggedIn, setIsLoggedIn }: LoginProps) {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  const loginAction = async () => {
    try {
      setErrorMessage('');

      const res: Response = await fetch(
        `${config.API_URL}/login?email=${emailField}&password=${passwordField}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const response: APIResponse = await res.json();
      console.log(response);

      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.body));
        setIsLoggedIn(true);
        navigate('/home');
      } else if (response.message) {
        setErrorMessage(response.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="loginContainer">
      <Card title="Auchan Test Login" className="loginCard">
        {errorMessage !== '' && (
          <Message
            className="errorMessage"
            severity="error"
            text={errorMessage}
          />
        )}
        <span className="p-float-label inputField">
          <InputText
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
            id="email"
          />
          <label htmlFor="email">Email</label>
        </span>
        <span className="p-float-label inputField">
          <Password
            value={passwordField}
            onChange={(e) => setPasswordField(e.target.value)}
            feedback={false}
            inputId="password"
          />
          <label htmlFor="password">Password</label>
        </span>
        <Button
          label="Login"
          className="loginButton"
          onClick={loginAction}
        ></Button>
      </Card>
    </div>
  );
}

export default Login;
