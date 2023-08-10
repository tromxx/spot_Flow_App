import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled , {css }from 'styled-components';
import userTimelineApi from '../api/UserTimelineApi';
import timelinedata from '../dataSet/TimeLineData';

const centerAlign = css`
    display:flex;
    justify-content:center;
    align-items:center;
`

const ListContainer = styled.div`
    ${centerAlign}
    text-align : center;
    position: fixed;
    background-color: white;
    width: 61vw;
    height: 92vh;
    border: 1px solid;
    border: ${(props) => props.theme.bgColor === '#171010' ? "1px solid white" : "white"};
    border-radius: 10px;
    background-color: ${(props) => props.theme.bgColor === '#171010' ? "silver" : "white"};
    @media (max-width: 850px) {
      & {
        width: 98vw;
      }
    }
`
const List = styled.div`
    ${centerAlign}
    border : 1px solid ;
    width: 90%;
    height: 90%;
    flex-direction: column;
    border: ${(props) => props.theme.bgColor === '#171010' ? "1px solid white" : "1px solid black"};


    .header {
        height: 10%;
        border:1px solid;
        border: ${(props) => props.theme.bgColor === '#171010' ? "1px solid white" : "1px solid blakc"};
        width: 100%;
        ${centerAlign}
        flex-direction: row;
        .left {
            width: 50%;
        }
        .right {
            width: 50%;
            display:flex;
            justify-content: end;
        }
        button {
            margin: 5px;
            
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            
            background: var(--button-bg-color);
            color: var(--button-color);
            
            margin: 0;
            padding: 0.5rem 1rem;
            
            font-family: 'Noto Sans KR', sans-serif;
            font-size: 1rem;
            font-weight: 400;
            text-align: center;
            text-decoration: none;
            
            border: none;
            border-radius: 4px;
            
            display: inline-block;
            width: auto;
            
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            
            cursor: pointer;
            
            transition: 0.5s;
        }
    }
    .list {
       
        margin:10px;
        height: 90%;
        border:1px solid;
        width: 100%;
        overflow: scroll ;
        border: ${(props) => props.theme.bgColor === '#171010' ? "1px solid white" : "1px solid black"};
        .item{
            ${centerAlign}
            justify-content: start;
            width: 100%;

            border: 1px solid;
            border: ${(props) => props.theme.bgColor === '#171010' ? "1px solid white" : "1px solid black"};
            height: 20%;

            img{
                margin:10px;
                width: 10%;
                height: 80%;

                @media (max-width: 850px) {
                        & {
                            width: 30%;
                        }
                        }
            }

            input[type="checkbox"] {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                border: 1px solid #999;
                appearance: none;
                cursor: pointer;
                transition: ease 0.2s;
            }

            input[type="checkbox"]:checked {
                background: lightblue;
                border: none;
            }

            .content {
               margin:20px;     
            }

        }


    
    }



`

const DiaryModal = ({setIsCreate}) => {

    const [data,setData] = useState([]);


    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (e, item) => {
        if (e.target.checked) {
            setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));
        }
    };
    
    
      const handleButtonClick = () => {
        setIsCreate(selectedItems);
      };
    
      useEffect(()=>{
        const fetchData = async () => {
          const  res =  await userTimelineApi.getUserTimelineList()
        setData(res.data);
        }
        fetchData();
      },[])
      
    

    return (
       <ListContainer>
            <List>
                <div className='header'>
                    
                        <div className='left'>
                            타임라인 추가
                        </div>

                        <div className='right'>
                            <button onClick={()=> setIsCreate(false)} >취소</button>
                            <button onClick={handleButtonClick}>완료</button>
                        </div>
                    
                </div>
                <div className='list'>
                        {
                        data.map((item)=>
                            <div className='item' key={item.id}>
                                <label>
                                    <input type="checkbox" onChange={e => handleCheckboxChange(e, item)}/>
                                </label>
                                <img src={item.tl_profile_pic} alt="" />

                                <div className='content'>
                                        <div>{item.id}</div>
                                        <div>{item.content}</div>
                                </div>
                            </div>
                        )
                        
                        }

                 </div>    

            </List>
       </ListContainer>  
    );
}






export default DiaryModal