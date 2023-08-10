import { styled } from 'styled-components';
import { useTheme } from '../context/themeProvider';
import { useContext } from "react";
import { UserContext } from '../context/UserStore';
import { useState } from 'react';
import { useEffect } from 'react';
import CustomerApi from '../api/CustomerApi';
import NotificationApi from '../api/NotificationApi';
import React from 'react';

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  
  p {
    position: absolute;
    top: 10vh;
    left: 20px;
  }
  
  .first {
    position: absolute;
    top: 15vh;
    left: 20px;
  }
  .second {
    position: absolute;
    top: 15vh;
    left: 100px;
  }
  `;


const SseTest = (props) => {
  const{ email, setEmail, nickname, setNickname,setProfilePic,setStatMsg,setFollower, setFollowing ,isLoggedIn, setIsLoggedIn, received, setReceived, joinDate, setJoinDate } = useContext(UserContext);
  
  const subscribeUrl = "http://localhost:8111/sub";
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const getCustomerInfo = async () => {
      if (token != null) {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          setJoinDate(response.data.customer.joinDate)
          setEmail(response.data.customer.email);
          setNickname(response.data.customer.nickName);
          setProfilePic(response.data.customer.profilePic);
          setStatMsg(response.data.customer.statMsg);
          setFollower(response.data.follower.follower);
          setFollowing(response.data.follower.following);
          setIsLoggedIn(true);
          console.log(isLoggedIn);
          
          
        } catch (error) {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      } else {
        return null;
      }
    getCustomerInfo();
    }
}, [isLoggedIn,setEmail, setNickname, setProfilePic, setStatMsg, setIsLoggedIn,setFollower, setFollowing, setJoinDate]);



  const handleSubs = () => {
    if (email !== null) {
      const eventSource = new EventSource(subscribeUrl + "?joinDate=" + joinDate);
      console.log(eventSource);

      // addComment 이벤트 리스너 등록
      eventSource.addEventListener("addComment", function(event) {
        let message = event.data;
        console.log(message);
        alert(message);
      });

      // error 이벤트 리스너 등록
      eventSource.addEventListener("error", function(event) {
        eventSource.close();
      });

      // 컴포넌트가 언마운트될 때 EventSource 객체 닫기
      return () => {
        eventSource.close();
      };
  } else {
    alert("이메일이 없습니다");
    console.log("이메일이 없습니다");
  }
}

  const Send = async(joinDate) => {
    await NotificationApi.sseTest(joinDate);
  }

  return (
    <Container>
      <p>SSE 테스트입니다.</p>
      <button className="first" onClick={handleSubs}>subscribe</button>
      <button className="second" onClick={Send}>send</button>
      
    </Container>

  );

}

export default SseTest;
