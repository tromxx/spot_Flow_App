import React from 'react'
import { forwardRef } from 'react';
import styled , {css , keyframes} from 'styled-components'
import profile from '../images/default_avatar.png'


const fadeIn = keyframes`
  0% {
    opacity: 0.5;
  }
  /* 25% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.7;
  } */
  100% {
    opacity: 1;
  }
`;

const centerAlign = css`
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const Info = styled.div`
    //background-color : #FAFAF6;
     justify-content: space-evenly;
        flex: 7;
        ${centerAlign}
        width: 94.5%;
        
        flex-direction:row;
`

const Title = styled.div`
    padding:10px;
  background-color:#FCF9F9;
  // border: 1px solid black;
    border-radius:5px;
    width: 91.5%;
    flex: 2;
    margin-bottom: 10px;
    background-color: ${props => props.theme.timeLineBgColor === "#E0E0E0" ? "white" : "E0E0E0"};

`

const Content = styled.div`
  background-color: #FCF9F9;
  padding:10px;
 // border: 1px solid black;
    border-radius:5px;
    width: 91.5%;
    flex: 30;
    margin-bottom: 20px;
    background-color: ${props => props.theme.timeLineBgColor === "#E0E0E0" ? "white" : "E0E0E0"};
`

const Container = styled.div`
    
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    ${centerAlign}
    animation: ${fadeIn} 0.15s linear;
    position: fixed;
    top:10%;
    left:25%;
    width: 50vw;
    height: 80vh;
  //  border: 1px solid silver ;
    border-radius: 5px;
    background-color: white ;
    background-color: ${(props) => props.theme.timeLineBgColor};

    @media(max-width: 1000px) {
        & {
        width: 300px;
        height: 50%;
        top:25%;
        left:10%;
        }
    }

    display: ${props => props.isopen === "true" ? "block" : "none"}
    
    
  
    ;
    .profile {
        ${centerAlign}
        flex-direction: column;
        height : 100%;
        width: 100%;
       // border : 1px solid;
    }
`;



const TimeLineModal =  forwardRef(({isopen, closeModal, setIsModalOpen, modalData,diffHours },node)=> {
   
   
  
    

  return (

    
    <Container ref={node} isopen={isopen} closeModal={closeModal}>
    
        <div  className='profile'>
            
                <Info>
                    <img alt="" src={modalData.profile || profile} style={{width:"50px" , height: "50px" ,borderRadius:"25px"}} />
                    <div  style={{width: "100%"  , marginLeft:"10px"}}>
                        <div style={{width: "95%" , marginLeft:"10px"}}>{modalData.name} {diffHours}</div>
                        <div style={{width: "95%" , marginLeft:"10px"}}>{modalData.date}</div>
                    </div>
                </Info>

                {/* <Title>
                    {modalData.title}
                </Title> */}

                <Content>
                    {modalData.content}
                </Content>
        </div>

    </Container>
    
  )
});

export default TimeLineModal