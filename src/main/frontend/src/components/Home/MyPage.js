import {styled} from 'styled-components';
import {useTheme} from "../../context/themeProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai'
import { useRef, useState } from 'react';
import {RxGear} from 'react-icons/rx'
import {BsCamera} from 'react-icons/bs'
import { useContext } from 'react';
import { UserContext } from '../../context/UserStore';
import { storage } from '../../api/FirebaseApi'
import CustomerApi from '../../api/CustomerApi';
import Error from '../Common/Error'

const LogInDiv = styled.div`
  margin-top: 7vh;
  width: 390px;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  border-right: 1px solid var(--grey);
  background-color: ${props=>props.theme.bgColor};
  color: ${props=>props.theme.textColor};
  border: ${props=>props.theme.borderColor};
  font-family: var(--efont);
  transition: 0.6s ease;
  .controlDiv{
    margin-top: 15px;
    display: flex;
    gap: 250px;
  }
  img{
    border-radius: 50%;
    width: 130px;
    height: 130px;
    margin-top: 15px;
    text-align: center;
  }
  .profileDiv{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .followingfollowerDiv{
    display: flex;
    gap: 50px;
  }
  @media (max-width : 844px){
    height: 100vh;
    margin-top: 0px;
  }
`;

const LogOutDiv=styled.div`
  margin-top: 7vh;
  width: 390px;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  border-right: 1px solid var(--grey);
  background-color: white;
  font-family: var(--efont);
  .closeDiv{
    margin-top: 15px;
    display: flex;
    justify-content: right;
    margin-left: 290px;
  }
  @media (max-width : 844px){
    height: 100vh;
    margin-top: 0px;
  }
`;

const Caption = styled.div`
  margin: 0px;
  padding: 0px;
  position: absolute;
  margin-top: 80px;
  width: 130px; 
  height: 65px; 
  border-radius: 0 0 70px 70px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5;
  display: ${props => (props.$isactive === "false" ? 'block' : 'none')};
  input {
    display: none;
  }
`;

const TextArea = styled.textarea`
  position: absolute;
  margin-top: 300px;
  resize: none;
  font-family: var(--kfont);
  width: 300px;
  height: 70px;
  border-radius: 20px;
  text-align: center;
  resize: none;
  padding: 2px;
  display: ${props => (props.$isactive === "false" ? 'block' : 'none')};
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  color: white;
  font-weight: bold;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 20px;
  background-color: var(--blue);
  display: ${props => (props.$isactive === "false" ? 'block' : 'none')};
  &:hover{
    color: var(--lightblue);
    cursor: pointer;
  }
`;

const Paragrph = styled.p`
  margin: 15px;
  transform: ${props  => `translateX(${props.$isactive === "true" ? 0 : -900}%)`};
  &.NickName{
    transition: transform 1.8s ease;
    font-size: 20px;
    font-weight: bolder;
  }
  &.Following{
    transition: transform 2.0s ease;
    &:hover {
      color: var(--lightblue);
      cursor: pointer;
    }
  }
  &.StatMsg{
    transition: transform 2.2s ease;
    overflow-wrap: break-word;
    word-wrap: break-word; 
    word-break: break-all;
  }
  &.MyFlow {
    transition: transform 2.4s ease;
    font-size : 30px;
    font-weight : bolder;
    &:hover {
      color: var(--lightblue);
      cursor: pointer;
    }
  }
  &.Diary {
    transition: transform 2.6s ease;
    font-size : 30px;
    font-weight : bolder;
    &:hover {
      color: var(--lightblue);
      cursor: pointer;
    }
    &.nickName{
      margin-left : 10px;
    }
  } 
  &.Flow {
    transition: transform 2.6s ease;
    font-size : 30px;
    font-weight : bolder;
    &:hover {
      color: var(--lightblue);
      cursor: pointer;
    }
    span {
      color: #00C2FA;
    }
  }
  &.Theme {
    transition: transform 2.8s ease;
    font-size : 30px;
    font-weight : bolder;
    &:hover {
      color: var(--lightblue);
      cursor: pointer;
    }
  }
`
// 톱니버튼 CSS
const ControlButton = styled(RxGear)`
  width: 30px;
  height: 30px;
  color: var(--grey);
  transition: transform 0.7s ease;
  transform: ${props => (props.$isactive === "true" ? 'rotate(120deg)' : 'rotate(5deg)')};

  &:hover {
    color: skyblue;
  }
`;

//close 버튼 CSS
const CloseButton = styled(AiOutlineClose)`
  width: 35px;
  height: 35px;
  color: var(--grey);
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
`;

//프로파일 이미지 업로드 수정
const CameraButton = styled(BsCamera)`
  width: 30px;
  height: 30px;
  color: var(--grey);
  margin-top: 10px;
  margin-left: 49px;
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
`;

