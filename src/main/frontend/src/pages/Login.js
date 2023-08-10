import styled from 'styled-components'
import Logo from "../images/logo.png"
import GoogleLogo from "../images/GoogleLogin.png"
import KakaoLogo from "../images/KakaoLogin.png"
import SpotLogo from "../images/SpotFlowLogin.png"
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import LoginSignUpModal from "../utils/LoginSignUpModal"
import AuthApi from "../api/AuthApi"
import { UserContext } from "../context/UserStore";
import { useEffect } from 'react'

const LogInDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ul{
      margin-top: 10%;
		width: 400px;
		display: flex;
		flex-direction: column;
		gap: 25px;
		justify-content: center;
		align-items: center;
		border: 2px solid var(--grey);
		border-radius: 20px;
		padding: 100px;
		list-style: none;
		font-family: var(--kfont);
	}
  input {
      width: 400px;
      height: 50px;
      font-size: 15px;
      border: 0;
      border-radius: 20px;
      outline: none;
      padding-left: 10px;
      background-color: rgb(233, 233, 233);
      font-family: var(--efont);
      font-size: 20px;
   }
   li:nth-last-child(-n+3) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px;
      height: 50px;
      font-size: 20px;
      border: 0;
      border-radius: 20px;
      outline: none;
      padding-left: 10px;
      text-align: center;
      background-color: white;
      border: 2px solid var(--grey);
      cursor: pointer;
      background-color: var(--lightblue);
   }
   li:nth-last-child(2) {
      background-color: transparent;
   }
	li:nth-last-child(1){
		background-color: yellow;
	}
    .container{
      display: flex;
      gap: 30px;
		margin: 30px 0;
      font-family: var(--kfont);
      cursor: pointer;
      p:hover{
         color: var(--blue);
      }
   }
	@media (max-width : 844px) {
		ul{
			padding: 0;
            border: none;
		}
		input{
			width: 260px;
      }
		li:nth-last-child(-n+3) {
         width: 260px;
      }
	}

   .logo:hover {
      cursor: pointer;
   }
`;

const Login = () => {
   const navigate = useNavigate();
   const [inputEmail, setInputEmail] = useState();
   const [inputPwd , setInputPwd] = useState();
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
   const { setIsLoggedIn} = useContext(UserContext);

   useEffect(()=>{
      localStorage.clear();
   },[])

	const onClickChecking = async() =>{
		const customerData = {
			email : inputEmail,
			password : inputPwd
		};
		try{
			const response = await AuthApi.customerToken(customerData);
			const  {accessToken} = response.data;
			localStorage.setItem('authToken', accessToken);
         console.log(localStorage.getItem('authToken'));
			navigate("/")
         setIsLoggedIn(true);
		}catch(error){
			setOpen(true);
			setMessage("잘못된 아이디 혹은 비밀번호입니다.");
         setIsLoggedIn(false);
		}
	};


   return(
      <LogInDiv>
         <ul>
            <li><img src={Logo} onClick={()=>navigate("/")} alt="logo" className="logo" /></li>
            <li><input onChange={(e)=>setInputEmail(e.target.value)} type="text" placeholder="email@sample.com"/></li>
            <li><input onChange={(e)=>setInputPwd(e.target.value)} type="password" placeholder="password"/></li>
            <div className="container">
               <p onClick={()=>navigate("/signup")}>회원가입</p>
               <p>|</p>
               <p onClick={()=>navigate("/findpwemail")}>비밀번호 찾기</p>
            </div>
            <li onClick={onClickChecking}><img src={SpotLogo} alt="" /></li>
            <li><img src={GoogleLogo} alt="" /></li>
            <li><img src={KakaoLogo} alt="" /></li>
         </ul>
			<LoginSignUpModal 
				children={message} 
				type={true} 
				confirm={()=>setOpen(false)} 
				open={open}
				close={()=>setOpen(false)}/>
      </LogInDiv>
   );
};

export default Login;