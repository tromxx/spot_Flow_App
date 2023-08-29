import {styled} from 'styled-components';
import MapView from "./MapView";
import { useState} from "react";
// import { AiOutlineMenu } from 'react-icons/ai';
import SlideDiv from '../components/Home/SlideDiv'
import MyPage from '../components/Home/MyPage'
import Follow from '../components/Home/Follow';
import {ImProfile} from "react-icons/im";

const MenuButton = styled.div`
  z-index: 2;
  position: absolute;
  display: flex;
  top: 7vh;
  left: 0;
  width: 30px;
  height: 60px;
  background: #00b4d8;
  border-radius: 0 10px 10px 0;
  @media (max-width : 844px) {
    top: 2vh;
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
  const style = {
    left : "390px"
  }

  return (
      <>
        <MenuButton onClick={()=>setActivate(true)}>
          <ImProfile
              size={20}
              style={{
                margin:"auto",
                color:"white"
              }}
          />
        </MenuButton>
        <SlideDiv show={active}>
          <MenuButton onClick={()=>setActivate(false)}
                      style={style}
          />
          {renderPage()}
        </SlideDiv>
        <MapView/>
      </>
  );
};

export default Home;