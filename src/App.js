import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getMonth } from './util'
import CalendarHeader from './Components/CalendarHeader';
import Sidebar from './Components/Sidebar';
import Month from './Components/Month';

function App() {
  const[currenMonth, setCurrentMonth] = useState(getMonth());

  return (
    <div className="App">
      <React.Fragment>
        <div className='h-screen flex flex-columns'>
          <CalendarHeader />
          <div className='flex flex-1'>
            <Sidebar />
            <Month month={currenMonth} />
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default App;