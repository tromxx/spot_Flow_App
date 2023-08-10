import React from "react";
import Logo from '../../images/logo.png'
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const ErrorDiv = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
	 
	 p {
		color: ${props=>props.theme.textColor}
	 }
	ul{
    margin-top: 20%;
	
		width: 390px;
		display: flex;
		flex-direction: column;
		/* gap: 25px; */
		justify-content: center;
		align-items: center;
		font-family: var(--kfont);
	}
	.controlNaviDiv{
		display: flex;
		gap: 30px;
		p:nth-child(1), p:nth-child(3){
			cursor: pointer;
			&:hover{
				color: var(--lightblue);
			}
		}
	}
`;

const Error = () =>{
	const navigate = useNavigate();

   return(
      <ErrorDiv>
			<ul>
            <img src={Logo} alt="" />
				<p>로그인이 필요한 서비스 입니다.</p>
				<div className="controlNaviDiv">
					<p onClick={()=>navigate("/login")}>Login</p>
					<p>|</p>
					<p onClick={()=>navigate("/signUp")}>Sign Up</p>
				</div>
			</ul>
      </ErrorDiv>
   );
};

export default Error;