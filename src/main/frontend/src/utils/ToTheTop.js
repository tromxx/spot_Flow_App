import { useEffect, useState } from "react";
import styled from "styled-components";
import {PiTriangleFill} from 'react-icons/pi';
import {TbArrowMoveUp} from 'react-icons/tb';
import {GoMoveToTop} from 'react-icons/go';

const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width: 35px;
  height: 30px;
  z-index: 30000;
  position: fixed;
  color: white;
  border-radius: 100%;
  background-color: black;
  bottom: 30px;
  right: 200px;
  opacity: 0.9;

  @media (max-width: 850px) {
    & {
       position: relative; 
       width: 30px;
       height: 30px; 
       right: 0px;
       bottom: 38px;
    }
  }
`


function ToTheTop() {
  // 토글 여부를 결정하는 state 선언
  const [toggleBtn, setToggleBtn] = useState(true);

  // window 객체에서 scrollY 값을 받아옴
  // 어느정도 스크롤이 된건지 판단 후, 토글 여부 결정
  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
  };

  // scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 버튼 클릭 시 스크롤을 맨 위로 올려주는 함수
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 토글 여부 state에 따라 버튼을 보여주거나 감추게 만듦
  return toggleBtn ? (
    <Container onClick={goToTop}>
        <GoMoveToTop/>
    </Container>
  ) : null;
}

export default ToTheTop;