import React from 'react'
import styled from 'styled-components'
import {useTheme} from "../context/themeProvider";




// 로딩 상태를 나타내는 애니메이션 css 참고사이트 :https://tobiasahlin.com/spinkit/


const Container = styled.div`
    position: fixed;
    bottom: 0%;
    left: 50%;
    
    .spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;

  background-color: ${(props) => props.theme.bgColor === '#171010' ? "black" : "#1BD6F5"};

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
`

function LoadingSpinner() {
  const theme = useTheme();
  return (
    <Container props={theme}>
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    </Container>
  )
}

export default LoadingSpinner