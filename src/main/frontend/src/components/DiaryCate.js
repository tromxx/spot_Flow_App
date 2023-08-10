import React from "react";
import { styled } from "styled-components";
import dummy from "../dataSet/TimeLineData";

 const DiaryCatediv = styled.div`
    /* border: solid 1px red; */
    width: 100%;
    height: 75vh;
    flex-grow: 1;
    align-items: center;
    /* @media (max-width:900px) {
        grid-template-columns: 1fr 1fr ;
    } */
    
  .container::-webkit-scrollbar {
      display: none;
  }
    

  .container{
    /* border-radius: 20px; */
    border: 3px solid black;
    width: 100%;
    height: 73vh;
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    gap: 0px;
    grid-auto-rows: minmax(260px, auto);
    grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
    grid-gap: 5px;
    overflow-y: scroll;
    overflow-x: none;
    margin-right: 10px;
    /* background-color: black; */
    
  
    /* @media (min-width:1000px) {
        grid-template-columns: 1fr 1fr ;
    }
     */
    
    
  }
  .box{
    /* border: solid 1px violet; */
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
    height: 100%;
    /* margin: 30px; */
    border: solid 5px black;
    /* border-radius: 5px; */
    margin-left: 0px;
    overflow-x :auto;
    
    

    

  }
  .image{
    width: 100%;
    height: 100%;
    background-color: gray;
    /* border: solid 1px red; */
  }
  `;
const DiaryCate = ({friendData}) => {
    return(
            <DiaryCatediv>
              <div className="container">
                
                        {
                          friendData.map((e)=> 
                            <div class="box">
                              <img className="image" src={e.image}/>
                            </div>
                          )
                        }
                       
                  </div>
            </DiaryCatediv>
    );
};
export default DiaryCate;