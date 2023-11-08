# Auchan Technical Test

### App can be run using Docker by following these steps:

### 1. Server

- Run `docker build -f Dockerfile -t server .` in the root of the project
- Run `docker run -it -p 4002:3001 server` in the root of the project

### 2. Client

- Navigate to the **_client_** folder `cd client`
- Run `docker build -f Dockerfile -t client` in the **_client_** folder
- Run `docker run -it -p 4001:3000 client` in the **_client_** folder

### 3. Test the app

- Navigate to **_http://localhost:4001_**
- For a successful login path enter as **_email_**: *john.doe@test.com* & **_password_**: _Test123_
- You should be automatically redirected to the _Home_ component showing user details
- By clicking the **_Weather Conditions_** link in the _NavBar_, you will be redirected to the Weather details component.
- By clicking the **_Logout_** link in the _NavBar_, the user will be logged out and redirected to the _Login_ component
- In order to test the login error scenarios, first input a different email address, you should see a _User email not found!_ message
- Now input the correct email address *john.doe@test.com* and a wrong password, you should see a _Password incorrect!_ message

### Thank you for testing things out 😃
