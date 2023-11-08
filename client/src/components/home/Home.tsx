import { Navigate } from 'react-router-dom';
import { HomeProps } from '../../models/HomeProps';
import './Home.scss';

function Home({ user }: HomeProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="homeContainer">
      <h2>
        Welcome to the homepage, {user.firstName} {user.lastName}!
      </h2>
      <h3 className="email">
        You are currently logged in with this email address: {user.email}
      </h3>
      <h3 className="location">Your location is set to: {user.location}</h3>
    </div>
  );
}

export default Home;
