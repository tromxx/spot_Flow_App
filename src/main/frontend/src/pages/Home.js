import { styled } from 'styled-components';
import MapView from "./MapView";
import { useCallback, useState } from "react";
import { ImProfile } from "react-icons/im";
import MyPages from '../components/Home/Mypage';
import Follower from '../components/Home/Follower';
import Following from '../components/Home/Following';

const MenuButton = styled.div`
    z-index: 2;
    position: absolute;
    top: 10vh;
    left: 0;
    width: 30px;
    height: 60px;
    background: var(--blue);
    color: white;
    border-radius: 0 10px 10px 0;
    display: ${(props) => (props.$active ? 'none' : 'flex')};
    justify-content: center;
    align-items: center;
    @media (max-width : 844px) {
        top: 7vh;
    }
`;

const SlideButton = styled(ImProfile)`
    cursor: pointer;
    font-size: 20px;
    margin: auto;
`;
const Home = () => {
    const [active, setActive] = useState(false);
    const [page, setPage] = useState('MyPage');

    const handleActive = useCallback(() => {
      setActive(false);
    }, []);


    const renderSideBar = (page) => {
        switch(page){
            case 'MyPage' :
                return <MyPages
                    active={active}
                    handleActive={handleActive}
                    handleFollower={()=>setPage('Follower')}
                    handleFollowing={()=>setPage('Following')}
                />
            case 'Follower' :
                return <Follower
                    active={active}
                    handleActive={handleActive}
                    handlePage={()=>setPage('MyPage')}
                    handleFollowing={()=>setPage('Following')}
                />
            case 'Following' :
                return <Following
                    active={active}
                    handleActive={handleActive}
                    handlePage={()=>setPage('MyPage')}
                    handleFollower={()=>setPage('Follower')}
                />
            default :
                return null;
        }
    }

    return (
      <>
        <MenuButton onClick={() => setActive(true)} $active={active}>
          <SlideButton />
        </MenuButton>
            {renderSideBar(page)}
        <MapView />
      </>
    );
  };

  export default Home;



