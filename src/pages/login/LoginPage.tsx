import { useState } from 'react';
import axios from 'axios';
import './loginpage.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      // const instance = axios.create({
      //   withCredentials: true // Important: this will allow sending and receiving cookies
      // });
      // Send POST request to the login API
      const instance = axios.create({
        withCredentials: true // Important: this will allow sending and receiving cookies
      });
      
      const response = await instance.post('https://gp-ooo8.onrender.com/users/login', {
        username: "FaisalTurki",
        password: "Fa1234"
      });
      // You can redirect the user or save the login token here as needed
    } catch (error) {
      // Handle errors if the request fails
      console.error('Login failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
