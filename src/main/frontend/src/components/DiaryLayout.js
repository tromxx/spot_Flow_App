import React from "react";
import { styled } from "styled-components";
import Slider from "../components/Slider";

const DiaryLayoutdiv = styled.div`
  /* border: solid 1px red; */
  width: 100%;
  height: 50%;
  
  .bar1{
    /* border: solid 1px violet; */
    width: 100%;
    height: 20%;
    border-top: solid 15px #00b4d8;
    border-bottom: solid 5px #caf0f8;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h6{
    display: flex;
    margin-right: 50px;
  }

  .flex-Container{
    border: solid 1px green;
    justify-content: center;
    align-items: center;
    display: inline-flex;
    width: 100%;
    height: 70%;
  }
  .flex-item{
    border: solid 1px red;
    width: 15%;
    height: 60%;
    margin: 15px;
  }
  /* .itembox{
    justify-content: center;
    align-items: center;
  } */
`; 


const DiaryLayout = (props) => {
    return(
        <DiaryLayoutdiv>
          <Slider/>
           
        </DiaryLayoutdiv>
    );
};
export default DiaryLayout;