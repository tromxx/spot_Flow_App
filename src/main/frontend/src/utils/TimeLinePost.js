
import React from 'react'
import { useRef,useState } from 'react';
import styled , {css} from 'styled-components'
import {AiOutlineCamera} from "react-icons/ai";
import dummy2 from "../dataSet/TimeLineData";


const centerAlign = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CreateBtn = styled.div`

  /* display: flex;
  justify-content:center;
  align-items:center; */
  ${centerAlign}
  border: 1px solid white;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  color: black;
  background-color: ${(props) => props.theme.timeLineBgColor};
  background-color: white;
  margin: 5px;

  &:hover {
    background-color: white;
    border: 1px solid silver;
  }

  ${(props) => props.isClicked &&
          `background-color: black; `
  }
`

const CreatePost = styled.div`
  position : fixed;
  top : 15%;
  background-color: white;
  ${centerAlign}
  flex-direction: column;
  width: 35%;
  height: 500px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 15px;
  z-index: 100;

  @media (max-width: 1000px) {
    & {
      width: 300px;
      height: 450px;
    }

    textarea {
      width: 82%;
    }
  }

  .create-btns {
    ${centerAlign}
    flex-direction: column;
    flex: 2;
    width: 100%;
  }

  button {
    margin: 10px;
    width: 48%;
    background-color: white;
    border: none;
    border-radius: 15px;
    height: 45px;
  }

  textarea {
    width: 85%;
    margin-left: 20px;
    margin-right: 20px;
    padding: 10px;
    flex: 6;
    border: none;
    background-color: white;
    border-radius: 15px;
  }

  input {

    padding: 10px;
    margin: 20px;
    flex: 0.3;
    border: none;
    border-radius: 15px;
    background-color: white;
    width: 83%;
    z-index: 50;

  }

  .button-box {

    position: relative;
    width: 100%;
    flex: 3;
    background-color: none;
  }

  .button-box-btn {
    border-radius: 25px;
  }

`;

function TimeLinePost({}) {

  const [isCreate, setIsCreate] = useState(false);
    const [dummy, setDummy] = useState(dummy2);  
    // 파일선택하는 핸들링
  const fileInput = useRef();
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");  
  const [isCancel,setIsCancle] = useState(false);


  const handleOpenImageRef = () => {
    fileInput.current.click();
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const titleRef = useRef();
    const contentRef = useRef();


    const CreatePostConfirm = () => {
        if (titleRef.current.value.length < 2) {
            titleRef.current.focus();
            return;  
        }
        
        if (contentRef.current.value.length < 5) {
            contentRef.current.focus();
            return;  
        }
        // 내용초기화 하고 모달창 닫기
        setDummy([...dummy, {title: title, content: content, image: selectedImage}]);
                      setContent("");
                      setTitle("")
                      setIsCreate(!isCreate);
        }

        const CreatePostCancle = () => {
  
            if (titleRef.current.value.length >= 1 || contentRef.current.value.length >=1) {
                setIsCancle(!isCancel);
            }  else setIsCreate(!isCreate);
        }

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file); // 파일 내용을 읽어옵니다.
    } else {
      setSelectedImage(null);  // 파일을 선택하지 않았을 경우 처리
    }
  }
 

  


  return (
    <CreatePost >
            <input ref={titleRef} style={{
              textAlign: "center",
              borderBottom: "1px solid silver",
              borderRadius: "0px",
              backgroundColor: "none"
            }} placeholder="Typing the Title" onChange={e => {
              setTitle(e.target.value)
            }} type="text"/>
            <textarea ref={contentRef} onChange={e => {
              setContent(e.target.value)
            }} name="" id="" cols="50" rows="30"></textarea>
            <div className="create-btns">
              {/* <CreateBtn className="create-btn">확인</CreateBtn>
                        <CreateBtn className="create-btn">취소</CreateBtn> */}
              <div style={{display: "flex", flexDirection: "row", width: "80%"}}>
                <div className="button-box" style={{width: "20%"}} onClick={handleOpenImageRef}>
                  <CreateBtn className="button-box-btn">
                    <AiOutlineCamera/>
                  </CreateBtn>
                  <input type="file" accept="image/jpeg, image/png" style={{display: "none"}} ref={fileInput}
                         onChange={handleUploadImage}/>
                </div>
                <div style={{width: "80%"}}>
                  <ul style={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
                    <img src={selectedImage} alt="" style={{width: "50%", height: "50%;"}}/>
                  </ul>
                </div>
              </div>
             <div style={{width:"100%" ,flexDirection:"row"}}> 
                  <button style={{width:"50%"}} onClick={() => {
                    CreatePostConfirm();
                    
                  }}>확인
                  </button>
                  <button style={{width:"30%"}} onClick={() => CreatePostCancle()}>취소</button>
              </div>
            </div>

          </CreatePost>
  )
}

export default TimeLinePost