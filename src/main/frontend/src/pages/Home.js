import {styled} from 'styled-components';
import MapView from "./MapView";
import { useState} from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import SlideDiv from '../components/Home/SlideDiv'
import MyPage from '../components/Home/MyPage'
import Follow from '../components/Home/Follow';

const MenuButton = styled(AiOutlineMenu)`
  z-index: 2;
  position: absolute;
  top: 8.5%;
  left: 5%;
  width: 40px;
  height: 40px;
  @media (max-width : 844px) {
    width: 30px;
    height: 30px;
    top: 8%;
    left: 10%;
  }
`;


const Home = () => {
  const [active, setActivate] = useState(false);
  const [currentPage, setCurrentPage] = useState('MyPage');


  const renderPage = () => {
    switch (currentPage) {
      case 'MyPage':
        return <MyPage  
          onClose={()=>setActivate(false) }
          setCurrentPage={()=>setCurrentPage('Follow')}
          />;
          case 'Follow' :
            return <Follow
            setCurrentPage={()=>setCurrentPage('MyPage')}
        />;
      default:
        return null;
    }
  };

  return (
    <>
      <MenuButton onClick={()=>setActivate(true)} />
      <SlideDiv show={active}>
        {renderPage()}
      </SlideDiv>
      <MapView/>
    </>
  );
};

export default Home;