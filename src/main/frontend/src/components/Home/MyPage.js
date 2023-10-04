import { styled } from 'styled-components';
import { useTheme } from "../../context/themeProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { RxGear } from 'react-icons/rx';
import { BsCamera } from 'react-icons/bs';
import { useContext } from 'react';
import { UserContext } from '../../context/UserStore';
import Error from '../Common/Error';
import CustomerApi from '../../api/CustomerApi';
import { storage } from '../../api/FirebaseApi'
import LoginSignUpModal from '../../utils/LoginSignUpModal'

const MyPagesContainer = styled.div`
    width: 390px;
    height: calc(100vh - 7vh - 3px);
    transition: all 1s;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
    position: absolute;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    border: ${props => props.theme.borderColor};
    left: ${(props) => (props.$active ? '0' : '-390px')};
    z-index: 3;
    .controlDiv {
        margin-top: 15px;
        display: flex;
        gap: 250px;
    }
    img {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        text-align: center;
    }
    @media (max-width: 844px) {
        height: 100vh;
    }
`;

const Controler = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transform: ${(props) => `translateX(${props.$isactive ? '-170%' : '0'})`};
    transition: transform 2.7s ease;
    > p:first-child {
        font-size: 25px;
        font-weight: bold;
    }
	> p:nth-child(3){
		margin-top : 10px;
		text-align : center;
		width : 300px;
		overflow-wrap: break-word;
    	word-wrap: break-word;
    	word-break: break-all;
	}
    > p:nth-child(4),
    > p:nth-child(5),
    > p:nth-child(6) {
        font-weight: bold;
        font-size: 27px;
        margin-top: 25px;
        cursor: pointer;
        &:hover {
            color: var(--lightblue);
        }
    }
    .followDiv {
        gap: 100px;
        display: flex;
		p:nth-child(1), p:nth-child(2){
			cursor: pointer;
			&:hover{
				color: var(--lightblue);
			}
		}
    }
    .changeControl {
        margin-top: 90%;
        display: flex;
        gap: 137px;
        p {
            font-size: 15px;
            font-weight: bolder;
            cursor: pointer;
            &:hover {
                color: var(--lightblue);
            }
        }
    }
`;

const Button = styled.button`
    width: 300px;
    height: 60px;
    color: white;
    font-weight: bold;
    text-align: center;
    border: none;
    outline: none;
    position: absolute;
    margin-top: 400px;
    border-radius: 20px;
    background-color: var(--blue);
    transition: all 1s;
    display: ${props => (props.$isactive ? 'block' : 'none')};
    &:hover {
        color: var(--lightblue);
        cursor: pointer;
    }
`;

const Caption = styled.div`
    position: absolute;
    margin-top: 130px;
    width: 150px;
    height: 71px;
    border-radius: 0 0 71px 71px;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 1s;
    opacity: ${(props) => (props.$isactive ? '2' : '0')};
    input {
        display: none;
    }
`;

const LogOutDiv = styled.div`
    width: 390px;
    height: calc(100vh - 7vh - 1px);
    transition: all 1.7s;
    position: absolute;
    background-color: white;
    left: ${(props) => (props.$active ? '0' : '-390px')};
    z-index: 3;
    @media (max-width: 844px) {
        height: 100vh;
    }
`;

const ControlButton = styled(RxGear)`
    width: 30px;
    height: 30px;
    color: var(--grey);
    transition: transform 0.7s ease;
    transform: ${props => (props.$isactive ? 'rotate(120deg)' : 'rotate(5deg)')};
    cursor: pointer;
    &:hover {
        color: skyblue;
    }
`;

const CloseButton = styled(AiOutlineClose)`
    width: 35px;
    height: 35px;
    color: var(--grey);
    cursor: pointer;
    &:hover {
        cursor: pointer;
        color: var(--lightblue);
    }
