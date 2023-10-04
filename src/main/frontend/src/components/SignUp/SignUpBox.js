import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import LoginSignUpModal from "../../utils/LoginSignUpModal";
import AuthApi from "../../api/AuthApi";

const SingupDiv = styled.div`
     display: flex;
     justify-content: center;
     align-items: center;
     text-align: center;
     ul {
          margin-top: 5%;
          width: 500px;
          display: flex;
          flex-direction: column;
          gap: 13px;
          justify-content: center;
          align-items: center;
          border: 2px solid var(--grey);
          border-radius: 20px;
          padding: 40px;
          list-style: none;
     }
     li {
          display: flex;
          gap: 10px;
     }
     li:first-child {
          cursor: pointer;
     }
     li:nth-child(2) {
          margin-bottom: 25px;
     }
     input {
          width: 330px;
          height: 50px;
          font-size: 15px;
          border: 0;
          border-radius: 20px;
          outline: none;
          padding-left: 10px;
          background-color: #e9e9e9;
          font-family: var(--efont);
          font-size: 20px;
     }
     li:nth-child(6) input {
          width: 410px;
     }
     li:last-child button{
          width: 420px;
          height: 50px;
          font-size: 17px;
     }
     button {
          width: 70px;
          height: 50px;
          background-color: var(--lightblue);
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 700;
     }
     button:hover {
          color: white;
     }
     span {
          width: 370px;
          font-size: 15px;
     }
     .strength-indicator {
          width: 130px;
          height: 24px;
          border: 1px solid #ccc;
          border-radius: 20px;
     }
     .strength-weak {
          background-color: red;
     }
     .strength-medium {
          background-color: yellow;
     }
     .strength-strong {
          background-color: green;
     }
     @media (max-width: 844px) {
        ul {
          padding: 0;
          border: none;
        }
        input {
            width: 260px;
        }
        li:nth-child(6) input {
            width: 340px;
        }
        .strength-indicator{
            width: 105px;
        }
        li:last-child button{
             width: 350px;
        }
     }
`;

