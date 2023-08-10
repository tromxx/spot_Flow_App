import axios from "axios";

const DOMAIN = ""

const DiaryApi = {

  //다이어리 저장하기
  saveDiary: async (data) => {
    const token = localStorage.getItem("authToken")
    const requestData = {
      title: data.title,
      content: data.content,
      timeLineList: data.timeLineList
    }
    return axios.post(DOMAIN + "/diary", requestData, {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  //특정 다이어리 디데일 정보 가져오기 Diary Detail
  // id = 다이어리 식별 번호
  findDiary: async (id) => {
    return axios.get(DOMAIN + "/diary?num=" + id);
  },

  //유저 다이어리 정보 가져오기 
  findMyDiary: async () => {
    const token = localStorage.getItem("authToken");
    return axios.get(DOMAIN + "/diary/my-diary",{
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },
  
  //특정 유저 diary 가져오기
  findUserDiary: async (email) => {
    return axios.get(DOMAIN + "/diary/user?email=" + email);
  },

  //다이어리 업데이트
  updateDiary : async (data) => {
    return axios.post(DOMAIN + "/diary/update",data);
  },

  //다이어리 업데이트 
  updateMyDiary : async (data) => {
    return axios.put(DOMAIN + "/diary",data);
  },

  // 다이어리 조회수 올리기 
  increaseView : async (id) =>{
    const data = {
      id : id
    };
    return axios.put(DOMAIN + "/diary/view", data);
  }, 

  //다이어리 삭제
  deleteDiary: async(data) => {
    return axios.post(DOMAIN + "/diary/del", data);
  },

  // 다이어리 삭제 체크된것만
  deleteDiarys: async(id) => {
    const token = localStorage.getItem("authToken");
    return axios.post(DOMAIN + "/diary/check", id);
  },


  sendComment: async (props) => {
    const token = localStorage.getItem("authToken");
    const comment = {
      diary: props.diary,
      content: props.comment,
    }
    console.log(comment)
    return await axios.post(DOMAIN + "/diary/comment", comment, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },
  
  sendcommentNoti: async (comment) => {
    const token = localStorage.getItem("authToken");
    
    return await axios.post(DOMAIN + "/notification/comment", comment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  },

  //다이어리 댓글 삭제 하기
  deleteComment: async (comment) => {
    console.log(comment)
    return await axios.delete(DOMAIN + "/diary/comment/" + comment);
  },


  // 장소명으로 다이어리 검색 
  searchPlace: async (place) => {
    const token = localStorage.getItem("authToken");
    const body = {
      place: place
    }
    return await axios.post(DOMAIN + "/diary/search", body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // 팔로우관계의 다이어리 검색
  searchFreind: async () => {
    const token = localStorage.getItem("authToken");
    return await axios.get(DOMAIN + "/diary/following", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  thumbsUP : async(id) => {
    const token = localStorage.getItem("authToken")
    const request = {
      id : id,
      content : "like"
    }
    return await axios.put(DOMAIN + "/diary/like", request,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
  },


  findThumbs : async(id) => {
    const token = localStorage.getItem("authToken")
    return await  axios.get(DOMAIN + "/diary/like/" + id,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }}
    );
  },
  
  // 다이어리 전체 조회 하기
  findAllDiary : async() =>{
    return await axios.get(DOMAIN + "/diary/alls");
  }
}

export default DiaryApi;




