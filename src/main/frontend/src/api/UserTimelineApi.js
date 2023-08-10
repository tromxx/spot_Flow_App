/* 타임라인 정보를 핸들링하는 api */
import axios from "axios";

const DOMAIN = ""

const api = axios.create({
  withCredentials: true,  // 쿠키 자동 포함 설정
});

const userTimelineApi = {

  // 모든 타임라인 정보를 가져옴
  getUserTimelineList: async (lastId) => {
    const token = localStorage.getItem("authToken");
    return await axios.get(DOMAIN + "/auth/timeline/getall", {
      params: {
        lastTimeLineId: lastId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

   // 모두 가져옴 
   getUserTimelineLists: async (lastId) => {
    return await axios.get(DOMAIN + "/auth/timeline/All");
  },


  // 특정 타임라인의 장소별 검색 결과가져옴
  getTimePlace: async (place) => {
    const token = localStorage.getItem("authToken");
    return await axios.get(DOMAIN + "/auth/timeline/search", {
      params: {
        place: place
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // 타임라인 정보를 저장함
  setUserTimeline: async (props, token) => {
    const data = {
      lat: props.lat,
      lng: props.lng,
      tl_profile_pic: props.image,
      content: props.content,
      updateTime: props.date,
      place: props.place,
    }
    return await axios.post(DOMAIN + "/timeline/post", data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // 조회수를 올려줌
  upView: async (postId) => {
    const token = localStorage.getItem("authToken");
    return await api.put(DOMAIN + `/auth/timeline/${postId}/views`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },
}

export default userTimelineApi;


// // 특정 유저의 타임라인 정보를 가져옴 안씀
// getUserTimeline: async (email) => {
//   return await axios.get(DOMAIN + "/timeline/user/" + email);
// },

// // 특정 타임라인 정보를 가져옴
// getTimeline: async (timeline) => {
//   return await axios.get(DOMAIN + "/timeline/" + timeline.index);
// },

// // 타임라인 정보를 수정함
// reWrite: async (timeline) => {
//   return await axios.put(DOMAIN + "/timeline/" + timeline.index, timeline);
// },