const MyPage = ({ onClose, setCurrentPage }) => {
  const [ThemeMode, setTheme] = useTheme(); 
  const [isactive, setIsActive] = useState(true);
  const [prevImgFile, setPrevImgFile] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const textareaRef = useRef();
  const navigate = useNavigate();
  const{nickname, setNickname, profilePic, setProfilePic, statMsg, setStatMsg,follower, following, isLoggedIn, setIsLoggedIn} = useContext(UserContext);

  const handleClick = () => {
    setIsActive(!isactive);
    setPrevImgFile("");
    textareaRef.current.value = '';
  };

  const savePrevImgFile = (e) => {
    const file = e.target.files[0];
    setImgFile(e.target.files[0]);
    if(file){
      const reader = new FileReader();
      reader.onload =(e) => {
        setPrevImgFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }else{
      setPrevImgFile("");
    }
  };
  
  const updateProfile = () => {
    const token = localStorage.getItem('authToken');

    if(data != null && imgFile === null){
      console.log("Status Message Updated Activated");
      const customerData ={
        statMsg : data
      };
      updateStatMsg(customerData, token);
      console.log("Status Message Updated Finish");
    }
    if (data === null && imgFile != null) {
      console.log("ProfilePic Updated Activated");
      const storageRef = storage.ref();
      const fileRef = storageRef.child(imgFile.name);
      fileRef.put(imgFile).then(() => {
        fileRef.getDownloadURL().then((url) => {
          setUrl(url);
          const customerData = {
            profilePic : url
          };
          updateProfilePic(customerData,token);
          console.log("Profilepic Updated Finish");
      });});
    }
    if(data !=null && imgFile != null){
      console.log("Profile Updated Activated");
      const storageRef = storage.ref();
      const fileRef = storageRef.child(imgFile.name);
      fileRef.put(imgFile).then(() => {
        fileRef.getDownloadURL().then((url) => {
          setUrl(url);
          const customerData = {
            profilePic : url,
            statMsg : data
          };
          updateStatMsgProfilePic(customerData,token);
          console.log("Profile Updated Finish");
      });});
    }
  };

  const updateStatMsg = async(customerData, token) => {
    const response = await CustomerApi.updateStatMsg(token, customerData);
    setNickname(response.data.nickName);
    setStatMsg(response.data.statMsg);
    setProfilePic(response.data.profilePic);
    setIsLoggedIn(true);
    setIsActive(!isactive);
    setData(null);
    setImgFile(null);
  }

  const updateProfilePic = async(customerData, token) => {
    const response = await CustomerApi.updateProfilePic(token, customerData);
    setNickname(response.data.nickName);
    setStatMsg(response.data.statMsg);
    setProfilePic(response.data.profilePic);
    setIsLoggedIn(true);
    setIsActive(!isactive);
    setData(null);
    setImgFile(null);
  }

  const updateStatMsgProfilePic = async(customerData, token) => {
    const response = await CustomerApi.updateStatMsgProfilePic(token, customerData);
    setNickname(response.data.nickName);
    setStatMsg(response.data.statMsg);
    setProfilePic(response.data.profilePic);
    setIsLoggedIn(true);
    setIsActive(!isactive);
    setData(null);
    setImgFile(null);
  }

  return (
    <>
    {isLoggedIn ? 
      <LogInDiv>
        <div className="controlDiv">
          <ControlButton onClick={handleClick}  $isactive={isactive.toString()}  />
          <CloseButton onClick={onClose} />
        </div>
        <div className='profileDiv'>
          <img
              src={prevImgFile ? prevImgFile : profilePic || "/images/icon/user.png"}
              alt="프로필 이미지"
          />
          <Caption $isactive={isactive.toString()}>
            <label htmlFor="profileImg">
              <CameraButton/>
            </label>
            <input
              type="file"
              accept="image/*"
              id="profileImg"
              onChange={savePrevImgFile}
            />
          </Caption>
          <Paragrph $isactive={isactive.toString()} className='NickName'>{nickname}</Paragrph>
          <div className='followingfollowerDiv'>
            <Paragrph $isactive={isactive.toString()} className='Following' onClick={setCurrentPage}>Follower : {follower}</Paragrph>
            <Paragrph $isactive={isactive.toString()} className='Following' onClick={setCurrentPage}>Following : {following}</Paragrph>
         </div>
          <Paragrph $isactive={isactive.toString()} className='StatMsg'>{statMsg}</Paragrph>
        </div>
        <Paragrph onClick={()=>navigate("/diary")} $isactive={isactive.toString()} className='Diary'>ToSpot</Paragrph>
        <Paragrph onClick={()=>navigate("/flow")} $isactive={isactive.toString()} className='Flow'>To<span>F</span>low</Paragrph>
        <Paragrph onClick={setTheme} $isactive={isactive.toString()} className='Theme' >{ThemeMode === "dark" ? "Light Mode" : "Dark Mode"}</Paragrph>
        <Button $isactive={isactive.toString()} onClick={updateProfile} >저장하기</Button>
        <TextArea
          spellCheck="false"
          placeholder="상태 메시지를 입력하세요"
          onChange={(e)=> setData(e.target.value)}
          $isactive={isactive.toString() }
          ref={textareaRef}
        ></TextArea>
      </LogInDiv>
      :
      <LogOutDiv>
        <div className="closeDiv">
          <CloseButton onClick={onClose} />
        </div>
        <Error/>
      </LogOutDiv>
    }
    </>
  );
};

export default MyPage;