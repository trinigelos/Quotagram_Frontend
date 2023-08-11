   
// AuthContext.js
import React, { useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};


//Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

// Method to handle user registration
const signup = async (username, email, password) => {
  try {
    // Make a POST request to the backend API endpoint for signup
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'An error occurred');
    }

    // Registration successful
    const data = await response.json();
    setUser(data.user);
    return data.user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Method to handle user login
const login = async (username, password) => {
  try {
    // Make the POST request to the backend API for login
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Invalid credentials');
    }

    // Login successful
    const data = await response.json();
    setUser(data.user);
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Method to handle user logout
const logout = () => {
  setUser(null);
  };
  

  return (
    <AuthContext.Provider value={{ user, setUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
