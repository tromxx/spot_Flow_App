/* 서울시 실시간 도시 데이터를 서버를 통해 가져와서 파싱하는 api 호출 페이지*/
import axios from "axios";

const DOMAIN = ""

const CityDataApi =  {
  getCityData : async (place) => {
    const data =  (await axios.get(DOMAIN + "/api/list?place=" + place)).data;
    let firstKey = Object.keys(data)[0];
    const cityData = data[firstKey].CITYDATA; // 도시정보 일괄저장
    console.log(cityData);
    const realTimeData = cityData.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS;
    const result = {
      congest : realTimeData.AREA_CONGEST_LVL, // 혼잡도 지표
      congestMsg : realTimeData.AREA_CONGEST_MSG, // 혼잡도 관련 메세지
      femaleRate : realTimeData.FEMALE_PPLTN_RATE, // 여성비율
      maleRate : realTimeData.MALE_PPLTN_RATE, // 남성비율
      non_Resident : realTimeData.NON_RESNT_PPLTN_RATE, // 비상주 인구 비율
      Resident : realTimeData.RESNT_PPLTN_RATE, // 상주 인구 비율
      rate0 : realTimeData.PPLTN_RATE_0, // 0~10세 비율
      rate10 : realTimeData.PPLTN_RATE_10, // 10~20 비율
      rate20 : realTimeData.PPLTN_RATE_20, // 20~30 비율
      rate30 : realTimeData.PPLTN_RATE_30,
      rate40 : realTimeData.PPLTN_RATE_40,
      rate50 : realTimeData.PPLTN_RATE_50,
      rate60 : realTimeData.PPLTN_RATE_60,
      rate70 : realTimeData.PPLTN_RATE_70,
      updateTime : realTimeData.PPLTN_TIME // 갱신 시간
    };
    return result;
  },
}

export default CityDataApi;