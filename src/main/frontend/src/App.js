import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import TimeLine from './pages/TimeLine';
import HeaderBarNavi from './components/Common/HeaderBarNavi';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import {ThemeProvider} from './context/themeProvider';
import DiaryMypage from './pages/DiaryMypage';
import {DiarySwiper} from "./components/DiaryDetail/DiarySwiper";
import DiaryCreate from './pages/DiaryCreate';
import UserStore from './context/UserStore';
import MyFlow from './pages/MyFlow';
import MobileMyFlow from './pages/MobileMyFlow';
import FindPwEmail from './pages/FindPwEmail';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import ChangeInfo from './pages/ChangeInfo';
import Notification from './pages/Notification';
import DirectMessenger from "./pages/DirectMessenger";
import WebSocketProvider from "./context/WebSockeProvider";
import DiaryUser from './pages/DiaryUser';
import DiaryEdit from './pages/DiaryEdit';
import Profile from './pages/Profile';
import userEvent from '@testing-library/user-event';



export const WebSocket = React.createContext();

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [webSocketService, setWebSocketService] = useState(null);

  useEffect(() => {
    const service = new WebSocketProvider();
    service.connect().then(() => {
      setWebSocketService(service);
      console.log(service);
    });

    return () => {
      service.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WebSocket.Provider value={webSocketService}>
      <UserStore>
        <BrowserRouter>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<>
                {windowWidth <= 840 ? null : <HeaderBarNavi/>}
                <Home/>
              </>} />
            <Route path="/login" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <Login />
            </>} />
            <Route path="/signup" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <SignUp />
            </>} />
            <Route path="/findpwemail" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <FindPwEmail />
            </>} />
            <Route path="/changeinfo" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <ChangeInfo />
            </>} />
            <Route path="/diary" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <Diary />
            </>} />
              




            <Route path="/diaryCreate" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <DiaryCreate />
            </>} />
            <Route path="/diaryedit/:id" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <DiaryEdit />
            </>} />
            <Route path="/diary/user/:id" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <Profile/> 
            </>} />
            <Route path="/diary/detail/:id" element={
              <>
                  {windowWidth <= 840 ? null : <HeaderBarNavi />}
                <DiarySwiper/>
              </>
            }/>
                   <Route path="/spot" element={
              <>
                  {windowWidth <= 840 ? null : <HeaderBarNavi />}
                <TimeLine/>
              </>
            }/>
               <Route path="/profile/:id" element={
              <>
                  {windowWidth <= 840 ? null : <HeaderBarNavi />}
                <Profile/>
              </>
            }/>

        <Route path="/mydiary" element={<>
                      {windowWidth <= 840 ? null : <HeaderBarNavi />}
                      {/* <DiaryMypage />} */}
                      {/* 성근씨 파트 */}
                    </>} />

            <Route path="/myprofile/:id" element={
              <>
                  {windowWidth <= 840 ? null : <HeaderBarNavi />}
                <Profile isMy={true}/>
              </>
            }/>

              <Route path='/myspot' element={
                <>
                  {windowWidth <= 840 ? null : <HeaderBarNavi/>}
                  {windowWidth <= 840 ? <MobileMyFlow/> : <MyFlow/>}


                </>
              }/>
              <Route path='/notification' element={
                <>
                  {windowWidth <= 840 ? null : <HeaderBarNavi/>}
                  <Notification/>
                </>
              }
              />
              <Route path='/chat/:receiver/:sender' element={
                <>
                  {windowWidth <= 840 ? null : <HeaderBarNavi/>}
                  <DirectMessenger/>
                </>
              }
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </UserStore>
    </WebSocket.Provider>

  );
}

export default App;