const SignupContainer = ({confirmFirstPolicy, confirmSecondPolicy}) => {
     const navigate = useNavigate();
     const [inputId, setInputId] = useState("");
     const [modalOpen, setModalOpen] = useState(false);
     const [text, setText] = useState("");
     const [isId, setIsId] = useState(false);
     const [isAuth, setIsAuth] = useState(false);
     const [isPwd, setIsPwd] = useState(false);
     const [IsNickName, setIsNickName] = useState(false);
     const [validEmail, setValidEmail] = useState(false);
     const [sendMessage, setSendMessage] = useState(false);
     const [idMessage, setIdMessage] = useState("");
     const [nickNameMessage, setNickNameMessage] = useState("");
     const [inputAuth, setInputAuth] = useState("");
     const [inputPw, setInputPw] = useState("");
     const [inputConPw, setInputConPw] = useState("");
     const [inputNickName, setInputNickName] = useState("");
     const [passwordStrength, setPasswordStrength] = useState("약");
     const [pwMessage, setPwMessage] = useState("");
     const [type, setType] = useState(false);

     const onChangId = (e) => {
          const validateEmail = (email) => {
               const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
               return regex.test(email);
          };
          setInputId(e.target.value);
          if (!validateEmail(e.target.value)) {
               setIdMessage("이메일 형식으로 입력해주세요.");
               setValidEmail(false);
          } else {
               setIdMessage("올바른 형식입니다.");
               setValidEmail(true);
          }
     };

     const handleId = async () => {
          if (validEmail) {
               try{
                    const mailCheck = await AuthApi.checkEmail(inputId);
                    if(mailCheck.data === false){
                         setModalOpen(true);
                         setText("사용 가능한 이메일입니다.");
                         setIsId(true);
                    }else{
                         setModalOpen(true);
                         setText("이미 사용중인 이메일입니다.");
                         setIsId(false);
                    }
               }catch(error){
                    setModalOpen(true);
                    setText("잘못된 이메일입니다.");
               }
          } else {
               setModalOpen(true);
               setText("이메일 를 입력하세요.");
          }
     };

     const handleSendEmail = async () => {
          if (isId) {
               setModalOpen(true);
               setText("인증번호를 전송했습니다.");
               await AuthApi.sendEmailauth(inputId);
               setSendMessage(true);
          } else {
               setModalOpen(true);
               setText("이메일 중복확인을 확인해주세요.");
          }
     };

  const handleConfirmEmailAuth = async () => {
     try {
          const authCheck = await AuthApi.checkEmailAuth(inputId, inputAuth);
          if (authCheck.data === true) {
               setModalOpen(true);
               setText("인증이 완료되었습니다.");
               setIsAuth(true);
          } else {
               setModalOpen(true);
               setText("잘못된 인증번호입니다.");
               setModalOpen(true);
          }
     } catch (error) {
          setModalOpen(true);
          setText("이미 인증이 완료되었습니다.");
     }
  };

     const onChangePwd = (e) => {
          const newPassword = e.target.value;

          setInputPw(newPassword);

          const strength = calculatePasswordStrength(newPassword);
          setPasswordStrength(strength);
          setPwMessage("숫자, 대소문자 영문자, 특수문자를 포함한 8~25자리로 입력해주세요");
     };

     const calculatePasswordStrength = (password) => {
          const hasUppercase = /[A-Z]/.test(password);
          const hasLowercase = /[a-z]/.test(password);
          const hasNumber = /\d/.test(password);
          const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password);
          const isLengthValid = password.length >= 8;

     if (
          isLengthValid &&
          hasUppercase &&
          hasLowercase &&
          hasNumber &&
          hasSpecialChar
     ) {
          return "강";
     } else if (
          isLengthValid &&(hasUppercase || hasLowercase || hasNumber || hasSpecialChar)) {
          return "중";
          } else {
          return "약";
     }
  };

  	const handleConfirmPassword = () => {
		if(inputPw.length === 0){
			setModalOpen(true);
			setText("비밀번호를 입력하세요.");
		}else{
			if(inputPw === inputConPw){
				setModalOpen(true);
				setText("비밀번호가 일치 합니다.")
				setIsPwd(true);
			}else{
				setModalOpen(true);
				setText("비밀번호가 일치 하지 않습니다.");
			}
		}
	};

   const onChangeNickName = (e) => {
     setInputNickName(e.target.value);
     if (e.target.value.length < 2 || e.target.value.length > 12) {
       setNickNameMessage("2자리 이상 12자리 미만으로 입력해 주세요.");
       setIsNickName(false);
     } else {
       setNickNameMessage("올바른 형식 입니다.");
     }
   }

	const handleNickName = async() => {
		if(inputNickName.length === 0){
			setModalOpen(true);
			setText("닉네임을 입력하세요.");
		}else{
			try{
				const nickNameCheck = await AuthApi.checkNickname(inputNickName);
				if(nickNameCheck.data === false){
					setModalOpen(true);
					setText("사용 가능한 닉네임 입니다.");
					setIsNickName(true);
				}else{
					setModalOpen(true);
					setText("이미 사용중인 닉네임 입니다.");
				}
			}catch(error){
				setModalOpen(true);
				setText("닉네임을 입력하세요");
			}
		}
	}


     const handleSignUp = async() => {
          setType(true);
          const customerData = {
               email : inputId,
               nickName : inputNickName,
               password  : inputConPw
          };
          const signUpCheck = await AuthApi.customerSignUp(customerData);
          if(signUpCheck.data === true){
               setModalOpen(true)
               setText("SpotFlow에 가입하신 것을 환영합니다.");
          }else{
               setModalOpen(true)
               setText("회원가입에 실패했습니다.");
          }
     }

     const onConfirm = () =>{
          if(type && confirmFirstPolicy && confirmSecondPolicy && isId && isPwd && IsNickName && isAuth){
               navigate("/login");
          }else{
               setModalOpen(false);
          }
     };

     const handleCheckSignUp = () =>{
          setModalOpen(true);
          setText("정보를 모두 입력해주세요.")
     }

  return (
    <>
      <SingupDiv>
        <ul>
          <li onClick={() => navigate("/")}>
            <img src={Logo} alt="Error" />
          </li>
          <li>
            <h2>회원정보 입력</h2>
          </li>
          <li>
            <input
              type="text"
              onChange={onChangId}
              placeholder="이매일 입력하세요."
              disabled={isId}
            />
            <button onClick={handleId} disabled={isId}>
              중복확인
            </button>
          </li>
          <li>{inputId.length > 0 && <span>{idMessage}</span>}</li>
          <li>
            <input
              type="text"
              onChange={(e) => setInputAuth(e.target.value)}
              placeholder="인증번호를 입력하세요."
              disabled={isAuth}
            />
            {sendMessage ? (
              <button onClick={handleConfirmEmailAuth} disabled={isAuth}>
                인증번호 확인하기
              </button>
            ) : (
              <button onClick={handleSendEmail}>인증번호 전송하기</button>
            )}
          </li>
          <li>
            <input
              type="password"
              onChange={onChangePwd}
              placeholder="비밀번호를 입력하세요."
              disabled={isPwd}
            />
          </li>
          <li>
            <div
              className={`strength-indicator ${
                passwordStrength === "약" ? "strength-weak" : ""
              }`}
            >약</div>
            <div
              className={`strength-indicator ${
                passwordStrength === "중" ? "strength-medium" : ""
              }`}
            >중</div>
            <div
              className={`strength-indicator ${
                passwordStrength === "강" ? "strength-strong" : ""
              }`}
            >강</div>
          </li>
          <li>{inputPw.length > 0 && <span>{pwMessage}</span>}</li>
          <li>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              onChange={(e) => setInputConPw(e.target.value)}
              disabled={isPwd}
            />
            <button onClick={handleConfirmPassword} disabled={isPwd}>비밀번호 확인하기</button>
          </li>
          <li>
               <input type="text" placeholder="닉네임을 입력하세요." onChange={onChangeNickName} disabled={IsNickName}/>
               <button onClick={handleNickName} disabled={IsNickName}>중복확인</button>
          </li>
          <li>{inputNickName.length > 0 && <span>{nickNameMessage}</span>}</li>
          <li>{(confirmFirstPolicy && confirmSecondPolicy && isId && isPwd && IsNickName && isAuth) ?
                    <button onClick={handleSignUp}>
                         Spot<span style={{ color: '#00B4D8', fontSize: '17px' }}>F</span>low 가입하기
                    </button>:
                    <button style={{background: '#e9e9e9'}} onClick={handleCheckSignUp}>
                         Spot<span style={{color: '#00B4D8', fontSize: '17px' }}>F</span>low 가입하기
                    </button>
               }
          </li>
        </ul>
      </SingupDiv>
      <LoginSignUpModal
        open={modalOpen}
        children={text}
        type={true}
        confirm={onConfirm}
      />
    </>
  );
};

export default SignupContainer;