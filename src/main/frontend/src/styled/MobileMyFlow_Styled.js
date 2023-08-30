import { styled } from 'styled-components';
import { BiArrowBack, BiCurrentLocation } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlinePlus , AiFillDelete, AiOutlineCamera} from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { SlPicture } from "react-icons/sl"
import { AiOutlineClose } from 'react-icons/ai';
import { BsPencilSquare } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";

export const MyFlowWrapper = styled.div`

 	display: flex;
  justify-content: center;
  align-items: center;
	text-align: center;
	background-color: ${props=>props.theme.bgColor};
	
`;

export const MyFlowDiv = styled.div`
	background-color: ${props=>props.theme.bgColor};
  color: ${props=>props.theme.textColor};
  border: ${props=>props.theme.borderColor};	
	width: 390px;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
	text-align: center;
	flex-direction: column;
	position: relative;

	 .controlDiv{
	  	position: absolute;
		top : 2px
	  }
		.flowArea {
        background-color:transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        outline: none;
        width: 95%;
        height:80%;
        resize: none;
        border: none;
				border-bottom: 1px solid #999999;
        border-top: 1px solid #999999;
        font-family: var(--kfont);
        color: ${props=>props.theme.textColor};

			@media(max-width: 768px) {
    		width: 95%;
    		height: 80%;
  		}
		}
`;


export const FileBox = styled.div`  
	float: left;

	.fileSelect {
		width: auto;
		height: 50px;
		border: 1px solid black;
	}
	.thumbnail {
		margin-left: 10px;
    width: 15%;
    height: 15%;
    object-fit: cover;
	}
	.filebox {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
	}
	.filebox .upload-name {
    display: inline-block;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 78%;
    color: #999999;
	}
	.filebox label {
    display: inline-block;
    color: #fff;
    cursor: pointer;
    height: 30px;
		width: 30px;
    margin-left: 10px;
		font-family: var(--kfont);
		font-size: 12px;
	}
	.filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
	}
`;

export const BiArrowBacks = styled(BiArrowBack)`
	position: absolute;
 	left: -165px;
	width: 35px;
	height: 35px;
	top: 10px;
	color: var(--grey);
	cursor: pointer;
	&:hover{
		color: var(--blue);
	}
`;

export const MyFlowMenuName = styled.div`
	display: flex;
	justify-content: space-between;
	font-family: var(--efont);
	width: 100%;
	font-size: 30px;
	font-weight: bolder;
	margin-top: -25%;
	.title {
		font-size: 35px;
		margin-left: -30%;
	}
`;



export const CreateBtn = styled.div`
    border-radius: 8px;
		border: 1px solid #d9d9d9;
    width: 35px;
    height: 35px;
    color: white;
    margin-right: 10%;
		align-self: flex-end;
    &:hover{
        background-color: white;
        border: 1px solid silver;
    }
    ${(props) => props.isClicked && 
        `background-color: black; `
    }
`

export const FlowDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start; 
	align-items: center;
	margin-top: 30px;
	width: 100%;
	height: 60vh;
	gap: 5px; 
	overflow-y: scroll; 
	
	
`;

export const ScrollBar = styled.div`
	width: 100%;
	height: 60vh;
	margin-top: -20px;
	::-webkit-scrollbar {
    width: 8px;  /* 스크롤바의 너비 */
		
	}

	::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: #d9d9d9; /* 스크롤바의 색상 */
    border-radius: 10px;
		transition: 0.2s ease;
	}

	::-webkit-scrollbar-thumb:hover {
    background-color: grey;
  }
	padding-right: 5px;
`;

export const MenuBar = styled.div`
	
	width: 82%;
	height: 30px;
	border-radius: 8px;
	/* background-color: ${props => props.theme.textColor === 'black' ? '#d6d6d6' : '#423F3E'}; */
	background-color: transparent;
	position: relative;
`;

// Sort

export const SortButton = styled.button`
	position: absolute;
	width: 30px;
	height: 30px;
	left: 290px;
	top: 0px;
	border: none;
	background-color: transparent;
	&:hover {
		cursor: pointer;
	}
`;

export const SortAz = styled(CgSortAz)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 30px;
	height: 30px;
	left: -1px;
	top: -1.5px;
`;

export const SortZa = styled(CgSortZa)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 30px;
	height: 30px;
	left: -1px;
	top: -1.5px;
`;



export const SearchBarInput = styled.input`
	position: absolute;
	top: 2px;
	left: 2px;
	width: 160px;
	height: 75%;
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	background-color: ${props => props.theme.borderColor === '1px solid #424242' ? '#d9d9d9' : 'white'};
	outline: none;
	
`;

export const DiaryImgSet = styled(BsPencilSquare)`
	width: 20px;
	height: 20px;
`;


export const SelectImg = styled(BiSelectMultiple)`
	width: 20px;
	height: 20px;	
`;

// Check

export const CheckButton = styled.button`
	color: ${props => props.theme.textColor};	
	position: absolute;
	width: 30px;
	left: 265px;
	top: 0px;
	height: 30px;
	border: none;
	background-color: transparent;
	align-self: flex-end;
	&:hover {
		cursor: pointer;
	}
`;

export const CheckImg = styled(BsCheckCircle)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 20px;
	height: 20px;
	left: 3px;
	top: 4px;	
`;



export const DeleteImg = styled(AiFillDelete)`
	width: 30px;
	height: 25px;
	margin-bottom: 2px;
	margin-left: 1px;
	transition: 0.6s ease;
`;

export const DeleteButton = styled.button`
	color: ${props => props.theme.textColor};	
	position: absolute;
	width: 30px;
	left: 230px;
	height: 30px;
	top: 0px;
	border: none;
	background-color: transparent;
	transition: 0.6s ease;
	&:hover {
		cursor: pointer;
	}
`;

export const MenuButtonWrapper = styled.div`

`;

export const CreateBtn2 = styled.div`

  display: flex;
  justify-content:center;
  align-items:center; 
  border: 1px solid white;
  border-radius: 8px;
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

export const SearchImg = styled(AiOutlineSearch)`
	position: absolute;
	width: 25px;
	height: 25px;
	top: 2px;
	left: 138px;
	border: none;
	color: ${props=>props.theme.divColor};
`;