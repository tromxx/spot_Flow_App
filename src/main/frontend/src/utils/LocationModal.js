import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
	
    .modal {
        display: none; // 평소에는 숨겨진 상태로 시작
        position: fixed; // 스크롤을 했을 경우에도 동일한 위치에 있도록
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1999;
        background-color: rgba(0, 0, 0, 0.6);
        
    }
    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        animation: modal-bg-show 0.8s; // 팝업이 열릴 때 스르륵 열리는 효과
    }

  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
    width: 60px;
    height: 40px;
    margin: 5px;
  }
  .modal > section {
    position: relative;
    width: 40%;
    height: 65%;
    text-align: center;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: ${props=>props.theme.modalColor};
    color: ${props=>props.theme.textColor};
    font-family: var(--kfont);
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: visible;

    @media(max-width: 768px) {
      width: 80%;
      height: 60%;
    }
  }
  .modal > section > header {
    position: relative;
    text-align: left;
    padding: 16px 64px 16px 16px;
   
    font-weight: 700;
    color: ${props=>props.theme.textColor};
  }
  .modal > section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: ${props=>props.theme.textColor};
    background-color: transparent;
  }
  .modal > section > main {
    padding: 0 16px;
		height: 82%;
    min-height: max-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    
    @media(max-width:768px) {
      
    }
    
  }
  .modal > section > footer {
    padding: 0px 16px 0px 16px;
    
    text-align: right;
  }
  .modal > section > footer button {
    position: absolute;
    color: ${props=>props.theme.textColor};
    background-color: transparent;
    font-size: 13px;
    font-family: var(--kfont);

    &:first-child {
      position: absolute;
      bottom: 0px;
      right: 70px;

    }
    &:nth-child(2) {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
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
  .wrapper {
      display: flex;
      flex-direction: row;
      position: relative;
      align-items: end;
      justify-content: left;
      padding-top: 10px;
      .filebox {
        align-self: flex-end;
        justify-content: flex-start;
      }
      .locationDiv {
        margin-bottom: 25px;
      }
      .location {
        background-color: transparent;
        outline: none;
        color: ${props=>props.theme.textColor};
        border: none;
      
      }
      .locationPin {
        right: 180px;
        position: absolute;
      }

      .locationButton {
        bottom: 0px;
        right: 0px;
        position: absolute;
        z-index: 1000;
      }
      .placeDiv {
        right: 0px;
        bottom: 1000px;
        position: absolute;
        align-self: flex-end;
        justify-content: flex-start;
        z-index: 999999;
      }
      
    }
`;



const LocationModal = (props) => {
    const { open, confirm, close, type, header, children } = props;

    return(
       <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
            {open && 
            <section>
                <header>
                    {header}
                    <button onClick={close}>
                        &times;
                    </button>
										
                </header>
                <main>
										{children}
								</main>
                <footer>
                    {type && <button onClick={confirm} className="confirm">확인</button>}
                    <button onClick={close} className="close">닫기</button>
                </footer>
            </section>
            }

        </div>
       </ModalStyle>
    );

}

export default LocationModal;