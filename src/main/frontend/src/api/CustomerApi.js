import axios from "axios";

const DOMAIN = "";

const CustomerApi = {
    //Get 회원정보 token 으로 가죠오기
  getCustomerInfo: async (token) => {
    return await axios.get(DOMAIN + "/customer/profile",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  //테이블 아이디 값으로 가져오기 
  getCustomerInfoById: async (id) => {
    const token = localStorage.getItem("authToken");
    return await axios.get(DOMAIN + `/customer/profile/${id}`
    ,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  //put 사용자 상테 메시지 수정
  updateStatMsg: async (token, data) => {
    try {
      return await axios.put(DOMAIN + "/customer/updatestatmsg", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  },

  //put 사용자 이미지 수정
  updateProfilePic: async (token, data) => {
    try {
      return await axios.put(DOMAIN + "/customer/updateprofilepic", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  },

  updateStatMsgProfilePic: async (token, data) => {
    try {
      return await axios.put(DOMAIN + "/customer/updateprofile", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default CustomerApi;