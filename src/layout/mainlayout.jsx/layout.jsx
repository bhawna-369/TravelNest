import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "../../component/Footer/Footer"

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      {children}
      {location.pathname !== '/Login' && <Footer />}
    </div>
  );
};

export default Layout;