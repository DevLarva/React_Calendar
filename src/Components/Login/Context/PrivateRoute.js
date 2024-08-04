import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import LoginContext from './LoginContext';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(LoginContext);

    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
