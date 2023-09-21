import { styled } from "styled-components";
import { AiOutlineClose } from 'react-icons/ai'
import {MdOutlineArrowBack} from 'react-icons/md'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserStore';
import Error from '../Common/Error';
import FollowApi from "../../api/FollowApi";


const FollowDiv = styled.div`
    width: 390px;
    height: calc(100vh - 7vh - 3px);
    transition: all 1s;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
    position: absolute;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    border: ${props => props.theme.borderColor};
    left: ${(props) => (props.$active ? '0' : '-390px')};
    z-index: 3;
    .controlDiv {
        margin-top: 15px;
        display: flex;
        gap: 250px;
    }
    .followCounter{
        margin-top: 25px;
        display: flex;
        font-size: large;
        font-weight: bolder;
        gap: 100px;
        p{
            cursor: pointer;
            &:hover{
                color: var(--lightblue);
            }
        }
    }
    .FollowingContainer{
        width: 350px;
        height: 75vh;
        margin-top: 25px;
        overflow-y: scroll;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.4);
        }
        &::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
        }
        .userContainer{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            padding: 10px;
            border-radius: 30px;
            font-weight: bolder;
            border: ${props => props.theme.borderColor};
            img{
                width: 50px;
                height: 50px;
                border-radius: 50px;
                border: 1px solid var(--grey);
            }
            button{
                width: 150px;
                height: 50px;
                background-color: var(--lightblue);
                color: ${props => props.theme.textColor};
                border: none;
                font-weight: bolder;
                border-radius: 20px;
                cursor: pointer;
                &:hover{
                   color: var(--blue);
                }
            }
            p{
                width: 100px;
                cursor: pointer;
                overflow-wrap: break-word;
    	        word-wrap: break-word;
    	        word-break: break-all;
                &:hover{
                    color: var(--lightblue);
                }
            }
        }
  	@media (max-width : 844px){
    	height: 100vh;
  	}
`;

const CloseButton = styled(AiOutlineClose)`
    width: 35px;
    height: 35px;
    color: var(--grey);
    cursor: pointer;
    &:hover {
        cursor: pointer;
        color: var(--lightblue);
    }
`;

const BackButton = styled(MdOutlineArrowBack)`
    width: 35px;
    height: 35px;
    color: var(--grey);
    cursor: pointer;
    &:hover {
        cursor: pointer;
        color: var(--lightblue);
    }
`;

const LogOutDiv = styled.div`
    width: 390px;
    height: calc(100vh - 7vh - 1px);
    transition: all 1.7s;
    position: absolute;
    background-color: white;
    left: ${(props) => (props.$active ? '0' : '-390px')};
    z-index: 3;
    @media (max-width: 844px) {
        height: 100vh;
    }
`;

const Follower = ({ handleActive, active, handlePage, handleFollowing }) => {
    const { isLoggedIn, follower, following } = useContext(UserContext);
    const [data, setData] = useState([]);

    useEffect(()=>{
        const getFollower = async() => {
            const response = await FollowApi.getFollower();
            console.log(response.data);
            setData(response.data);
        }
        getFollower();
    },[])

	return (
        <>
            {isLoggedIn ?
		        <FollowDiv $active={active}>
                   <div className="controlDiv">
                       <BackButton onClick={handlePage}/>
                       <CloseButton onClick={handleActive}/>
                   </div>
                   <div className="followCounter">
                       <p>follower : {follower}</p>
                       <p onClick={handleFollowing}>following : {following}</p>
                   </div>
                   <div className="FollowingContainer">
                        {data.map((datas) => (
                            <div key={datas.id} className="userContainer">
                                <p><img src={datas.url} alt="" /></p>
                                <p>{datas.nickname}</p>
                                <button>Follow</button>
                            </div>
                        ))}
                        {data.length === 0 && (
                            <div className="FollowingErrorContainer">
                                <p>팔로워 중인 사람이 없습니다.</p>
                            </div>
                        )}
                    </div>
		        </FollowDiv>
                :
                <LogOutDiv $active={active}>
                    <Error/>
                </LogOutDiv>
            }
        </>
	);
};

export default Follower;