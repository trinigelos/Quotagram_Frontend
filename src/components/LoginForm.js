 // LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logs.css';




const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace this with the base URL of your backend server
    const baseUrl = 'http://localhost:5000'; // Change this to match your server's URL

    try {
      // Make the POST request to your backend API
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        const data = await response.json(); // Parse the response JSON data
        console.log('Login response:', data);
        
        localStorage.setItem('token', data.token);

        // Reset the form fields after successful login
        setTimeout(() => {
          setUsername('');
          setPassword('');
        }, 0);

        navigate('/landing');
      } else {
        const errorData = await response.json(); // Parse the response JSON data for error message
        console.error('Login error:', errorData.message);
      }
    } catch (error) {
      // Handle other errors if the login request fails
      console.error('Login error:', error);
    }
  };

  return (
    <div className="d-lg-flex half">
      <div
        className="bg order-1 order-md-1"
        style={{
          backgroundImage: `url("https://img.freepik.com/premium-vector/one-line-drawing-palm-leave-isolated-white-background_505564-972.jpg?w=2000")`
        }}>
      </div>
      <div className="contents order-2 order-md-2">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>Login to <strong>Quotagram</strong></h3>
              <p className="mb-4">Not just any other app</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group first">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email or Username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group last mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex mb-4 align-items-center">
                  <label className=" control control--checkbox mb-0">
                    <span className="caption">Remember me</span>
                     <input type="checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMeChange} />
                      <div className="control__indicator"></div>
                  </label>
                  <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                </div>
                <input type="submit" value="Log In" className="btn btn-block btn-outline-dark" />
              </form>
              <p className="mt-4">Don't have an account? <button
                className="custom-link-button"
                onClick={() => navigate('/signup')}>Sign Up</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default LoginForm;
