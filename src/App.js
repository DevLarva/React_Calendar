import React, { useState, useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getMonth } from './util'
import CalendarHeader from './Components/CalendarHeader';
import Sidebar from './Components/Sidebar';
import Month from './Components/Month';
import GlobalContext from './context/GlobalContext';

function App() {

  const[currenMonth, setCurrentMonth] = useState(getMonth());
  const {monthIndex} = useContext(GlobalContext)
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
      <React.Fragment>
        <div className='h-screen flex flex-col'>
          <CalendarHeader />
          <div className='flex flex-1'>
            <Sidebar />
            <Month month={currenMonth} />
          </div>
        </div>
      </React.Fragment>
  );
}

export default App;