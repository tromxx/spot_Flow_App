import {createGlobalStyle} from 'styled-components'; // 글로벌 스타일 적용을 도와주는 styled-components내장 메서드
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
	body{
        background: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor}
    }
`