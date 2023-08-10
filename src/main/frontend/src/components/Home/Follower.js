import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import FollowApi from "../../api/FollowApi";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";

const FollowerContainer = styled.div`
    margin-top: 20px;
    .hello{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        border: 1px solid var(--grey);
        padding: 15px;
        border-radius: 20px;
        img{
            width: 50px;
            height: 50px;
        }
        p{
          cursor: pointer;
          &:hover{
            color: var(--blue);
          }
        }
    }
`
const Unfollow = styled.button`
  width: 75px;
  height: 30px;
  border-radius: 20px;
  background-color: var(--grey);
  border: none;
  font-family: var(--kfont);
  cursor: pointer;
`;

const Follow = styled.button`
  width: 75px;
  height: 30px;
  border-radius: 20px;
  background-color: var(--blue);
  border: none;
  font-family: var(--kfont);
  cursor: pointer;
`;

const Follower = () => {
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(true);
  const {setFollowing, setFollower} = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FollowApi.getUserFollower();
        setDatas(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const setFollowUp = async(email, id) => {
    const data = {
        id : id,
        email : email
    };
    const response = await FollowApi.setFollowUp(data);
    setFollowing(response.data.following);
    setFollower(response.data.follower);
  }

  return (
<FollowerContainer>
  {loading ? (
    <p>로딩중...</p>
  ) : datas.length > 0 ? (
    datas.map((data) => (
      <div className="hello" key={data.email}>
        <img src={data.profilePic} alt="" />
        <p>{data.nickname}</p>
        {console.log(data.isFollowUp)}
        {data.isFollowUp ? ( 
            <Unfollow>팔로우</Unfollow> 
          ) : (
            <Follow onClick={() => setFollowUp(data.email, data.id)}>팔로우</Follow>
        )}
      </div>
    ))
  ) : (
    <p>팔로우 하고 있는 유저가 없습니다.</p>
  )}
</FollowerContainer>

  );
};

export default Follower;
