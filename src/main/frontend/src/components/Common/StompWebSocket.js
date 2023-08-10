// import { Client } from "@stomp/stompjs";
// import React, { useContext, useEffect, useState } from "react";
// import SockJS from "sockjs-client";
// import { UserContext } from "../../context/UserStore";


// const StompWebSocket = () => {
//   const [client, setClient] = useState(null);
//   const { email, setIsNewNofi } = useContext(UserContext);
  
//   useEffect(() => {
//     const sock = new SockJS("http://localhost:8111/ws", null, {
//       transports: ["websocket"],
//       headers: {
//         Origin: "http://localhost:3000"
//       }
//     });
//     const newClient = new Client({
//       webSocketFactory: () => sock,
//       debug: (str) => {
//         console.log(str);
//       }
//     });
//     setClient(newClient);
//   }, []);

//   useEffect(() => {
//     if (client) {
//       const onConnect = () => {
//         console.log("웹소켓 성공");

//         client.subscribe(`/pub/send-message/${email}`, (message) => {
//           setIsNewNofi(true);
//           console.log("새 알림이 도착했습니다", message);
//         });
//       };
//       const onError = (error) => {
//         console.error("웹소켓 연결에 실패했습니다." + error);
//       };

//       client.onConnect = onConnect;
//       client.onStompError = onError;

//       client.activate();
//     }
//     return () => {
//       if (client) {
//         client.deactivate();
//       }
//     };
//   }, [client, email]);

//   return (
//     <>
//     </>
//   );
// }

// export default StompWebSocket;

// import { Client } from "@stomp/stompjs";
// import React, { useContext, useEffect, useState } from "react";
// import SockJS from "sockjs-client";
// import { UserContext } from "../../context/UserStore";


// const WebSocketStomp = () => {
//   const [client, setClient] = useState(null);
//   const { email } = useContext(UserContext);
  
//   useEffect(() => {
//     const sock = new SockJS("http://localhost:8111/ws", null, {
//       transports: ["websocket"],
//       headers: {
//         Origin: "http://localhost:3000"
//       }
//     });
//     const newClient = new Client({
//       webSocketFactory: () => sock,
//       debug: (str) => {
//         console.log('🎃 : ' + str);
//       }
//     });
//     setClient(newClient);
//   }, []);

//   useEffect(() => {
//     if (client) {
//       const onConnect = () => {
//         console.log("웹소켓 연결!!!");

//         client.subscribe(`/region/${email}`, (message) => {
//           console.log("👽 메세지 : " + message.body);
          
//         });
//       };
//       const onError = (error) => {
//         console.error("웹소켓 연결 실패" + error);
//       };

//       client.onConnect = onConnect;
//       client.onStompError = onError;

//       client.activate();
//     }
//     return () => {
//       if (client) {
//         client.deactivate();
//       }
//     };
//   }, [client, email]);

//   return (
//     <>
//     </>
//   );
// }

// export default WebSocketStomp;