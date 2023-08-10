import axios from "axios";

const Backend = "";



const NotificationApi = {

    getAllNoti: async (token) => {
			
			return await axios.post(Backend + "/notification/getall", {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
		},
    updateFetchNoti: async (token, nofiData) => {
      return await axios.put(Backend + "/notification/updatestatus", nofiData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    },
    sseTest: async() => {
    
      return await axios.get(Backend + "/notification/ssetest?email=youngtong111")
    }
}

export default NotificationApi;




