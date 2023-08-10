import React, { useEffect } from "react";
import { styled } from 'styled-components'
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { useLayoutEffect } from "react";
const NotificationDiv = styled.div`
  width: 95%;
  height: 150px;
  margin-top: 0px;
  text-align: left;
  border-bottom: ${props=>props.theme.borderColor};
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start; /* 수정: 상단 정렬로 변경 */
  font-family: var(--kfont);

  .container {
  font-weight: bolder;
  
}

  @media(max-width: 768px) {
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
  }

`;

const SpanText = styled.p`
  font-weight: bolder;
  width:70px;
  padding:0 5px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`

const HeartImg = styled(AiFillHeart)`
  width: 25px;
  height: 25px;
`;

const CommentImg = styled(AiOutlineComment)`
  width: 25px;
  height: 25px;
  
`;


const NotificationContainer = ({ diary, sender, comment }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const splitString = (str, maxLength) => {
    if (str!== "" && str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength - 3) + "...";
    }
  }

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(()=>{
    console.log(diary)
  },[])
  

  return (
    <NotificationDiv>
        {comment !== null ? (
        <p>
          <CommentImg /> <br />
          <span className="container">
            {windowWidth > 840 ? splitString(sender, 15) : splitString(sender, 10)}
          </span>
          님이{" "}
          <span className="container">
            {windowWidth > 840 ? splitString(diary, 15) : splitString(diary, 10)}
          </span>{" "}
          에 댓글을 남겼습니다. <br />
          <span className="container">
            {windowWidth > 840 ? splitString(comment, 35) : splitString(comment, 20)}
          </span>
        </p>
      ) : (
        <p>
          <HeartImg /> <br /> <span className="container">{diary}</span> 에 좋아요를 받았습니다.
        </p>
      )}
    </NotificationDiv>
  );
};

export default NotificationContainer;