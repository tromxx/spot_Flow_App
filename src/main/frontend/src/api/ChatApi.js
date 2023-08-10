/* 서울시 실시간 도시 데이터를 서버를 통해 가져와서 파싱하는 api 호출 페이지*/
import axios from "axios";

const DOMAIN = ""

const ChatApi =  {
  createRoom : async (receiver) => {
    const token = localStorage.getItem("authToken");
    return await axios.post(DOMAIN + "/room", {receiver:receiver}, {
      headers :{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },
  findChatLog : async (id) => {
    const token = localStorage.getItem("authToken");
    return await axios.get(DOMAIN + "/chat/" + id, {
      headers :{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

export default ChatApi;