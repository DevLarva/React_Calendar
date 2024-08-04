// import React, { useState, useContext, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { getMonth } from '../src/util'
// import CalendarHeader from './Components/CalendarHeader';
// import Sidebar from './Components/Sidebar';
// import Month from './Components/Month';
// import GlobalContext, { GlobalContextProvider } from './Components/Login/Context/GlobalContext';
// import EventModal from './Components/EventModal';
// import Login from './Components/Login/Login';
// import Register from './Components/Login/Register';
// import ClientMain from './Components/Login/Main/ClientMain';
// import OutsourcingMain from './Components/Login/Main/OutsourcingMain';
// import PrivateRoute from './Components/Login/Context/PrivateRoute';

// function CalendarApp() {
//   const [currentMonth, setCurrentMonth] = useState(getMonth());
//   const { monthIndex, showEventModal } = useContext(GlobalContext);

//   useEffect(() => {
//     setCurrentMonth(getMonth(monthIndex));
//   }, [monthIndex]);
//   console.log("GlobalContext:", { monthIndex, showEventModal });

//   return (
//     <React.Fragment>
//       {showEventModal && <EventModal />}
//       <div className='h-screen flex flex-col'>
//         <CalendarHeader />
//         <div className='flex flex-1'>
//           <Sidebar />
//           <Month month={currentMonth} />
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// function App() {
//   return (
//     <GlobalContextProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/calendar"
//             element={
//               <PrivateRoute>
//                 <CalendarApp />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/ClientMain"
//             element={
//               <PrivateRoute>
//                 <ClientMain />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/OutsourcingMain"
//             element={
//               <PrivateRoute>
//                 <OutsourcingMain />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </GlobalContextProvider>
//   );
// }

// export default App;

/*
 TODO:
 - 로그인 이후 새로고침하면 팅김(로그인 화면으로) 
 - tailwind 안먹힘(원인X)
 - 달이동 버튼 동작 X
 - mui 깨짐(원인X)
 */


import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getMonth } from '../src/util';
import CalendarHeader from './Components/CalendarHeader';
import Sidebar from './Components/Sidebar';
import Month from './Components/Month';
import CombinedContextProvider from './context/CombinedContextProvider';
import EventModal from './Components/EventModal';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import ClientMain from './Components/Login/Main/ClientMain';
import OutsourcingMain from './Components/Login/Main/OutsourcingMain';
import PrivateRoute from './Components/Login/Context/PrivateRoute';
import CalendarContext from './context/GlobalContext';

function CalendarApp() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(CalendarContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className='h-screen flex flex-col'>
        <CalendarHeader />
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

function App() {
  return (
    <CombinedContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calendar" element={<PrivateRoute><CalendarApp /></PrivateRoute>} />
          <Route path="/ClientMain" element={<PrivateRoute><ClientMain /></PrivateRoute>} />
          <Route path="/OutsourcingMain" element={<PrivateRoute><OutsourcingMain /></PrivateRoute>} />
        </Routes>
      </Router>
    </CombinedContextProvider>
  );
}

export default App;
