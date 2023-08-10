import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import DiaryApi from "../api/DiaryApi";
import DiaryMyPageContainer from "../components/DiaryMyPage/DiaryMyPageContainer";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import { IoAdd} from 'react-icons/io5'
import {BsGear} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
import {MdContentCopy} from 'react-icons/md'
import {BsTrash} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import Modal from '../utils/LoginSignUpModal'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
  height: auto;
  gap: 20px;
  margin-bottom: 100px;
  color: ${props=>props.theme.textColor};
  background-color: ${props=>props.theme.bgColor};
  .UserContainer{
    margin-top: 120px;
    font-family: var(--efont);
    width: 70%;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--grey);
    @media (max-width : 850px){
        margin-top: 20px;

    }
    p{
        margin: 0px;
    }
    .Profile{
        display: flex;
        align-items: center;
        gap: 20px;
        img{
            width: 80px;
            height: 80px;
            border-radius: 80px;
            @media (max-width : 844px){
                width: 50px;
                height: 50px;
            }
        }
    }
    .Controler{
        display: flex;
        align-items: center;
        gap: 20px;
        @media (max-width : 844px){
            gap: 10px;
        }
    }
    .ProfileContainer{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .FollowContainer{
        display: flex;
        gap: 15px;
        justify-content: left;
    }
  }
`;

const GoToDiary = styled(MdContentCopy)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    };
`;

const Delete = styled(BsTrash)`
    width: 25px;    
    height: 25px;
    display: ${props => (props.$isChecked === "true" ? 'block' : 'none')};
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    };
`;

const GoToAdd = styled(IoAdd)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    };
`;

const Setting = styled(BsGear)`
    width: 25px;
    height: 25px;
    transition: transform 0.7s ease;
    transform: ${props => (props.$isChecked === "true" ? 'rotate(120deg)' : 'rotate(5deg)')};
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    };
`;

const DiaryContainerDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    margin-top: 20px;
    .container{
        padding: 10px;
    }
`;

const EditButton = styled(AiOutlineEdit)`
    width: 25px;    
    height: 25px;
    display: ${props => (props.$isChecked === "true" ? 'block' : 'none')};
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    };
`;

const Input = styled.input`
    display: ${props => (props.$isChecked === "true" ? 'block' : 'none')};
`;

const DiaryMyPage = () =>{
    const [datas, setDatas] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [diaryIds, setDiaryIds] = useState([]);
    const {nickname,profilePic, following, follower} = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState("")
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchData = async() => {
            const response = await DiaryApi.findMyDiary()
            setDatas(response.data);
        };
        console.log("myPage useEffect activated");
        fetchData();
    },[isChecked]);

    const getTheData = (e) => {
        setDiaryIds((prevDiaryIds) => {
          const dataIndex = prevDiaryIds.indexOf(e);
      
          if (dataIndex === -1) {
            return [...prevDiaryIds, e];
          } else {
            return prevDiaryIds.filter((id) => id !== e);
          }
        });
    };

    const deleteDiary = async() =>{
        if(diaryIds.length === 0){
            setModalOpen(true);
            setModalText("삭제할 것들을 선택하세요");
        }else{
            const data = {
                diaryId : diaryIds
            };
            await DiaryApi.deleteDiary(data);
            setIsChecked(false);
        }
    }

    const editDiary = () =>{
        if (diaryIds.length === 0) {
            setModalOpen(true);
            setModalText("수정할 것을 선택하세요");
        } else if (diaryIds.length > 1) {
            setModalOpen(true);
            setModalText("수정할 것을 하나만 선택하세요");
        } else {
            const id = diaryIds;
            navigate(`/diaryedit/${id}`);
        }
    }

    return(
        <Container>
           <div className="UserContainer">
                <div className="Profile">
                    <img src={profilePic} alt="error" />
                    <div className="ProfileContainer">
                    <p>{nickname}</p>
                        <div className="FollowContainer">
                            <p>게시물 : {following}</p>
                            <p>팔로워 : {follower}</p>
                            <p>팔로잉 : {following}</p>
                        </div>
                    </div>
                </div>
                <div className="Controler">
                    <EditButton onClick={editDiary} $isChecked={isChecked.toString()}/>
                    <Delete onClick={deleteDiary} $isChecked={isChecked.toString()}/>
                    <Setting onClick={()=>setIsChecked(!isChecked)} $isChecked={isChecked.toString()}/>
                    <GoToDiary onClick={()=>navigate("/diary")}/>
                    <GoToAdd  onClick={()=>navigate("/diaryCreate")}/>
                </div>
            </div>
            <DiaryContainerDiv> 
            {datas && datas.length > 0 ? (
                datas.map((data) => (
                    <div className="container" key={data.id}>
                        <Input
                            type="checkbox"
                            onChange={() => getTheData(data.id)}
                            $isChecked={isChecked.toString()}
                        />
                        <DiaryMyPageContainer
                            val={{
                                id: data.id,
                                img: data.timeLineList[0].image,
                                like: data.like,
                                view: data.view,
                            }}
                        />
                    </div>
                ))
                ) : (
                    <div className="EmptyData">
                        게시글이 없습니다
                    </div>
                )}
            </DiaryContainerDiv>
            <Modal type={true} open={modalOpen} children={modalText} confirm={()=>setModalOpen(false)}/>
        </Container>
    );
};

export default DiaryMyPage;