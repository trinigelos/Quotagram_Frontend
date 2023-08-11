// SignupForm.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Logs.css';



const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const passwordRequirements = 'Password must be at least 7 characters long and contain numbers and symbols.';


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    
    //  password validation 
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    if (!password.match(passwordRegex)) {
      alert('Password does not meet the requirements.');
      return;
    }



    
    // base URL of the backend server
    const baseUrl = 'http://localhost:5000'; 

    try {
      // Make a POST request to the backend API endpoint for signup
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'An error occurred');
      }
      // After successful signup
      navigate('/login'); // Navigate to the login page/
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="d-lg-flex half">
      <div className="bg order-1 order-md-2" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1617403857242-300a0402afdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wyNzM3MDM2fHxlbnwwfHx8fHw%3D&w=1000&q=80")` }}></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>Signup to <strong>Quotagram</strong></h3>
              <p className="mb-4">Not just any other app</p>
              <form className='form'
                onSubmit={handleSubmit}>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p style={{ color: '#888', fontSize: '13px', marginBottom: '15px', marginLeft: '11px', }}>{passwordRequirements}</p>
                <button type="submit" className="signup btn btn-block btn-outline-dark">Sign Up</button>
                <p className="mt-4">Already have an account? <button
                  className="custom-link-button"
                  onClick={() => navigate('/login')}>Login</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
