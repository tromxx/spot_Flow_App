import styled, {css} from "styled-components";

const ItemGrid = styled.div`
 // min-height: 80vh;
  display: grid;
  height: 80%;
  width: 100%;
  grid-template-rows: 1fr 1fr;

  width: ${(props) => props.issort === "true" ? "100%" : "45%"};
  height: ${(props) => props.issort === "true" ? "50%" : "50%"};


  @media (min-width: 1300px) {
    ${(props) => props.issort ==="true" ? `

      ` : `  
      position: relative;
        left: 28%;

      `}
        }


 

  @media (max-width: 850px) {
    width: ${(props) => props.issort === "true" ? "100%" : "100%"};
    ${(props) => props.issort ==="true" ? `

    grid-template-columns: 1fr 1fr;
` : `  
`}
  }
  ${(props) => props.issort ==="true" ? `

        grid-template-columns: 1fr 1fr 1fr 1fr;
}   
    ` : `

        grid-template-columns: 1fr ;
        grid-template-rows: 1fr 1fr  ;
    `}

`;


const centerAlign = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;




const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor === "#171010" ? "black" : "white"};
  position:relative;
  .Name {
    margin-top:0px;
    font-family: var(--efont);
    color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "black"};

    font-size: 35px;
    font-weight: bolder;
    span {
      color: #00C2FA;
    }
  }

 

  textarea {
    appearance: none; /* 기본 브라우저 스타일 제거 */
    outline: none; /* 아웃라인 제거 */
    border: none; /* 테두리 제거 */
    resize: none; /* 크기 조절 제거 */
    /* 이외 원하는 스타일을 적용 */
  }

  @media (max-width: 850px) {
    & {

    }
  }

  * {
    font-family: var(--kfont);
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

   

    width: 100vw;
    min-height: 100vh;
    height:  auto;


    
 `   
const Header = styled.div`
  ${centerAlign}
  justify-content: start;
  flex-wrap: wrap;
  
 
  margin-top : 80px;

  
  background-color: ${(props) => props.theme.bgColor === '#171010' ? "#504C56" : "white"};
 /* // background-color: #A4EBF3; */
  height: 20%;
  width: 100%;
  padding-bottom:20px;
 // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .Search-bar {
    @media (max-width: 850px) {
      & {width: 105%;}
    }
    width: 60%;
    padding: 15px;
    padding-left: 30px;
    height: 0px;
    margin-left: 20px;
    border:none;
    
  /* //  border:1px solid ${(props) => props.theme.timeLineBgColor}; */
  background-color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "#F8F6F4"};

    border-radius:15px;

  }
  @media (min-width: 1300px) {
    & {
      height: 20%;
      width: 60.9%;
    }
  }
  @media (max-width: 850px) {
    & {
      margin:0px;
    }
  }
`
const HeaderList = styled.div`
  margin-top : 20px;
  display: flex;
  width: 100%;
`
const HeaderItemLeft = styled.div`
  margin: 10px;
  width: 50%;
`
const HeaderItemRight = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  width: 50%;
`
const CreateBtn = styled.div`

  /* display: flex;
  justify-content:center;
  align-items:center; */
  ${centerAlign}

  border-radius: 5px;
  width: 35px;
  height: 35px;
  color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "black"};
  background-color: ${(props) => props.theme.bgColor === '#171010' ? "#817D88" : "white"};
  
  margin: 5px;

  &:hover {
    background-color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "#2C2636"};
    color: ${(props) => props.theme.bgColor === '#171010' ? "black" : "white"};

  }

  ${(props) => props.isClicked &&
          `background-color: black; `
  }
`
const Main = styled.div`
    width: 100%;
    height: auto;
    background-color: ${(props) => props.theme.bgColor === '#171010' ? "#504C56" : "white"};
    border-top: 0.1px solid silver;
    // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media (min-width: 1300px) {
    & {
      height: 70%;
      width: 60.9%;

    }
  }
         
  `
; 
const Item = styled.div`
transition: all 0.5s ease;

.item-header {
  ${centerAlign}
  justify-content: flex-start;
  height: 15%;
  width: 100%;
 // border : solid 0.1px #EAEAEA;
  border-radius: 1px;
  background-color: white;
}

.item-header-user {
  position:relative;
  top:  8px;
  font-size:12px;
  @media (min-width: 1300px) {
    & {
      top: 0px;
    }
  }
}

position: relative;
//background-color: #FCF9F9;
align-items: center;
border-radius: 5px;
margin-left: 20px;
margin-right: 20px;
margin-bottom: 20px;

&:first-child {
  margin-top: 20px;
}

${(props) =>
  props.issort ==="true"
    ? `
  ${centerAlign}
  flex-direction: column;

  &:nth-child(even){
      margin-right: 20px;
  }

  &:first-child {
      margin-top: 40px;
      margin-bottom: 0px;
  }

  &:nth-child(odd) {
      margin-right: 0px;
  }

  &:nth-child(2) {
      margin-top: 40px;
      margin-bottom: 0px;
  }

  &:nth-child(3) {
      margin-top: 20px;
  }

  &:nth-child(4) {
      margin-top: 20px;
  }
  `
    : `
  &:first-child {
      margin-top: 40px;
      margin-bottom: 0px;
  }

  &:nth-child(2) {
      margin-top: 20px;
  }

  height: 400px;
  flex-direction: column;
  display: flex;
  `}

@media (min-width: 1300px) {
  ${(props) =>
    props.issort === "true"
      ? `
    height: 250px;

    &:nth-child(even) {
        margin-right: 0px;
    }

    &:nth-child(4n) {
        margin-right: 20px;
    }

    &:nth-child(3), &:nth-child(4) {
        margin-top: 40px;
    }  
    `
      : `  
      height: 350px;
      width: 350px;
      `}
}

@media (max-width: 845px) {
  ${(props) =>
    props.issort ==="true"
      ? `
    width: auto%;
    height: 230px;
    .item-header {
     
      height: 15%;
    }
 
    `
      : `
    width: auto%;
    height: 450px;
    .item-header {
       height: 60px;

       .item-header-user {
          font-size: 12px;
          top : 0px;
       }
       .item-header-time {
          position : relative;
          bottom : 15px;
       }
    }
 
    `}
}
;

    .editBtn {
        position: absolute;
        background-color:white;
        opacity: 80%;
        border: 1px solid silver;
        border-radius: 30px;
        top:0;
        left:0;
        &:hover {
            opacity: 100%;
            background-color:silver;
        }
    }

`
const ItemImg = styled.div`
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0px;
  background-position: center center;
  background-color: silver;
  
  

  ${(props) => props.issort === "true"  ? `
        
    
        height : 85%;
        width: 100%;
    ` : `

        @media (max-width: 844px) {
            & {
		           width: 100%;
                height: 90%;
                margin-left: 10px;
                margin-right: 10px;
	        }
        }
          margin-left: 0px;
           margin-bottom: 10px;
         //    margin-top: 10px;
            height : 100%;
            width: 100%;
            @media (min-width: 1300px) {
    background-color:white;
   // border : solid 0.1px #EAEAEA;
    border-radius: 1px;
  }
            
    `}
`
export {
  ItemGrid,
  Container,
  Header,
  HeaderList,
  HeaderItemLeft,
  HeaderItemRight,
  CreateBtn,
  Main,
  Item,
  ItemImg


};