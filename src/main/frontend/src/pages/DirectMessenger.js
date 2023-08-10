import React, {useState} from 'react';
import {styled} from "styled-components";
import {WebSocket} from "../App";
import {BsSend} from "react-icons/bs";
import {UserContext} from "../context/UserStore";
import {useContext} from 'react';
import {useParams} from "react-router-dom";
import MyMessenger from "../components/Dm/MyMessenger"
import OtherMessenger from "../components/Dm/OtherMessenger"
import ChatApi from "../api/ChatApi";
import {useEffect} from 'react';

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #caf0f8;

  * {
    box-sizing: border-box;
  }

  .input {
    width: 100%;
    height: 50px;
    //background-color: rgb(20, 20, 20, 30%);
    border-radius: 5px;
    position: relative;
    display: flex;
    //border: 1px solid black;
    @media (max-width: 768px) {
      height: 40px;
    }
  }

  .first {
    position: absolute;
    top: 15vh;
    left: 20px;
  }

  img {
    max-width: 45px;
    @media (max-width: 390px) {
      max-width: 40px;
    }
  }

  .profile {
    background-color: #61dafb;
    border-radius: 45px;
    width: 45px;
    height: 45px;
    margin-top: 2px;
    margin-left: 5px;
    overflow: hidden;
    border: .5px solid rgb(30, 30, 30, 30%);
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      margin: 0;
      border-radius: 40px;
    }
  }

  #comment {
    background-color: #eee;
    height: 40px;
    width: 380px;
    margin-left: auto;
    border: 0;
    border-radius: 30px;
    padding-left: 15px;
    padding-right: 45px;
    @media (max-width: 768px) {
      //height: 27px;
      width: 260px;
      align-self: center;
      padding-right: 35px;
    }
  }

  .caption {
    color: grey;
    font-size: .8rem;
    margin-top: 25px;
    margin-left: 5px;
  }

  .btn-send {
    position: absolute;
    display: flex;
    right: 3px;
    top: 2.5px;
    height: 36px;
    width: 36px;
    border-radius: 36px;
    border: .5px solid #61dafb;
    background-color: #caf0f8;
    @media (max-width: 768px) {
      border-radius: 24px;
      right: 2px;
    }
  }

  .send {
    font-size: 20px;
    //margin-top: 5px;
    color: #00b4d8;
    align-self: center;
    justify-self: center;
    @media (max-width: 768px) {
      //font-size: 12px;
    }
  }

  .box-chat {
    margin: auto;
    width: 60%;
    height: 100%;
    background-color: white;
    padding: 8vh 20px 20px 20px;
    @media (max-width: 768px) {
      width: 100%;
      padding: 20px;
    }
  }

  .chat-list {
    height: 96%;
    overflow-y: scroll;
  }

  .chat-list::-webkit-scrollbar {
    display: none;
  }

`

const DirectMessenger = () => {
  const webSocketService = useContext(WebSocket);
  const {email} = useContext(UserContext);

  const {receiver,sender} = useParams();

  const [room, setRoom] = useState("");
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);
  const [change, setChange] = useState(false);

  let req = {
    roomId: room,
    receiver: receiver,
    sender: sender,
    message: text
  };

  // stompClient.connect(header, function (frame) {
  //   console.log("connected: " + frame);
  //   console.log("연결 테스트")
  // });



  function Send() {
    webSocketService.send("/message", req);
    console.log(req);
    setText('');
  }

  function Subscribe() {
    console.log("구독!");
    console.log(req.roomId);
    webSocketService.subscribe("/message/" + req.roomId, (data) => {
      console.log(data.message);
      console.log(chat.concat(data.message))
      setChange(!change);
    });
  }

  const onChangeComment = (e) => {
    setText(e.target.value);
  }


  useEffect(() => {
    console.log("email = " + email);
    const getRoom = async () => {
      const res = await ChatApi.createRoom(receiver);
      if (res.status === 200) {
        console.log(res.data);
        setRoom(res.data);
        const chat = await ChatApi.findChatLog(res.data);
        console.log(chat.data);
        setChat(chat.data);
      } else {
        console.log(res)
      }
    }
    getRoom();
    if (webSocketService) {
      Subscribe();
    }
  }, [webSocketService, room, change]);

  return (
    <Container>
      <div className="box-chat">
        <div className="input">
          <div className="profile">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/spotflow-5475a.appspot.com/o/default_avatar.png?alt=media&token=7ea670df-ff84-4a85-bdb2-41b9a7f6a77a"/>
          </div>
          <input type="text" id="comment" onChange={onChangeComment} value={text}/>
          <button className="btn-send" onClick={Send}>
            <BsSend className="send"/>
          </button>
        </div>
        <div className="chat-list">
          {chat && chat.map(e => (
            <>
              {e.sender === email ? (
                <MyMessenger chat={e}/>
              ) : (
                <OtherMessenger chat={e}/>
              )}
            </>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default DirectMessenger;