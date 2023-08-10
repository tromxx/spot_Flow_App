/* 유저 정보를 핸들링하는 api */
import axios from "axios";

const DOMAIN = "";

const AuthApi = {
  // Get : 이메일 중복 확인 
  checkEmail: async (email) => {
    return await axios.get(DOMAIN + `/auth/check-duplicate-email?email=${email}`);
  },

  // Get : 닉네임 중복 확인
  checkNickname: async(nickname) => {
    return await axios.get(DOMAIN + `/auth/check-duplicate-nickname?nickName=${nickname}`);
  },

  // Get : 이메일 인증 번호 전송
  sendEmailauth: async(email) =>{
    return await axios.get(DOMAIN + `/auth/emailauth?email=${email}`);
  },

  // Get : 이메일 인증 하기
  checkEmailAuth: async(email,key) => {
    return await axios.get(DOMAIN + `/auth/emailauth/confirm?email=${email}&key=${key}`)
  },

  // Post : 회원 가입하기 
  customerSignUp : async(customerData) => {
    return await axios.post(DOMAIN + "/auth/signup", customerData)
  },

  //Get : 임시 비밀번호 보내기
  customerTmpPwd : async(email) => {
    return await axios.get(DOMAIN +`/auth/temppwd?email=${email}`)
  },

  //Post : 로그인
  customerToken : async(customerData) => {
    return await axios.post(DOMAIN + "/auth/login", customerData)
  }
};
export default AuthApi;  

