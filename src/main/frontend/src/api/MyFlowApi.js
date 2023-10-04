import axios from "axios";


const Backend = "";


const MyFlowApi = {

  // 새 플로우 쓰기
  newFlow: async (lat, lng, content, img, place) => {
    const token = localStorage.getItem('authToken');
    const flowData = {
      lat: lat,
      lng: lng,
      content: content,
      img: img,
      place: place
    };
    return await axios.post(Backend + "/timeline/myflownew", flowData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // getClickedFlow: async (flowId) => {
  //   const token = localStorage.getItem('authToken');
  //   try {
  //     const response = await axios.post(Backend + "/auth/clickedflow", flowId, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });
  //     return response;
  //   } catch (error) {
  //     throw new error("클릭한 플로우 정보를 가져오는 데 실패했습니다.");
  //   }

  // }


  getmyFlow: async (token) => {

    return await axios.post(Backend + "/timeline/getmyflow", {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  allFlow: async () => {
    const token = localStorage.getItem('authToken');
    return await axios.get(Backend + "/timeline/find", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },
  deleteFlow: async (data) => {
    const token = localStorage.getItem('authToken');
    try {
      console.log(data);
      const response = await axios.post(Backend + "/timeline/myflowdel", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default MyFlowApi;




