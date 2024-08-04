import React from 'react';
import { LoginContextProvider } from '../Components/Login/Context/LoginContext';
import { GlobalContextProvider } from './GlobalContext';

const CombinedContextProvider = ({ children }) => {
    return (
        <LoginContextProvider>
            <GlobalContextProvider>
                {children}
            </GlobalContextProvider>
        </LoginContextProvider>
    );
};

export default CombinedContextProvider;
