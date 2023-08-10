import React from "react";
import { useContext } from "react";
import { styled } from "styled-components";
import { UserContext } from "../context/UserStore";
import {AiOutlineCloudUpload, AiOutlineUser} from "react-icons/ai"
import {IoArrowBackCircleOutline} from 'react-icons/io5'
import Modal from '../utils/LoginSignUpModal'
import { useState } from "react";
import MyFlowApi from "../api/MyFlowApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiaryApi from "../api/DiaryApi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 100px;
`;

const UserContainer = styled.div`
  margin-top: 120px;
  font-family: var(--efont);
  width: 70%;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .Profile{
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .Controler{
    display: flex;
    align-items: center;
    gap: 20px;
  }
  img{
    width: 80px;
    height: 80px;
    border-radius: 80px;
  }
`;

const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  gap: 20px;
  input{
    width: 100%;
    padding: 10px 10px;
    font-size: 20px;
    border-radius: 20px;
    border: 1px solid var(--grey);
    font-family: var(--kfont);
  }
  textarea{
    width: 100%;
    height: 80%;
    padding: 10px 10px;
    font-size: 20px;
    border-radius: 20px;
    border: 1px solid var(--grey);
    resize: none;
    font-family: var(--kfont);
  }
  .ImageConatiner{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 30px;
  }
  .ImageDiv{
    display: flex;
    justify-content: left;
    border: 1px solid var(--grey);
    padding: 10px;
    align-items: center;
    gap: 30px;
    border-radius: 20px;
    font-family: var(--kfont);
    input{
      margin: 0px;
      padding: 0px;
      width: 20px;
    }
    img{
      width: 100px;
      height: 100px;
    }
  }
`;

const UploadButton = styled(AiOutlineCloudUpload)`
  width: 25px;
  height: 25px;
  &:hover{
    cursor: pointer;
    color: var(--blue);
  }
`;

const GoToMyProfile = styled(AiOutlineUser)`
  width: 25px;
  height: 25px;
  &:hover{
    cursor: pointer;
    color: var(--blue);
  }
`;

const GoToDiary = styled(IoArrowBackCircleOutline)`
  width: 25px;
  height: 25px;
  &:hover{
    cursor: pointer;
    color: var(--blue);
  }
`;

const DiaryCreate = () => {
  const {nickname,profilePic, email} = useContext(UserContext);
  const [datas, setDatas] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [timeLine, setTimeLine] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("")
  const [type, setType] = useState("")
  const navigate = useNavigate();
  
  useEffect(()=>{
    const fetchData = async() =>{
      const response = await MyFlowApi.getmyFlow(localStorage.getItem('authToken'));
        if(response.data.length === 0){
          setModalOpen(true);
          setModalText("Flow 의 개시글이 없습니다")
          setType("timeline")
        }else{
          setDatas(response.data);
        }
      }
      fetchData();
    },[]
  )

  const getTimeLineId = (e) => {
    setTimeLine((prevTimeLine) => {
      const dataIndex = prevTimeLine.indexOf(e);
  
      if (dataIndex === -1) {
        return [...prevTimeLine, e];
      } else {
        return prevTimeLine.filter((id) => id !== e);
      }
    });
  };
  
  const checkDiaryOrTimeLine = () => {
    if(type === "timeline"){
      navigate("/diary");
    }
    if(type === "diary"){
      setModalOpen(false)
    }
  }
  
  const uploadToDiary = async() =>{
    const data ={
      title : title,
      content : content,
      timeLineList : timeLine
    };
    if(title.length < 1 || content.length < 1 || timeLine.length === 0){
      setModalOpen(true);
      setType("diary");
      setModalText("선택해주세요!");
    }else{
      const response = await DiaryApi.saveDiary(data);
      if(response.data.length !== 0){
        navigate("/diary") 
      }
    }
  };

const goToMyProfile = () => {
    navigate(`/profile/${email}`);
  }

  return(
    <Container>
      <UserContainer>
        <div className="Profile">
          <img src={profilePic} alt="error" />
          <p>{nickname}</p>
        </div>
        <div className="Controler">
          <GoToDiary onClick={()=>navigate("/diary")}/>
          <UploadButton onClick={uploadToDiary}/>
          <GoToMyProfile onClick={goToMyProfile}/>
        </div>
      </UserContainer>
      <UpdateContainer>
        <input type="text" placeholder="제목을 입력하세요." onChange={(e)=>setTitle(e.target.value)}/>
        <textarea name="" id="" cols="30" rows="10" placeholder="내용을 입력하세요." onChange={(e)=>setContent(e.target.value)}></textarea>
        <div className="ImageConatiner">
          {datas && datas.map(data=>(
            <div className="ImageDiv" key={data.id}> 
              <input type="checkBox" onChange={()=>{getTimeLineId(data);}}/>
              <img  src={data.img} alt="error" />
              <p>{data.date}</p>
            </div>
          ))}
        </div>
      </UpdateContainer>
      <Modal type={type} open={modalOpen} children={modalText} confirm={checkDiaryOrTimeLine}/>
    </Container>
  );
};

export default DiaryCreate;