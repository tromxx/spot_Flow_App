import {Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client';


const token = localStorage.getItem("authToken");
const endPoint = new SockJS("/ws");
const stompClient = Stomp.over(endPoint);
const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

class WebSocketProvider {
  constructor() {
    this.stompClient = stompClient;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.stompClient.connect(header, (frame) => {
        console.log("연결상태 : " + frame);
        resolve(frame);
      }, (error) => {
        console.error("Error while connecting: " + error);
        reject(error);
      });
    });
  }

  send(path, body) {
    const url = "/app" + path;
    this.stompClient.send(url, header, JSON.stringify(body));
    console.log("definition : " + url);
    console.log("jwt 코드 : " + header.Authorization)
  }

  subscribe(path, callback) {
    const url = "/notification" + path;
    console.log("definition : " + url);
    return this.stompClient.subscribe(url, (response) => {
      const data = JSON.parse(response.body);
      callback(data);
    });
  }

  disconnect() {
    this.stompClient.disconnect();
  }
}

export default WebSocketProvider;