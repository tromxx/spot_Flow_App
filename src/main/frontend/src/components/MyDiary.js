import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import dummy from "../dataSet/TimeLineData";
import Checkbox from "./CheckBox";
import { useNavigate } from "react-router-dom";
import DiaryApi from "../api/DiaryApi";
import UserContext from "../context/UserStore";



const MyDiarydiv = styled.div`

    /* border: solid 1px red; */
    width: 70vw;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    top:20px;
    @media (max-width: 400px) {
      width: 90vw;
    }
    .container{
      border-radius: 20px;
      /* border: solid 3px black; */
      width: 75vw;
      height: 70vh;
      display: grid;
      gap: 0px;
      /* grid-auto-rows: minmax(100px, auto);
      grid-template-columns: repeat(auto-fit, minmax(300px, 2fr)); */
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto;
      
      @media (max-width:850px) {
          grid-template-columns: 1fr 1fr ;
      }
      
      @media (max-width:550px) {
          grid-template-columns: 1fr;
      }
      @media (max-width: 400px) {
        width: 90vw;
      }

      grid-gap: 0px;
      overflow-y: scroll;
    
    }

    .container::-webkit-scrollbar {
      display: none;
    }
    .box{
      /* border: solid 1px violet; */
      justify-content: center;
      align-items: center;
      display: flex;
      width: 100%;
      height: 300px;
      /* margin: 30px; */
      border: solid 1px black;
      /* border-radius: 5px; */
      position: relative;
      @media (max-width: 400px) {
        border: .2px solid rgb(0,0,0,30%);
      }
    }
    .img-box {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #e2e2e2;
      align-items: center;
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
    .image{
      position: relative;
      top: 0;
      left: 0;
      transform: translate(50, 50);
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: auto;
      
      /* border: solid 1px red; */
    }
    .plus{
      width: 30px;
      height: 30px;
    }
    .check{
      /* border: solid 2px red; */
      position: absolute;
      width: 30px;
      height: 30px;
      top:0%;
      left:90%;
      align-items: center;
      justify-content: center;
      display: flex;
    }

    .input[id="check1"] {
      display: none;
      }

      .input[id="check1"] + label {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 2px solid #bcbcbc;
        cursor: pointer;
    }
    input[id="check1"]:checked + label {
    background-color: #666666;
    }
    .checkboxes{
      position: relative;
      width: 20px;
      height: 20px;
    }
`;

      const MyDiary = ({email, trigger,stat, checkid, setCheckId }) => {
        const [items, setItems] = useState(new Set());
        const [data, setData] = useState([]);
        const user = useContext(UserContext);
        
        const itemHandler = (id, isChecked) => {
          if(isChecked) {
            setCheckId([...checkid , id]);
          } else if (!isChecked) {
            setCheckId(checkid.filter(e=> e !== id));
          }
        }

      
     

    
      const navigate = useNavigate();

      const diaryDelete = async (id) =>  {
        console.log(id);
        const res = await DiaryApi.deleteDiary(id);
        if(res.status=== 200) {
            // console.log(res.data);
            alert("다이어리가 삭제되었습니다.");
        }
      }

      useEffect(()=>{
        const fetchData = async()=>{
        const token = localStorage.getItem('authToken');
        const res =  await DiaryApi.findMyDiary(token);
        setData(res.data);
        }
        fetchData();
       
      },[checkid,trigger])

    return(
        <MyDiarydiv>
            <div className="container">
                
               {data.map((data, index) => data.delete || (
              <div class="box" key={data.id}>
                { stat && (
                  <Checkbox
                    key = {index}
                    id = {data.id}
                    itemHandler = {itemHandler}
                  />
                )}
                <button style={{position:"absolute", top:"0" , right: "0" }} onClick={()=>itemHandler(data.id)}>삭제하기</button>
                <div onClick={()=>{ navigate(`/diary/detail/${data.id}`)}} className="img-box">
                  <img className="image" src={data.timeLineList[0]?.image} alt="" />
                </div>
              </div>
            ))}
                

                     <div class="box"  style={{backgroundColor:"#d9d9d9"}}>
                  
                            <div className="image-box">
                          <AiOutlinePlus onClick={()=>navigate("/diaryCreate")} className="plus"/>
                        </div>
                    </div>
                  </div>
            
        </MyDiarydiv>
    );
};

export default MyDiary;