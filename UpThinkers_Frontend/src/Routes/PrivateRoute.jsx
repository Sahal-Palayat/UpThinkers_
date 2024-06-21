import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
  
    return token ? children : <Navigate to="/login" />;
  };

export default PrivateRoute;
