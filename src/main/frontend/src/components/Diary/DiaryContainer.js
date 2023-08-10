import React, { useContext } from "react";
import { styled, useTheme } from "styled-components";
import {AiFillHeart} from 'react-icons/ai'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserStore";
import DiaryApi from "../../api/DiaryApi";
import {BsEyeFill} from 'react-icons/bs'


const DiaryContainerDiv = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--grey);
    @media (max-width : 844px){
        width: 300px;
    }
    .InfoDiv{
        display: flex;
        align-items: center;
        padding-right: 410px;
        gap: 10px;
        font-family: var(--efont);
        p:hover{
            cursor: pointer;
        }
        @media (max-width : 844px){
            width: 270px;
            padding-right: 0px;
        }
    }
    .HeartCounterDiv{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    .InfoDivContainer{
        display: flex;
        gap: 400px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-family: var(--kfont);
        @media (max-width : 844px){
            width: 270px;
            gap: 150px;
        }
    }
    .text{
        width:80px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }

`;

const ProfileImg = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 45px;
`;

const SliderDiv = styled.div`
    width: 600px;
    height: 600px;
    @media (max-width : 844px){
        width: 270px;
        height: 270px;
    }
    .ImgSliderContainer{
        width: 600px;
        height: 600px;
        @media (max-width : 844px){
            width: 270px;
            height: 270px;
        }
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    .slick-prev:before, .slick-next:before{ //얘는 양옆 버튼. 커스텀 해줘야 보임
        font-family: 'slick';
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        line-height: 1;
        opacity: .75;
        color: ${props=>props.theme.textColor};
        -webkit-font-smoothing: antialiased;
        @media (max-width : 844px){
            font-size: 25px;
        }
    }
    .slick-prev:before{
        padding-right: 20px;
    }
    .slick-next:before{
        padding-left: 20px;
    }
    .slick-prev {
        z-index: 9999;
    }
`;

const Eye = styled(BsEyeFill)`
    width: 20px;
    height: 20px;
`;

const Heart = styled(AiFillHeart)`
    width: 20px;
    height: 20px;
    color: red;

`;


const DiaryContainer = (props) => {
    const navigate = useNavigate();
    const{email} = useContext(UserContext);
    const theme = useTheme();

    const settings = {
        rows: 1,
        dots: false,
        infinite: true,
        speed: 500,
        slideToShow: 1,
        slideToScroll: 3,
    };

    const getDiaryId = async() =>{
        const id = props.val.id;
        console.log(id);
        navigate(`/diary/detail/${id}`);
        await DiaryApi.increaseView(id);
    }

    const getEmail = (e) =>{
        console.log(e);
        navigate(`/profile/${e}`);
    };



    const calculateTime = (date) => {
        let date1 = new Date(date); // This is in local time
        let date2 = new Date();
        let diffMilliseconds = Math.abs(date2 - date1);
        let diffSeconds = Math.floor(diffMilliseconds / 1000);
        let diffMinutes = Math.floor(diffSeconds / 60);
        let diffHours = Math.floor(diffMinutes / 60);
        let diffDays = Math.floor(diffHours / 24);
        let diffTime;

        if(diffDays > 0){
          diffTime = diffDays + "일 전";
        } else if(diffHours > 0) {
          diffTime = diffHours + "시간 전";
        } else if(diffMinutes > 0) {
          diffTime = diffMinutes + "분 전";
        } else {
          diffTime = diffSeconds + "초 전";
        }

        return diffTime;  // diffTime 반환
    }

    return(
        <DiaryContainerDiv>
            <div className="InfoDiv">
                <ProfileImg src={props.val.profilepic} alt="" />
                <p onClick={()=>getEmail(props.val.email)}>{props.val.nickname}</p>
                <p>{calculateTime(props.val.date)}</p>
            </div>
            <SliderDiv>
            <Slider {...settings}>
                {props.val.img && props.val.img.map(data=>(
                    <div onClick={getDiaryId} key={props.val.img} className='ImgSliderContainer'>
                        <img src={data} alt="" />
                    </div>
                ))}
            </Slider>
            </SliderDiv>   
            <div className="InfoDivContainer"> 
                <div>
                    <p className="text">{props.val.title}</p>
                </div>
                <div className="HeartCounterDiv">
                    <Eye/>
                    <p>{props.val.view}</p>
                    <Heart/>
                    <p>{props.val.like}</p>
                </div>
            </div>      
        </DiaryContainerDiv>
    );
};

export default DiaryContainer;