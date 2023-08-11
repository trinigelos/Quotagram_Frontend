// Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import Header from './Header';

const Layout = ({ children }) => {
  // Get the current location object using the useLocation hook
  const location = useLocation();
  // Array of paths where the Header should not be shown
  const excludedPaths = ['/login', '/signup', "/", "/landing"];

  // Check if the current path is included in the excludedPaths array
  const shouldShowHeader = !excludedPaths.includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />} {/* Render the Header only if shouldShowHeader is true */}
      {children}
    </div>
  );
};

export default Layout;
