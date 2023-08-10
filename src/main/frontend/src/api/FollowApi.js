import axios  from "axios";

const DOMAIN = ""

const FollowApi = {

    // 유저의 follower 정보 가죠오기
    getUserFollower: async () => {
        const token = localStorage.getItem("authToken")
        return axios.get(DOMAIN + "/follow/userFollower", {
            headers : {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
    },

    //유저의 following 정보 가죠오기
    getUserFollowing: async () => {
        const token = localStorage.getItem("authToken")
        return axios.get(DOMAIN + "/follow/userFollowing", {
            headers : {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
    },

    // 유저가 following 삭제하기
    delUserFollowing : async (data) => {
        const token = localStorage.getItem("authToken")
        return axios.post(DOMAIN + "/follow/delFollowing",data, {
            headers : {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
    },

    // 맞팔 하기
    setFollowUp : async(data) =>{
        const token = localStorage.getItem("authToken")
        return axios.post(DOMAIN + "/follow/setFollowUp",data, {
            headers : {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
    },

    checkFollowing: async (email) => {
        const token = localStorage.getItem("authToken");
        return axios.get(DOMAIN + `/follow/testing?email=${email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    },
    
    setFollowing : async(email) =>{
        const token = localStorage.getItem("authToken");
        const data ={
            email : email
        }
        return axios.post(DOMAIN + "/follow/following",data, {
            headers : {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
    }
    
}

export default FollowApi;
