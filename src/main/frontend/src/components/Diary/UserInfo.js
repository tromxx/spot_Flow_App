import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";
import { styled } from "styled-components";

const UserInfoDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    gap: 20px;
    flex-wrap: wrap;
    img{
        width: 130px;
        height: 130px;
        border-radius: 130px;
    }
    p{
        margin-bottom: 5px;
        font-family: var(--kfont);
    }
    .InformationDivTotal{
        display: flex;
        flex-direction: column;
    }
    h2{
        font-family: var(--efont);
        font-weight: bold;
        margin: 0px;
    }
    .FollowDiv{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 50px;
    }
    @media (max-width : 844px){
        margin-top: 15px;
        img{
            width : 90px;
            height: 90px;
        }
        .FollowDiv{
            gap: 20px;
        }
        p{
            margin-bottom: 0px;
        }
        h2{
            font-size: small;
        }
    }
`;

const UserInfo = () =>{
    const{nickname, profilePic,  statMsg, follower, following} = useContext(UserContext);

    return(
        <UserInfoDiv>
            <img src={profilePic} alt="error" />
            <div className="InformationDivTotal">
                <h2>{nickname}</h2>
                <p>{statMsg}</p>
                <div className="FollowDiv">
                    <p>개시글 : 0</p>
                    <p>팔로워 : {follower}</p>
                    <p>팔로우 : {following}</p>
                </div>
            </div>
        </UserInfoDiv>
    );
};

export default UserInfo;