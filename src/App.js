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
import OutsourcingMain from './Components/Noticeboard/OutsourcingMain';
import OutsourcingDetail from './Components/Noticeboard/OutsourcingDetail';
import PrivateRoute from './Components/Login/Context/PrivateRoute';
import CalendarContext from './context/GlobalContext';
import { getMonth } from '../src/util';
import ClientPostView from './Components/Noticeboard/ClientPostView';
import ClientHeader from './Components/Noticeboard/ClientHeader'
import PostList from './Components/Noticeboard/PostList';
import ClientMain from './Components/Noticeboard/ClientMain';
import PostDetail from './Components/Noticeboard/PostDetail';
import ClientPostDetail from './Components/Noticeboard/ClientDetail';

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

  const showHeader = ['/calendar', '/andn'].includes(location.pathname);
  const showClientHeader = ['/client', '/client/posts', '/OutsourcingMain'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      {showClientHeader && <ClientHeader />}

      <Routes>
        {/* 기존 라우트들 */}
        <Route path="/" element={<Login />} />
        <Route path="/newpost" element={<PostView onPostSaved={() => { }} />} />
        <Route path="/client" element={<ClientMain />} />
        <Route path="/register" element={<Register />} />
        <Route path="/andn" element={<Main />} />
        <Route path="/calendar" element={<PrivateRoute><CalendarApp /></PrivateRoute>} />
        <Route path="/client/posts" element={<ClientPostView onClientPostSaved={() => { }} />} />
        <Route path="/OutsourcingMain" element={<PrivateRoute><OutsourcingMain /></PrivateRoute>} />

        {/* 상세보기 페이지 라우트 추가 */}
        <Route path="/andn/posts/:id" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
        <Route path="/client/posts/:id" element={<PrivateRoute><ClientPostDetail /></PrivateRoute>} />
        <Route path="/outsourcing/articles/:id" element={<PrivateRoute><OutsourcingDetail /></PrivateRoute>} />
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


/*
TODO:
test3 == Andn
test6 == Andn
testc == Client

- 클라이언트 403에러 해결
*/