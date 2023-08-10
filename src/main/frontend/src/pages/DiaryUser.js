import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import {AiOutlineUserAdd} from 'react-icons/ai'
import {TbMessageCircleBolt} from 'react-icons/tb'
import {MdContentCopy} from 'react-icons/md'
import { useNavigate, useParams } from "react-router-dom";
import DiaryApi from "../api/DiaryApi";

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

const AddFriend = styled(AiOutlineUserAdd)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    };    
`;

const SendMessage = styled(TbMessageCircleBolt)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    };     
`

const DiaryUser = () => {
    const navigate = useNavigate();
    const [datas, setDatas] = useState();
    const {email} = useParams();
    
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await DiaryApi.findUserDiary(email);
            setDatas(response.data);
            console.log(response.data);
        }
        fetchData();
    },[])
    
    return(
        <Container>
            <div className="UserContainer">
                <div className="Profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGzjYfz73YMN1-GCk5xIrkSRrA4L0xjCA4Ng&usqp=CAU" alt="error" />
                    <div className="ProfileContainer">
                        <p>나의하기</p>
                        <p>아우 하기 싫어</p>
                        <div className="FollowContainer">
                            <p>follower : 10</p>
                            <p>followig : 20</p>
                        </div>
                    </div>
                </div>
                <div className="Controler">
                    <AddFriend/>
                    <GoToDiary onClick={()=>navigate("/diary")}/>
                    <SendMessage/>
                </div>
            </div>
  
        </Container>
    );
};

export default DiaryUser;