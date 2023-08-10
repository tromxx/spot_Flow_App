import React from "react";
import Logo from "../images/logo.png"
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginSignUpModal from "../utils/LoginSignUpModal"
import AuthApi from "../api/AuthApi"

const FindPwEmailDiv = styled.div`
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
	li:nth-last-child(3) {
		color: grey;
	}
	li:nth-last-child(2){
		display: flex;
   	justify-content: center;
   	align-items: center;
   	width: 400px;
   	height: 50px;
   	border-radius: 20px;
   	outline: none;
   	padding-left: 10px;
      font-weight: bold;
   	border: 2px solid var(--grey);
   	cursor: pointer;
	}
   .routeDiv{
      display: flex;
      gap: 30px;
      p:nth-child(1):hover, p:nth-child(3):hover{
         cursor: pointer;
         color: var(--lightblue);
      }
   }
   @media (max-width : 844px){
      ul{
         padding: 0;
         border: none;
      }
      input{
         width: 260px;
      }
      li{
         width: 260px;
      }
      ul>.activeLi{
         width: 260px;
      }
      ul>.notactiveLi{
         width: 260px;
      }
   }
`;

const FindPwEmail = () =>{
   const navigate = useNavigate();
	const [email, setEmail] = useState();
	const [message, setMessage] = useState();
	const [condition, setCondition] = useState(false); 
   const [isConfirm, setIsConfirm] = useState(false);
   const [modal, setModal] = useState(false);
   const [text, setText] = useState("");

	const checkRegXEmail = (e) => {
		const validateEmail = (email) => {
		  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		  return regex.test(email);
		}
		setEmail(e.target.value);
		if (!validateEmail(e.target.value)) {
			setMessage("이메일 형식으로 입력해주세요");
			setCondition(false);
		} else {
			setMessage("올바른 형식입니다.");
			setCondition(true);
		}
	};

   const errorModal = () =>{
      setModal(true);
      setText("이메일을 입력하세요");
   }
   
   const sendTempPwd = async()=>{
      console.log("working");
      try{
         const response = await AuthApi.customerTmpPwd(email);
         if(response){
            setIsConfirm(true);
            setModal(true);
            setText("이메일을 확인 부탁드립니다.");
         }
      }catch(error){
         setModal(true)
         setText("없는 이메일 입니다.");
      }
   }

   const check = () => {
      if(isConfirm){
         navigate("/login");
      }else{
         setModal(false);
      }
   }
   
   return(
        <FindPwEmailDiv>
         {console.log(isConfirm)}
            <ul>
               <li><img src={Logo} alt="" onClick={()=>navigate("/")}/></li>
               <li><h3>로그인에 문제가 있나요?</h3></li>
               <li>이메일 주소를 입력하시면 계정에 다시 액세스할 수 있는 임시 비밀번호를 보내드립니다.</li>
               <li><input placeholder="email@gmail.com" onChange={checkRegXEmail}/></li>
					<li>{message}</li>
					{condition ? 
						<li className="activeLi" onClick={sendTempPwd} style={{background:'var(--lightblue)'}}>로그인 링크 보내기</li>:	//true			 
						<li className="notactiveLi" onClick={errorModal} style={{background:'var(--grey)'}}>로그인 링크 보내기</li>	//false			 
					}
               <div className="routeDiv">
                  <p onClick={()=>navigate("/login")}>로그인</p>
                  <p>|</p>
                  <p onClick={()=>navigate("/signup")}>회원가입</p>
               </div>
            </ul>
            <LoginSignUpModal
               open = {modal}
               children = {text}
               close = {()=>setModal(false)}
               type ={true}
               confirm = {check}
            />
        </FindPwEmailDiv>
    );
};

export default FindPwEmail;