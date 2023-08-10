import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import Error from "../components/Common/Error";

const ChangeInfo = () =>{
    const{ isLoggedIn } = useContext(UserContext);

    return(
        <>
        {isLoggedIn ? 
            <h1>you are logged in</h1>
            :
            <Error/>
        }
        </>
    );
};

export default ChangeInfo;