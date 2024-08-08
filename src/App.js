// import React, { useState, useContext, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { getMonth } from '../src/util';
// import CalendarHeader from './Components/CalendarHeader';
// import Sidebar from './Components/Sidebar';
// import Month from './Components/Month';
// import CombinedContextProvider from './context/CombinedContextProvider';
// import EventModal from './Components/EventModal';
// import Login from './Components/Login/Login';
// import Register from './Components/Login/Register';
// import ClientMain from './Components/Login/Main/ClientMain';
// import OutsourcingMain from './Components/Login/Main/OutsourcingMain';
// import PrivateRoute from './Components/Login/Context/PrivateRoute';
// import CalendarContext from './context/GlobalContext';

// function CalendarApp() {
//   const [currentMonth, setCurrentMonth] = useState(getMonth());
//   const { monthIndex, showEventModal } = useContext(CalendarContext);

//   useEffect(() => {
//     setCurrentMonth(getMonth(monthIndex));
//   }, [monthIndex]);

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
//     <CombinedContextProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/calendar" element={<PrivateRoute><CalendarApp /></PrivateRoute>} />
//           <Route path="/ClientMain" element={<PrivateRoute><ClientMain /></PrivateRoute>} />
//           <Route path="/OutsourcingMain" element={<PrivateRoute><OutsourcingMain /></PrivateRoute>} />
//         </Routes>
//       </Router>
//     </CombinedContextProvider>
//   );
// }

// export default App;


/*
 TODO:
 - 로그인 이후 새로고침하면 팅김(로그인 화면으로) 
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Noticeboard/Header';
import Main from './Components/Noticeboard/Main';
import PostView from './Components/Noticeboard/PostView';
import ClientPostList from './Components/Noticeboard/ClientPostList';
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
import { getMonth } from '../src/util';
import ClientPostView from './Components/Noticeboard/ClientPostView';

function CalendarApp() {
  const [currentMonth, setCurrentMonth] = React.useState(getMonth());
  const { monthIndex, showEventModal } = React.useContext(CalendarContext);

  React.useEffect(() => {
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

function AppContent() {
  const location = useLocation();

  // 특정 경로에서만 Header를 렌더링
  const showHeader = ['/client', '/calendar', '/client/posts', '/OutsourcingMain'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newpost" element={<PostView onPostSaved={() => { }} />} />
        <Route path="/client" element={<ClientPostList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<PrivateRoute><CalendarApp /></PrivateRoute>} />
        <Route path="/client/posts" element={<PrivateRoute><ClientPostView /></PrivateRoute>} />
        <Route path="/OutsourcingMain" element={<PrivateRoute><OutsourcingMain /></PrivateRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CombinedContextProvider>
      <Router>
        <AppContent />
      </Router>
    </CombinedContextProvider>
  );
}

export default App;
