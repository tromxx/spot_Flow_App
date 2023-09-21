import { createContext, useEffect, useState }  from "react";
import CustomerApi from "../api/CustomerApi";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [statMsg , setStatMsg] = useState("");
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [received, setReceived] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const token = localStorage.getItem('authToken');

  useEffect(()=>{
    const getCustomerInfo = async() => {
      if(token != null){
        try{
          const response = await CustomerApi.getCustomerInfo(token);
          setEmail(response.data.customer.email);
          setNickname(response.data.customer.nickName);
          setProfilePic(response.data.customer.profilePic);
          setStatMsg(response.data.customer.statMsg);
          setFollower(response.data.follower.follower);
          setFollowing(response.data.follower.following);
          setJoinDate(response.data.joinDate);
          setIsLoggedIn(true);
        }catch(error){
          localStorage.clear();
          setIsLoggedIn(false);
        }
      }
    };
    getCustomerInfo();
  },[token])



  return (
    <UserContext.Provider value={{ email, setEmail, nickname, setNickname, profilePic,setProfilePic, statMsg, setStatMsg, isLoggedIn,follower, setFollower, following, setFollowing, setIsLoggedIn, received, setReceived, joinDate, setJoinDate}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
