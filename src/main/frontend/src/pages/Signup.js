import React from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoginSingUpModal from "../utils/LoginSignUpModal"
import styled from "styled-components";
import Policy from "../dataSet/SpotFlowPolicy";
import LocationPolicy from "../dataSet/LocationPolicy";
import AuthApi from "../api/AuthApi";
import Checkbox from "../utils/CheckBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  .policyContainer {
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 100px;
  }   
  .readContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 300px;
    overflow : auto;
    padding: 5px;
    font-size: small;
    padding: 20px;
  }
  .readContainer::-webkit-scrollbar {
    width: 10px;
  }
  .readContainer::-webkit-scrollbar-thumb {
    background-color: var(--blue);
    border-radius: 10px;
  }
  .readContainer::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 10px;
  }
  p{
    font-weight: bold;
    font-size: 25px;
    margin: 0 auto;
  }
	.sign{
		margin-top: 150px;
    padding: 0;
		display: flex;
		color: #313131;
    min-width: 150px;
	}
  .item1{
    margin-top: 100px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
  }
  .item3 {
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 14px;
  }
  .item5 {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 90px;
    display: flex;
    align-items: center;
  }
  .emailAuth{
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 90px;
    display: flex;
    align-items: center;
  }
  .check {
    width: 80px; 
    height: auto; 
    padding: .8em .5em;
    font-family: var(--kfont);
    border: 1px solid var(--grey);
    font-weight: normal;
    border-radius: 18px; /* iSO 둥근모서리 제거 */
    outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
    cursor: pointer;
    background-color: var(--blue);
    color: white;
    &:hover{
      color: black;
    }
  }
  .hint {
    display: flex;
    margin-top: -5px;
    margin-bottom: 10px;
    justify-content:right;
    align-items:center;
    font-size: 12px;
    color: var(--blue);
  }
  .enable-button {
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 50px;
    font-size: 26px;
    font-weight: bold;
    max-width: 400px; /* 원하는 너비 설정 */
    width: 50vw;
    height: 50px;
    color: white;
    background-color: var(--blue);
    font-size: 15px;
    font-weight: 400;
    border-radius: 8px;
    border: #00B4D8;
    font-weight: 700;
    cursor: pointer;
  }
  .disable-button {
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 50px;
    max-width: 400px; /* 원하는 너비 설정 */
    width: 50vw;
    height: 50px;
    font-weight: bold;
    color: white;
    background-color: var(--grey);
    border-radius: 8px;
    border: none;
    cursor: pointer;
    &:hover{
      color: black;
    }
  }
  .InfoNotice {
    margin: 0 auto;
  }
  #myCheckbox {
    margin-bottom: 50px;
  }
  label {
    font-size: 12px;
  }
  @media(max-width : 844px){
    .readContainer{
      width: 310px;
    } 
  }