`;

const CameraButton = styled(BsCamera)`
    width: 30px;
    height: 30px;
    color: var(--grey);
    margin-top: 15px;
    margin-left: 60px;
    &:hover {
        cursor: pointer;
        color: var(--lightblue);
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
    transition: all 1s;
    display: ${props => (props.$isactive ? 'block' : 'none')};
`;

const MyPages = ({ active, handleActive, handleFollower, handleFollowing }) => {
    const navigate = useNavigate();
    const [ThemeMode, setTheme] = useTheme();
    const [isactive, setIsActive] = useState(false);
	const [prevImgFile, setPrevImgFile] = useState();
	const [imgFile, setImgFile] = useState(null);
    const [text, setText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [modalText, setModalText] = useState("");
	const { isLoggedIn, profilePic, setProfilePic, nickname, follower, following, statMsg, setStatMsg } = useContext(UserContext);

    const handleChangeProfile = () => {
        setIsActive(!isactive);
        setText("");
		setPrevImgFile("");
		setImgFile(null);
    }

	const handlePreImgFile = (e) => {
		setImgFile(e.target.files[0]);
		const reader = new FileReader();
		reader.onload = (e) => {
			setPrevImgFile(e.target.result);
		}
		reader.readAsDataURL(e.target.files[0]);
	}

	const updatePorfile = async() => {
		const token = localStorage.getItem('authToken');

		if(text.length !== 0 && imgFile === null){
			const customerData = {
				statMsg : text
			};
			const response = await CustomerApi.updateStatMsg(token, customerData);
			setIsActive(false);
			setStatMsg(response.data.statMsg);
		} else if(text.length === 0 && imgFile !== null){
			const url = await imgUpload();
			const customerData = {
				profilePic : url
			};
			console.log(customerData);
			const response = await CustomerApi.updateProfilePic(token, customerData);
			setIsActive(false);
			setProfilePic(response.data.profilePic);
		}else if(text.length > 0 && imgFile !== null){
			const url = await imgUpload();
		    const customerData = {
				profilePic : url,
				statMsg : text
			};
			const response = await CustomerApi.updateStatMsgProfilePic(token, customerData);
			setIsActive(false);
			setStatMsg(response.data.statMsg);
			setProfilePic(response.data.profilePic);
		}else{
            setOpenModal(true);
            setModalText("입력된개 없습니다.");
        }
	}

	const imgUpload = async () => {
		const storageRef = storage.ref();
		const fileRef = storageRef.child(imgFile.name);
		await fileRef.put(imgFile);
		return await fileRef.getDownloadURL();
	};


    return (
        <>
            {isLoggedIn ?
                <MyPagesContainer $active={active}>
                    <div className="controlDiv">
                        <ControlButton onClick={handleChangeProfile} $isactive={isactive} />
                        <CloseButton onClick={handleActive} />
                    </div>
					<img
              			src={prevImgFile ? prevImgFile : profilePic || "/images/icon/user.png"}
              			alt="Error"
          			/>
                    <Caption $isactive={isactive}>
                        <input
                            type="file"
                            accept="image/*"
                            id="profileImg"
							onChange={handlePreImgFile}
                        />
                        <label htmlFor="profileImg">
                            <CameraButton />
                        </label>
                    </Caption>
                    <Controler $isactive={isactive}>
                        <p>{nickname}</p>
                        <div className="followDiv">
                            <p onClick={handleFollower}>Follower : {follower}</p>
                            <p onClick={handleFollowing}>Following : {following}</p>
                        </div>
                        <p>{statMsg}</p>
                        <p onClick={() => navigate("/spot")}>ToSpot</p>
                        <p onClick={() => navigate("/flow")}>ToFlow</p>
                        <p onClick={setTheme}>{ThemeMode === "dark" ? "Light Mode" : "Dark Mode"}</p>
                        <div className='changeControl'>
                            <p>닉네임 변경</p>
                            <p>비밀번호 변경</p>
                        </div>
                    </Controler>
                    <Button $isactive={isactive} onClick={updatePorfile}>저장하기</Button>
                    <TextArea
                        spellCheck="false"
                        placeholder="상태 메시지를 입력하세요"
                        $isactive={isactive}
                        onChange={(e) => setText(e.target.value)}
                        value={isactive ? undefined : ""}
                    />
                    <LoginSignUpModal
                        open={openModal}
                        children={modalText}
                        type={true}
                        confirm={()=>setOpenModal(false)}
                    />
                </MyPagesContainer>
                :
                <LogOutDiv $active={active}>
                    <Error />
                </LogOutDiv>
            }
        </>
    );
};

export default MyPages;
