import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import 'swiper/swiper.css'
import {useEffect, useState} from "react";
import * as SC from "./SwiperComponent"
import {BsChatDots, BsArrowLeftCircle} from "react-icons/bs";
import {FaRegThumbsUp, FaThumbsUp} from "react-icons/fa";
import {useParams} from "react-router-dom";
import diaryApi from "../../api/DiaryApi";
import CustomerApi from "../../api/CustomerApi";

export const DiarySwiper = () => {
  const {id} = useParams();
  // 오버레이 표시 여부
  const [overlay, setOverlay] = useState(0);
  // 댓글 표시 여부
  const [chatBox, setChatBox] = useState(0);
  const [token, setToken] = useState("");


  const [diary, setDiary] = useState({})
  const [timeline, setTimeLine] = useState([]);
  const [comment, setComment] = useState([]);
  const [count, setCount] = useState(0);

  const DiaryInit = async () => {
    let res = await diaryApi.findDiary(id);
    await setDiary(res.data);
    await setTimeLine(res.data.timeLineList);
    await setComment(res.data.commentList.filter(e=>e.delete === false));
    console.log(res.data.commentList);
    console.log(res.data.timeLineList);
    console.log(res.data);
  }

  function OpenChat(e) {
    e.stopPropagation();
    if (chatBox === 0) setChatBox(1);
    else setChatBox(0);
  }

  const [thumbs, setThumbs] = useState(0);

  const ThumbsUp = async (e) => {
    e.stopPropagation();
    const thumbsData = await diaryApi.thumbsUP(id);
    console.log("status : " + thumbsData.status);
    if (thumbsData.status === 200) {
      setThumbs(thumbsData.data);
      console.log(thumbsData);
    }

  }

  function OverlayMode(e) {
    e.stopPropagation();
    if (chatBox === 1) setChatBox(0);
    if (overlay === 0) setOverlay(1);
    else setOverlay(0);
  }

  function pageBack(e) {
    e.stopPropagation();
    window.history.back();
  }

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    DiaryInit();
    const token = localStorage.getItem('authToken');
    console.log(token);
    setToken(token);
    // 이부분 localStorage 에서 토큰 뺴오기
    const getCustomerInfo = async () => {
      if (token != null) {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          const customer = response.data.customer;
          console.log(customer)
          setCustomer(customer)
        } catch (error) {
          throw error;
        }
      }else{
        return null;
      }
    };
    getCustomerInfo();

    const getThumbsInfo = async () => {
      try {
        const res = await diaryApi.findThumbs(id);
        console.log(res.data);
        if (res.data.id > 0) {
          setThumbs(1);
        }
      } catch (error) {
        throw error;
      }
    }

    getThumbsInfo();
  }, [count]);


  return (
    <SC.Container onClick={(event) => OverlayMode(event)}>
      <SC.DiarySwipe
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{clickable: true}}
        scrollbar={{draggable: true}}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {timeline.map(e => (
            <SC.TimeLine key={e.id}>
              {overlay === 1 &&
                <>
                  <SC.Overlay>
                    <SC.DiaryBox>
                      <span>{diary.title}</span>
                      <p>{diary.content}</p>
                    </SC.DiaryBox>
                    <SC.TimeLineBox>
                      <span>Flow</span>
                      <p>{e.content}</p>
                    </SC.TimeLineBox>
                  </SC.Overlay>
                </>
              }
              <img src={e.image}/>
            </SC.TimeLine>
          )
        )
        }
      </SC.DiarySwipe>
      {chatBox === 1 && <SC.Comment diary={id} commentList={comment} count={count} setCount={setCount} customer={customer}/>}

      <SC.Btn onClick={(event) => OpenChat(event)}>
        <BsChatDots className="comment"/>
      </SC.Btn>
      <SC.Thumbs onClick={(event) => ThumbsUp(event)}>
        {thumbs === 0 ? <FaRegThumbsUp className="thumbs-up"/> : <FaThumbsUp className="thumbs-up"/>}
      </SC.Thumbs>
      <SC.BackBtn>
        <BsArrowLeftCircle className="back-btn" onClick={(e) => pageBack(e)}/>
      </SC.BackBtn>

    </SC.Container>
  );
};