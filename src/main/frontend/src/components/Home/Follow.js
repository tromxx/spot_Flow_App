import { styled } from "styled-components";
import FollowCounter from "./FollowCounter";
import { AiOutlineClose } from 'react-icons/ai'
import {MdOutlineArrowBack} from 'react-icons/md'
import { useState } from "react";
import Follower from "./Follower";
import Following from "./Following";
import { useCallback } from "react";


const FollowDiv = styled.div`
  	margin-top: 7vh;
  	width: 390px;
  	height: 93vh;
  	display: flex;
  	flex-direction: column;
  	justify-content: baseline;
  	align-items: center;
  	border-right: 1px solid var(--grey);
  	background-color: ${props=>props.theme.bgColor};
  	color: ${props=>props.theme.textColor};
  	border: ${props=>props.theme.borderColor};
  	font-family: var(--efont);
  	transition: 0.6s ease;
  	.controlDiv{
    	margin-top: 15px;
    	display: flex;
    	gap: 250px;
  	}
  	@media (max-width : 844px){
    	height: 100vh;
    	margin-top: 0px;
  	}
`;

const CloseButton = styled(AiOutlineClose)`
	width: 35px;
  	height: 35px;
  	color: var(--grey);
  	&:hover{
    	cursor: pointer;
    	color: var(--lightblue);
  	}
`;

const GobackButton = styled(MdOutlineArrowBack)`
   width: 35px;
  	height: 35px;
  	color: var(--grey);
  	&:hover{
    	cursor: pointer;
    	color: var(--lightblue);
  	}
`;

const Follow = ({ setCurrentPage, onClose }) => {
	const [selectedCounter, setSelectedCounter] = useState('follower');

	const handleCounterChange = useCallback(counter => {
		 setSelectedCounter(counter);
	}, []);

	const renderContent = useCallback(() => {
		 if (selectedCounter === 'follower') {
			  return <Follower/>;
		 } else if (selectedCounter === 'following') {
			  return <Following/>;
		 }
	}, [selectedCounter]);

	return (
		 <FollowDiv>
			  <div className="controlDiv">
					<GobackButton onClick={setCurrentPage} />
					<CloseButton onClick={onClose} />
			  </div>
			  <FollowCounter selected={selectedCounter} onSelectCounter={handleCounterChange} />
			  {renderContent()}
		 </FollowDiv>
	);
};

export default Follow;