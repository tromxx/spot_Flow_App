import React from "react";
import { styled, useTheme } from "styled-components";
import DiaryContainer from "../components/Diary/DiaryContainer";
import {IoArrowBackCircleOutline, IoAdd} from 'react-icons/io5'
import {AiOutlineUser} from 'react-icons/ai'
import { useState } from "react";
import { useEffect } from "react";
import DiaryApi from "../api/DiaryApi";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";

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
    }
  }
`;


const GoBackButton = styled(IoArrowBackCircleOutline)`
 	width: 25px;
  	height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    }
`;

const GoProfileButton = styled(AiOutlineUser)`
 	width: 25px;
  	height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    }
`;

const GoToAdd = styled(IoAdd)`
 	width: 25px;
  	height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    };
`;


const DiaryContainerDiv = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   margin-top: 80px;
	padding: 30px;

	@media (max-width : 844px){
		margin-top: 10px;
   }
`;

const Diary = () =>{
    const [datas, setData] = useState();
    const {nickname,profilePic, email} = useContext(UserContext);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(()=>{
        const fetchData = async() =>{
            const response = await DiaryApi.findAllDiary();
            setData(response.data);
            console.log(response.data);
        };
        fetchData();
    },[])

    const goToMyProfile = () =>{
        navigate(`/profile/${email}`)
    }

    return(
        <Container>
            <div className="UserContainer">
                <div className="Profile">
                    <img src={profilePic} alt="error" />
                    <p>{nickname}</p>
                </div>
                <div className="Controler">
                    <GoBackButton onClick={()=>navigate("/")}/>
                    <GoProfileButton onClick={goToMyProfile}/>
                    <GoToAdd onClick={()=>navigate("/diaryCreate")}/>
                </div>
            </div>
            <DiaryContainerDiv>
                {datas && datas.map(data=>(
                    <DiaryContainer 
                        key={data.id}
                        val={{
                            id : data.id,
                            email : data.email,
                            img : data.img,
                            nickname : data.nickname,
                            profilepic : data.profilePic,
                            title : data.title,
                            like : data.like,
                            view : data.view,
                            date : data.date 
                        }}
                    />
                ))
                }
            </DiaryContainerDiv>
        </Container>
    );
};

export default Diary;