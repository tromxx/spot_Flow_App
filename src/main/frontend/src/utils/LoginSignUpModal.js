import React from "react";
import styled from "styled-components";
import {AiOutlineClose} from 'react-icons/ai'


const ModalStyle = styled.div`
  .modal {
    display: none; // 평소에는 숨겨진 상태로 시작
    position: fixed; // 스크롤을 했을 경우에도 동일한 위치에 있도록
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .openModal {
    display: flex; 
    align-items: center;
    animation: modal-bg-show 0.8s; 
  }
  .modal > section {
    width: 90%;
    max-width: 400px;
    text-align: center;
    margin: 0 auto;
    border-radius: 0.3rem;
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  .modal > section > header {
    position: relative;
    padding: 20px 20px 20px;
    border-radius: 20px 20px 0 0 ;
    background-color: ${props=>props.theme.modalColor};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  font-weight: bold;
  .modal > section > header > p {
    color: ${props=>props.theme.textColor};
    font-size: 17px;
    margin: 0px;
  }
  .modal > section > main {
    padding: 60px;
    font-size: 15px;
    background-color: ${props=>props.theme.modalColor};
    color: ${props=>props.theme.textColor};
  }
  .modal > section > footer {
    background-color: ${props=>props.theme.modalColor};
    color: ${props=>props.theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 15px 15px;
    border-radius: 0 0 25px 25px;
    background-color: ${props=>props.theme.borderColor};
  }
  .modal > section > footer > button {
    border: none;
    outline: none;
    font-size: 15px;
    font-weight: bold;
    font-family: var(--kfont);
    color: ${props=>props.theme.textColor};
    background-color: transparent;
    cursor: pointer;
  }
  .modal > section > footer > button:hover {
    color: var(--blue);
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.3s;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CloseButton = styled(AiOutlineClose)`
  font-weight: bold;
  font-size: 20px;
  color: ${props=>props.theme.textColor};
  :hover{
    color: var(--lightblue);
    cursor: pointer;
  }
`;



const Modal = (props) => {
    const {open, confirm, close, type, children} = props;

    return(
       <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
            {open && 
            <section>
                <header>
                    <p>Spot<span style={{ color: '#00B4D8' }}>F</span>low</p>
                    <CloseButton onClick={close}/>
                </header>
                <main>{children}</main>
                <footer>
                    {type && <button onClick={confirm}>확인</button>}
                </footer>
            </section>
            }

        </div>
       </ModalStyle>
    );

}

export default Modal;