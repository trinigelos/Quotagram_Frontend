// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Footer from './components/Footer';
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';

const App = () => {
  const { user } = useAuth(); // Access the authenticated user using the custom hook
  console.log(user); 

  return (
        <div>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              {/* If the user is authenticated, render the LandingPage component */}
              {user && <Route exact path="/landing" element={<LandingPage />} />}
              {/* If the user is authenticated, redirect to the landing page; otherwise, redirect to the login page */}
              {user ? <Route path="/" element={<LandingPage />} /> : <Route path="/" element={<LoginPage />} />}
              {/* Add more routes as needed */}
            </Routes>
          </Layout>
          <Footer />
        </div>
  );
}

    
createRoot(document.getElementById('root')).render(
  <Router>
  <AuthProvider>
    <App />
    </AuthProvider>
    </Router>);
