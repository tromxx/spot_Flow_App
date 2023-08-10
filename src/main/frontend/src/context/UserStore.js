import { createContext, useState }  from "react";
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


  return (
    <UserContext.Provider value={{ email, setEmail, nickname, setNickname, profilePic,setProfilePic, statMsg, setStatMsg, isLoggedIn,follower, setFollower, following, setFollowing, setIsLoggedIn, received, setReceived, joinDate, setJoinDate}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
