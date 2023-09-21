import { styled } from 'styled-components';
import Logo from '../../images/ImgLogo.png';
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";
import { BiExit } from 'react-icons/bi'
import { useState } from 'react';
import { VscBellDot, VscBell } from 'react-icons/vsc'
import { useEffect } from 'react';

const HeaderBarDiv = styled.div`
  width: 100vw;
  height: calc(100vh - 93vh - 1px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 160%;
  border-bottom: ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  transition: background-color 0.5s ease;
  .LogoContainer{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 3vw;
    cursor: pointer;
    img{
      width: 30px;
    }
  }
  .LoggedOutContainer{
    display: flex;
    flex-direction: row;
    padding-right: 3vw;
    gap: 15px;
    cursor: pointer;
    p:nth-child(odd):hover{
      color: var(--lightblue);
    }
  }
  .LoggedInContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 3vw;
    gap: 15px;
  }
`;

const Exit = styled(BiExit)`
  width: 30px;
  height: 30px;
  color : ${props=>props.theme.textColor};
  cursor: pointer;
  &:hover{
    color: var(--lightblue);
  }
`;

const NofiOn = styled(VscBellDot)`
  width: 30px;
  height: 30px;
  color : ${props=>props.theme.textColor};
  cursor: pointer;
  &:hover{
    color: var(--lightblue);
  }
  `;

const NofiNone = styled(VscBell)`
  width: 30px;
  height: 30px;
  color : ${props=>props.theme.textColor};
  cursor: pointer;
  &:hover{
    color: var(--lightblue);
  }
`;


const HeaderBar = () => {
  const navigate = useNavigate();
  const { nickname, joinDate, setIsLoggedIn, isLoggedIn} = useContext(UserContext);
  const [isNew, setIsNew] = useState("");

  useEffect(() => {
    const subscribeUrl = "http://localhost:8111/sub";
    const getNotiInfo = async () => {
      if ( joinDate !== null) {
        const eventSource = new EventSource(subscribeUrl + "?joinDate=" + joinDate);
        console.log(eventSource);
        // addComment 이벤트 리스너 등록
        eventSource.addEventListener("addComment", function(event) {
          let message = event.data;
          setIsNew(event.data);
          console.log(message);
          // alert(message);
        });

        // error 이벤트 리스너 등록
        eventSource.addEventListener("error", function(event) {
          eventSource.close();
        });

        // 컴포넌트가 언마운트될 때 EventSource 객체 닫기
        return () => {
          eventSource.close();
        };
      }
    };
    getNotiInfo();
  },[joinDate]);

  const handleLogOut = () =>{
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  }

  const handleNoti = () => {
    navigate("/notification");
    setIsNew("");
  }

  return (
    <HeaderBarDiv>
      <div className='LogoContainer' onClick={()=>navigate("/")}>
        <img src={Logo} alt="Error" />
        <h3>Spot<span style={{ color: '#00B4D8' }}>F</span>low</h3>
      </div>
      {isLoggedIn ?
        <div className='LoggedInContainer'>
              {isNew !== "" ? <NofiOn onClick={handleNoti}/> : <NofiNone onClick={handleNoti}/>}
          <p>{nickname}</p>
            <Exit onClick={handleLogOut}/>
        </div>
        :
        <div className='LoggedOutContainer'>
          <p onClick={()=>navigate("/login")}>Login</p>
          <p>|</p>
          <p onClick={()=>navigate("/signup")}>Sign up</p>
        </div>
      }
    </HeaderBarDiv>
  );
};

export default HeaderBar;
