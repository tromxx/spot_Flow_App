import React, {useEffect, useState} from 'react';
import {styled} from "styled-components";
import 'moment/locale/ko';
import moment from "moment/moment";

const Container = styled.div`
  max-width: 500px;
  min-height: 70px;
  box-sizing: border-box;
  margin-left: auto;

  .box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  };
  p {
    margin-left: auto;
    background-color: #caf0f8;
    padding: 10px;
    border-radius: 10px;
    @media(max-width: 768px) {
      max-width: 200px;
      font-size: .8rem;
    }
  }

  span {
    position: absolute;
    bottom: 1px;
    right: 5px;
    font-size: .4rem;
    color: rgb(30, 30, 30, 30%);
    @media(max-width: 768px) {
      bottom: 1px;
    }
  }
`;

const MyMessenger = (props) => {
  const [data, setData] = useState(null);
  useEffect(()=>{
    setData(props.chat)
  }, [props])
  return (
      <>
        {data && <Container>
          <div className="box">
            <p>{data.message}</p>
            <span>{moment(data.date).format('YYYY년 MM월 DD일 A h시 mm분')}</span>
          </div>
        </Container>}

      </>
  )
}

export default MyMessenger;