`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  max-width: 400px; /* 원하는 너비 설정 */
  width: 50vw;
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 8px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
  background-color: ${props=>props.theme.divColor === '#d'};
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState("");
  const [inputAuth, setInputAuth] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [isId, setIsId] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPw, setIsPw] = useState(false)
  const [isConPw, setIsConPw] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("중복된 아이디 입니다.");
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [isLocationPolicyChecked, setIsLocationPolicyChecked] = useState(false);
  const [switchButton, setSwitchButton] = useState(true);

  const handleUserPolicyChange = useCallback((e) => {
    setIsPolicyChecked(e.target.checked);
    console.log(isPolicyChecked);
  }, [isPolicyChecked]);

  const handleLocationPolicyChange = useCallback((e) => {
    setIsLocationPolicyChecked(e.target.checked);
    console.log(isLocationPolicyChecked);
  }, [isLocationPolicyChecked]);
  
  const closeModal = () => {
    setModalOpen(false);
  };
  
  // 아이디(이메일) 정규식 확인
  const onChangId = (e) => {
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    setInputId(e.target.value);
    if (!validateEmail(e.target.value)) {
      setIdMessage("이메일 형식으로 입력해주세요");
    } else {
      setIdMessage("올바른 형식입니다.");
    }
  };

  //아이디(이메일) 중복 확인
  const onClickCheckEmail = async() => {
    if(idMessage === "올바른 형식입니다."){
      const mailCheck = await AuthApi.checkEmail(inputId);
      console.log(mailCheck);
      if(mailCheck.data === false) {
        setIdMessage("사용 가능한 이메일입니다.");
        setIsId(true);
      } else {
        setIdMessage("이미 사용중인 이메일입니다.");
        setIsId(false); 
      }
    }else{
      setIdMessage("이메일을 입력하세요.");
    }
  }

  //인증번호 저장하기
  const onChangAuth = (e) => {
    setInputAuth(e.target.value);
    console.log(inputAuth);
  }
  
  //이메일 인증 메일 보내기 
  const onClickSendEmailAuth = async() =>{
    if(isId){
      setAuthMessage("인증번호를 전송했습니다.");
      setSwitchButton(false);
      await AuthApi.sendEmailauth(inputId);
    }else{
      setAuthMessage("인증번호 전송에 실패했습니다. 다시 확인해주세요.");
    }
  };

  //이메일 인증 완료
  const onClickConfirmEmailAuth = async() => {
    const authCheck = await AuthApi.checkEmailAuth(inputId , inputAuth);
    if(authCheck.data === true){
      setAuthMessage("인증이 완료됬습니다.");
      setIsAuth(true);
    }else{
      setAuthMessage("잘못된 인증번호 입니다.");
    }
  };

  // 비밀번호 정규식 확인
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value ;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage('숫자, 영문자, 특수문자를 포함한 8~25자리로 입력해주세요')
      setIsPw(false)
    } else {
      setPwMessage('안전한 비밀번호에요 :)')
      setIsPw(true);
    }        
  };

  // 비밀번호 확인 창 일치 여부 
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value ;
    setInputConPw(passwordCurrent)
    if (passwordCurrent !== inputPw) {
      setConPwMessage('비밀번호가 일치하지 않습니다.')
      setIsConPw(false)
    } else {
      setConPwMessage('비밀번호가 일치 합니다. )')
      setIsConPw(true);
    }      
  }

  // 닉네임 정규식 체크
  const onChangeNickName = (e) => {
    setInputNickName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 12) {
      setNickNameMessage("2자리 이상 12자리 미만으로 입력해 주세요.");
      setIsNickName(false);    
    } else {
      setNickNameMessage("올바른 형식 입니다.");
    }
  }

    //닉네임 중복 확인하기
  const onClickCheckNickName = async() => {
    if(nickNameMessage === "올바른 형식 입니다."){
      const mailCheck = await AuthApi.checkNickname(isNickName);
      if(mailCheck.data === false) {
        setNickNameMessage("사용 가능한 닉네임 입니다.")
        setIsNickName(true);
      } else {
        setIdMessage("이미 사용중인 닉네임 입니다.")
        setIsNickName(false); 
      }
    }
  }

  //회원가입 완료
  const onClickSignUp = async() => {
    const customerData = {
      email : inputId,
      nickName : inputNickName,
      password  : inputConPw
    };
    const signUpCheck = await AuthApi.customerSignUp(customerData);
    if(signUpCheck.data === true){
      setModalOpen(true)
      setModalText("SpotFlow에 가입하신 것을 환영합니다.");
    }else{
      setModalOpen(true)
      setModalText("회원가입에 실패했습니다.");
    }
  }

  const onConfirm = () =>{
    if(isPolicyChecked && isLocationPolicyChecked && isId && isPw && isConPw && isNickName && isAuth){
      navigate("/");
    }else{
      setModalOpen(false);
    }
  };

  const onClickCheckSignUp = () =>{
    setModalOpen(true);
    setModalText("정보를 모두 입력해주세요.")
  }
  
  return(
    <Container>
      <div className="sign">
        <p>회원가입</p>    
      </div>
      <div className="policyContainer">
        <h3>회원기반 서비스 약관 동의</h3>
        <div className="readContainer">
          <Policy/>
        </div>
        <Checkbox 
          text={"(필수)스팟플로우 회원 약관에 동의합니다"}
          checked={isPolicyChecked}
          onChange={handleUserPolicyChange}
        />
        <h3>위치기반 서비스 약관 동의</h3>
        <div className="readContainer">
          <LocationPolicy/>
        </div>
        <Checkbox 
          text={"(필수)스팟플로우 위치 약관에 동의합니다"}
          checked={isLocationPolicyChecked}
          onChange={handleLocationPolicyChange}
        />
      </div>
      <div className="InfoNotice">
        <h3>회원정보 입력</h3>
      </div>
      <div className="item5">
        <Input type="email" placeholder="이메일" value ={inputId} onChange={onChangId} className="emailInput"/>
        <button className="check" onClick={onClickCheckEmail}>중복확인</button>
      </div>
      <div className="hint">
        {inputId.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>}
      </div>
      <div className="emailAuth">
        <Input type="email" placeholder="인증번호를 입력하세요" value={inputAuth} onChange={onChangAuth}/>
        {switchButton ? (
          <button className="check" onClick={onClickSendEmailAuth}>인증번호</button>
           ):(
          <button className="check" onClick={onClickConfirmEmailAuth}>확인</button>
        )}
      </div>
      <div className="hint">
        {<span className={`message ${isId ? 'success' : 'error'}`}>{authMessage}</span>}
      </div>
      <div className="item2">
        <Input type="password" placeholder="비밀번호" value ={inputPw} onChange={onChangePw}/>
      </div>
      <div className="hint">
        {inputPw.length > 0 && (
        <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
      </div>
      <div className="item2">
        <Input 
          type="password" 
          placeholder="비밀번호 확인" 
          value ={inputConPw} 
          onChange={onChangeConPw}
        />
      </div>
      <div className="hint">
        {inputPw.length > 0 && (
          <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage}</span>
        )}
      </div>
      <div className="item5">
        <Input 
          type="text" 
          placeholder="닉네임" 
          value ={inputNickName} 
          onChange={onChangeNickName} 
          className="nicknameInput"
        />
        <button className="check" onClick={onClickCheckNickName}>중복확인</button>
      </div>
      <div className="hint">
        {inputNickName.length > 0 && (
        <span className={`message ${isConPw ? 'success' : 'error'}`}>{nickNameMessage}</span>)}
      </div>
      <div className="item2">
        {(isPolicyChecked && isLocationPolicyChecked && isId && isPw && isConPw && isNickName && isAuth) ? ( 
          <button className="enable-button" onClick={onClickSignUp}>회원가입</button>
        ) : ( 
          <button className="disable-button" onClick={onClickCheckSignUp}>회원가입</button>
        )}
        <LoginSingUpModal type={true} confirm={onConfirm} open={modalOpen} close={closeModal}>{modalText}</LoginSingUpModal>
      </div>
    </Container>
  );
};

export default SignUp;