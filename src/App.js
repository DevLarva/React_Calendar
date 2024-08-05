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


// /*
//  TODO:
//  - 로그인 이후 새로고침하면 팅김(로그인 화면으로) 
//  */
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import axios from 'axios';
import { getMonth } from '../src/util';

// Calendar 관련 컴포넌트
import CalendarHeader from './Components/CalendarHeader';
import Sidebar from './Components/Sidebar';
import Month from './Components/Month';
import EventModal from './Components/EventModal';
import CombinedContextProvider from './context/CombinedContextProvider';
import CalendarContext from './context/GlobalContext';
import PrivateRoute from './Components/Login/Context/PrivateRoute';

// 로그인 및 회원가입 관련 컴포넌트
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import ClientMain from './Components/Login/Main/ClientMain';
import OutsourcingMain from './Components/Login/Main/OutsourcingMain';

// 게시물 관련 컴포넌트
import Header from './Components/Noticeboard/Header';
import SearchBar from './Components/Noticeboard/SearchBar';
import PostList from './Components/Noticeboard/PostList';
import NewPostButton from './Components/Noticeboard/NewPostButton';
import PostView from './Components/Noticeboard/PostView';
import ClientPostView from './Components/Noticeboard/ClientPostView';

// 기본 URL 설정
axios.defaults.baseURL = 'http://andn-btest-env.eba-zwp5cit2.ap-northeast-2.elasticbeanstalk.com';
// 메인 컴포넌트
function Main() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/andn/articles')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("게시물 가져오기 실패:", error);
      });
  }, []);

  const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, '');

  const filteredPosts = posts.filter(post =>
    normalizeText(post[searchCriteria]).includes(normalizeText(searchQuery))
  );

  const handleNewPostClick = () => {
    navigate('/newpost');
  };

  const handlePostSaved = () => {
    // 새 게시물 저장 후 게시물 목록 새로고침
    axios.get('/api/andn/articles')
      .then(response => {
        setPosts(response.data);
        navigate('/');
      })
      .catch(error => {
        console.error("게시물 가져오기 실패:", error);
      });
  };

  return (
    <>
      <Box my={4}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchCriteria={searchCriteria}
          setSearchCriteria={setSearchCriteria}
        />
      </Box>
      <Box my={4} sx={{ position: 'relative' }}>
        <PostList posts={filteredPosts} />
        <NewPostButton onClick={handleNewPostClick} />
      </Box>
    </>
  );
}

function ClientPostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/outsourcing/articles')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("외주업체 글 가져오기 실패:", error);
      });
  }, []);

  return <PostList posts={posts} />;
}

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

export default function App() {
  return (
    <CombinedContextProvider>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/calendar" element={<PrivateRoute><CalendarApp /></PrivateRoute>} />
            <Route path="/ClientMain" element={<PrivateRoute><ClientMain /></PrivateRoute>} />
            <Route path="/OutsourcingMain" element={<PrivateRoute><OutsourcingMain /></PrivateRoute>} />
            <Route path="/newpost" element={<PostView onPostSaved={() => { }} />} />
            <Route path="/client/posts" element={<ClientPostList />} />
          </Routes>
        </Container>
      </Router>
    </CombinedContextProvider>
  );
}
