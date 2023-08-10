import React from "react";
import { styled } from "styled-components";
import {AiFillHeart} from 'react-icons/ai';
import {BsEyeFill} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

const DiaryMyPageContainerDiv = styled.div`
    position: absolute;
    display: flex;
    gap: 3px;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    background-color: rgba(0, 0, 0, .6);
    opacity: 0;
    transition: .5s;
    z-index: 10;
    &:hover  {
        color: white;
        opacity: 5;
        transform: translateX(0px);
    }
`;



const Eye = styled(BsEyeFill)`
    width: 20px;
    height: 20px;
    color: white;
    margin-left: 20px;
`;

const Heart = styled(AiFillHeart)`
    width: 20px;
    height: 20px;
    color: red;
`;

const DiaryImg = styled.img`
    width: 300px;
    height: 300px;
    margin: 0px;
    padding: 0px;
    z-index: 5;
    float: left;
`;

const DiaryMyPageContainer = (props) =>{

    const navigate = useNavigate();

    const getDiaryId =  () => {
        const id = props.val.id;
        navigate(`/diary/detail/${id}`);
    }

    return(
        <>
        <DiaryImg onClick={getDiaryId} src={props.val.img} alt="error" />
        <DiaryMyPageContainerDiv onClick={getDiaryId}>
            <Heart/>
            <p>{props.val.like}</p>
            <Eye/>
            <p>{props.val.view}</p>
        </DiaryMyPageContainerDiv>
        </>
    );
};

export default DiaryMyPageContainer;