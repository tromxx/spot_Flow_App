import React, {useEffect, useCallback, useState} from 'react';
import {Map, MapMarker, useMap} from "react-kakao-maps-sdk";
import {FaMapMarkerAlt} from "react-icons/fa";
import {GiPartyPopper} from "react-icons/gi";
import {useNavigate} from "react-router-dom";
import ToSpotData from "../dataSet/ToSpotData";
import * as ToSpot from "../components/ToSpotComponent";
import MyFlowApi from "../api/MyFlowApi";
import ForumData from '../utils/ForumData';
import CustomOverlay from "../components/Map/CustomOverlay";


const MapView = React.memo((props) => {
  const navigate = useNavigate();
  const [loc, setLoc] = useState("");
  const [lat, setLat] = useState(37.4923615);
  const [lng, setLng] = useState(127.0292881);
  const [flow, setFlow] = useState([]);
  // const [forumData, setForumData] = useState([]);
  const [eventFlow, setEventFlow] = useState([]);

  // 축제 데이터 가져오기
  const fetchForumData = useCallback(() => {
    const start_idx = 1;
    const end_idx = 100;
    const type = " ";
    const title = " ";
    ForumData(start_idx, end_idx, type, title).then(data => {
      let event = data.map(i => ({
        content: ToSpotData.eventOverlay(i),
        lat: i.LOT,
        lng: i.LAT
      }))
      setEventFlow(event)
    }).catch(error => {
      console.error("Error fetching forum data:", error);
    });
  }, []);  // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때만 함수가 실행되도록 합니다.

  useEffect(() => {
    (() => {
      fetchForumData();
    })();
  }, [fetchForumData]);  // 의존성 배열에 fetchForumData를 추가하여 함수가 변경될 때만 데이터를 가져오도록 합니다.


  // 날짜 차이 계산
  const calDate = (start_date) => {
    const start_date_obj = new Date(start_date);
    const current_date_obj = new Date();
    const difference_in_time = start_date_obj - current_date_obj;
    const difference_in_days = difference_in_time / (1000 * 3600 * 24);
    return Math.floor(difference_in_days);
  }


  const dataInit = async () => {
    let res = await MyFlowApi.allFlow();
    if (res.status === 200) {
      console.log(res.data);
      let user = await res.data.map(i => ({
        name: i.customer.nickName,
        img: i.image,
        lat: i.lat,
        lng: i.lng,
        loc: i.place,
        time: i.joinDate,
        content: i.content,
        place: i.place,
        view: i.view
      }));
      let userData = await user.map(i => ({
        content: ToSpotData.setOverlay(i),
        lat: i.lat,
        lng: i.lng
      }));
      setFlow(userData);
    }
  };

  const [isToSpotBtnState, setIsToSpotBtnState] = useState(0);

  const btnToSpotMoreView = () => {
    setIsToSpotBtnState(prevState => (prevState === 0 ? 1 : 0));
  };

  const ToTimeLine = (location) => {
    navigate("/flow", {
      state: {
        loc: location
      }
    });
  };

  // const toSpotFocus = (latitude, longitude, location) => {
  //   setLat(latitude);
  //   setLng(longitude);
  //   setLoc(location);
  // };

  const [viewSet, setViewSet] = useState(0);

  const convertViewSet = () => {
    setViewSet(prevState => (prevState === 0 ? 1 : 0));
    setIsVisible(false);
  };

  const EventMarkerContainer = React.memo(({lat, lng, content}) => {
    const map = useMap();
    // const [isVisible, setIsVisible] = useState(false);

    // const markerImg = "https://firebasestorage.googleapis.com/v0/b/spotflow-5475a.appspot.com/o/images%2Ffree-icon-music-festival-5039367-removebg-preview.png?alt=media&token=b0f4139d-4e46-468f-b29d-04c60c0a7af3";
    // const soonImg = "https://firebasestorage.googleapis.com/v0/b/spotflow-5475a.appspot.com/o/images%2Ffree-icon-location-10797038.png?alt=media&token=e0965f50-abc4-40b0-a7eb-684052328586";

    return (
        <>
          <MapMarker
              zIndex={1}
              position={{
                lat: lat,
                lng: lng
              }}
              // image={{
              //   src: calDate(content.STRTDATE) < 3 ? soonImg : markerImg, // 마커이미지의 주소입니다
              //   size: {
              //     width: 45,
              //     height: 50,
              //   }, // 마커이미지의 크기입니다
              //   options: {
              //     offset: {
              //       x: 27,
              //       y: 69,
              //     }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              //   },
              // }}
              title={content.TITLE}
              onClick={(marker) => {
                console.log("on click")
                setOlLat(lat);
                setOlLng(lng);
                setContent(content);
                map.panTo(marker.getPosition());
                setIsVisible(prevState => !prevState);
              }}
          >
          </MapMarker>
        </>
    );
  });
  const [isVisible, setIsVisible] = useState(false);
  const [olLat, setOlLat] = useState(0);
  const [olLng, setOlLng] = useState(0);
  const [content, setContent] = useState();

  const UserEventMarkerContainer = React.memo(({lat, lng, content}) => {
    const map = useMap();
    return (
        <>
          <MapMarker
              zIndex={1}
              position={{
                lat: lat,
                lng: lng
              }}
              onClick={(marker) => {
                console.log("on click")
                setOlLat(lat);
                setOlLng(lng);
                setContent(content);
                map.panTo(marker.getPosition());
                setIsVisible(prevState => !prevState);
              }}
          />
        </>
    );
  });


  useEffect(() => {
    dataInit();
    console.log(flow);
    console.log(viewSet);
  }, [props, viewSet]);

  return (
      <ToSpot.Container>
        <Map
            center={{
              lat: lat,
              lng: lng,
            }}
            style={{
              width: "100%",
              height: "100vh",
              position: "relative"
            }}
            level={3}
        >
          {isVisible &&
              <CustomOverlay
                  position={{
                    lat: olLat,
                    lng: olLng
                  }}
                  content={content}
                  setIsVisivle={setIsVisible}
                  Mode={viewSet}
              />}

          {viewSet === 0 ? (
              flow.map((value, idx) => (
                  <UserEventMarkerContainer
                      key={`EventMarkerContainer-${value.lat}-${value.lng}-${idx}`}
                      lat={value.lat}
                      lng={value.lng}
                      content={value.content}
                  />
              ))
          ) : (
              eventFlow.map((value, idx) => (
                  <EventMarkerContainer
                      key={`EventMarkerContainer-${value.lat}-${value.lng}-${idx}`}
                      lat={value.lat}
                      lng={value.lng}
                      content={value.content}
                  />
              ))
          )}

          {<ToSpot.Converter onClick={() => convertViewSet()}>
            {viewSet === 0 ?
                <GiPartyPopper className="icon" size={30}/> :
                <FaMapMarkerAlt className="icon" size={30}/>
            }
          </ToSpot.Converter>}

        </Map>
      </ToSpot.Container>

  );
});

export default MapView;

