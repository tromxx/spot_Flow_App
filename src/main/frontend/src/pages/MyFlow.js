import React, { useEffect, useState } from "react";
import { styled } from 'styled-components';
import { useNavigate } from "react-router-dom";
import { BiCurrentLocation } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlinePlus , AiFillDelete, AiOutlineCamera} from "react-icons/ai";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { SlPicture, SlLocationPin } from "react-icons/sl"
import { BsCheckCircle } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";
import { Map } from "react-kakao-maps-sdk";
import "../components/Flowcss.css"
import FlowModal from "../utils/FlowModal";
import Modal from '../utils/Modal';
import useCurrentLocation from "../utils/Location";
import { storage } from "../api/FirebaseApi";
import MyFlowApi from "../api/MyFlowApi";
import MyFlowContainer from "../components/MyFlowContainer"
import LocationModal from "../utils/LocationModal";
import { useTheme } from "styled-components";
import { TfiArrowLeft } from "react-icons/tfi";
import { UserContext } from "../context/UserStore";
import { useContext } from "react";
import ErrorPage from "../components/Common/Error";

export const MyFlowWrapper = styled.div`

 	display: flex;
  justify-content: center;
  align-items: center;
	text-align: center;
	background-color: ${props=>props.theme.bgColor};
	
`;


export const MyFlowDiv = styled.div`
	background-color: ${props=>props.theme.bgColor};
  color: ${props=>props.theme.textColor};
  /* border: ${props=>props.theme.borderColor};	 */
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	width: 60%;
	margin-top: 100px;
  height: 93vh;
	min-height: 93vh;
  display: flex;
  align-items: center;
	text-align: center;
	flex-direction: column;
	position: relative;

	 .controlDiv{
	  	position: absolute;
		top : 2px
	  }
		.flowArea {
        background-color:transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        outline: none;
        width: 95%;
        height:80%;
        resize: none;
        border: none;
				border-bottom: 1px solid #999999;
        border-top: 1px solid #999999;
        font-family: var(--kfont);
        color: ${props=>props.theme.textColor};

			@media(max-width: 768px) {
    		width: 95%;
    		height: 80%;
  		}
		}
`;


export const FileBox = styled.div`  
	float: left;

	.fileSelect {
		width: auto;
		height: 50px;
		border: 1px solid black;
	}
	.thumbnail {
		margin-left: 10px;
    width: 15%;
    height: 15%;
    object-fit: contain;
	}
	.filebox {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
	}
	.filebox .upload-name {
    display: inline-block;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 78%;
    color: #999999;
	}
	.filebox label {
    display: inline-block;
    color: #fff;
    cursor: pointer;
    height: 30px;
		width: 30px;
    margin-left: 10px;
		font-family: var(--kfont);
		font-size: 12px;
	}
	.filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
	}
`;

const MyFlowMenuName = styled.div`
	display: flex;
	justify-content: flex-start;
	font-family: var(--efont);
	width: 100%;
	font-size: 30px;
	font-weight: bolder;
	margin-top: 5%;
	position: relative;
	
	.title {
		position: absolute;
		left: 0px;
		font-size: 35px;
		margin-left: 10%;
	}
`;



const CreateBtn = styled.div`
    border-radius: 8px;
		/* border: 1px solid #d9d9d9; */
    width: 35px;
    height: 35px;
    color: white;
    margin-right: 10%;
		align-self: flex-end;
		margin-top: -10%;
		position: absolute;
		right: 0px;
    &:hover{
        background-color: white;
        border: 1px solid silver;
    }
    ${(props) => props.isClicked && 
        `background-color: black; `
    }
`

const FlowDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start; 
	align-items: center;
	margin-top: 30px;
	width: 100%;
	height: 60vh;
	gap: 5px; 
	overflow-y: scroll; 
	
	
`;

const ScrollBar = styled.div`
	width: 100%;
	height: 60vh;
	margin-top: -20px;
	::-webkit-scrollbar {
    width: 8px;  /* 스크롤바의 너비 */
		
	}

	::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: #d9d9d9; /* 스크롤바의 색상 */
    border-radius: 10px;
		transition: 0.2s ease;
	}

	::-webkit-scrollbar-thumb:hover {
    background-color: grey;
  }
	padding-right: 5px;
`;

const MenuBar = styled.div`
	
	width: 82%;
	height: 30px;
	margin-top: 20px;
	border-radius: 8px;
	background-color: transparent;
	/* ${props => props.theme.textColor === 'black' ? '#d6d6d6' : '#423F3E'}; */
	position: relative;
`;

// Sort

const SortButton = styled.button`
	position: absolute;
	width: 30px;
	height: 30px;
	right: 0px;
	top: 0px;
	border: none;
	background-color: transparent;
	&:hover {
		cursor: pointer;
	}
`;

const SortAz = styled(CgSortAz)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 30px;
	height: 30px;
	left: -1px;
	top: -1.5px;
`;

const SortZa = styled(CgSortZa)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 30px;
	height: 30px;
	left: -1px;
	top: -1.5px;
`;


// Search
const SearchImg = styled(AiOutlineSearch)`
	position: absolute;
	width: 25px;
	height: 25px;
	top: 2px;
	left: 138px;
	border: none;
	color: ${props=>props.theme.divColor};
`;

const SearchBarInput = styled.input`
	position: absolute;
	top: 2px;
	left: 2px;
	width: 160px;
	height: 75%;
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	background-color: ${props => props.theme.borderColor === '1px solid #424242' ? '#d9d9d9' : 'white'};
	outline: none;
	
`;




// Check



const PictureImg = styled(SlPicture)`
	width: 30px;
	height: 30px;
	color: ${props=>props.theme.textColor};
`;



const DeleteImg = styled(AiFillDelete)`
	width: 30px;
	height: 25px;
	margin-bottom: 2px;
	margin-left: 1px;
`;

const DeleteButton = styled.button`
	color: ${props => props.theme.textColor};	
	position: absolute;
	width: 30px;
	right: 70px;
	height: 30px;
	top: 0px;
	border: none;
	background-color: transparent;
	transition: 0.6s ease;
	&:hover {
		cursor: pointer;
	}
`;

const MenuButtonWrapper = styled.div`

`;

const CreateBtn2 = styled.div`

  display: flex;
  justify-content:center;
  align-items:center; 
  border: 1px solid white;
  border-radius: 8px;
  width: 35px;
  height: 35px;
  color: black;
  background-color: ${(props) => props.theme.timeLineBgColor};
  background-color: white;
  margin: 10px;
	margin-left: 15px;

  &:hover {
    background-color: white;
    border: 1px solid silver;
  }

  ${(props) => props.isClicked &&
          `background-color: black; `
  }
`

const CheckButton = styled.button`
	color: ${props => props.theme.textColor};	
	position: absolute;
	width: 30px;
	right: 30px;
	top: 0px;
	height: 30px;
	border: none;
	background-color: transparent;
	align-self: flex-end;
	&:hover {
		cursor: pointer;
	}
`;

const CheckImg = styled(BsCheckCircle)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 20px;
	height: 20px;
	left: 3px;
	top: 4px;	
`;


const MyFlow = () =>{
	const navigate = useNavigate();
	const theme = useTheme();
	const [data, setData] = useState(); // 가져온 JSON 플로우 데이터를 저장
	const [sortedFlow, setSortedFlow] = useState(data); // 플로우 데이터 정렬
	const [checkedIds, setCheckedIds] = useState({});
	const { isLoggedIn } = useContext(UserContext);

	 // 마운트 되었을 때 JSON 데이터를 가져오는 비동기 함수
	 useEffect(() => {
		const token = localStorage.getItem('authToken');
		console.log(token);
		console.log("useEffect 실행");
	
		const fetchData = async () => {
			try {
				const response = await MyFlowApi.getmyFlow(token);
				setData(response.data);
				setSortedFlow(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		
		fetchData(); // fetchData 함수 호출
	}, [setCheckedIds]);

	
		// 들어온 플로우 데이터값을 정렬
	const handleSort = () => { 
    setSort((prevSort) => (prevSort === "az" ? "za" : "az"));
		if (sort === "az") {
			const sorted = [...data].sort((a, b) => a.id - b.id);
			setSortedFlow(sorted);
		} else {
			const sorted = [...data].sort((a, b) => b.id - a.id);
			setSortedFlow(sorted);
		}
  };

	// 플로우 검색 기능 구현
	const handleSearch = (searchQuery) => {
			const filteredFlow = data.filter(
				(item) =>
					(item.content && item.content.includes(searchQuery)) ||
					(item.location && item.location.includes(searchQuery))
			);
			setSortedFlow(filteredFlow);
		};
	

	const handleSearchChange = (e) => {
		const { value } = e.target;
		setSearchValue(value);
		if (value === "") {
			setSortedFlow(data);
		} else {
			handleSearch(value);
		}
  };


	const [sort, setSort] = useState("az"); // 정렬 아이콘 상태 
	const [searchValue, setSearchValue] = useState(""); // 검색창 인풋창 밸류
	

	// 글쓰기 모달 & 알림 모달
	const [flowModalOpen, setFlowModalOpen] = useState(false);
	const [flowModalText, setFlowModalText] = useState("");
	const [place, setPlace] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalText] = useState(
		<>
			작성된 내용은 저장되지 않습니다. <br />
			정말 닫으시겠습니까?
		</>
	);

	// 유저 위치 찾기
	const [locationModalOpen, setLocationModalOpen] = useState(false);
	const { location, getCurrentLocation } = useCurrentLocation();
	const [locationValue, setLocationValue] = useState("");
	const [state, setState] = useState({
		// 지도의 초기 위치
		center: { lat: 37.497931, lng: 127.027838 },
		// 지도 위치 변경시 panto를 이용할지에 대해서 정의
		isPanto: false,
	  })
		
	const handleLocationModal = () => {
		setLocationModalOpen(!locationModalOpen);
	}

	const locationConfirm = () => {
		setLocationValue(place);
		setLocationModalOpen(false);
	}

	const openFlowModal = () => {
		setFlowModalOpen(true);
	}

	const closeFlowModal = () => {
		setModalOpen(true);
	}

	const closeModal = () => {
		setModalOpen(false);
	}

	const closeBoth = () => {
		setModalOpen(false); 
		setFlowModalOpen(false);
		setThumbnailSrc("");
		setFlowModalText("");
		setPlace("");
	}

	  // 플로우 작성시 이미지 파일 선택하는 핸들링

		const [file, setFile] = useState(null);
  	const [uploadedUrl, setUploadedUrl] = useState('');
	
		const handleUpload = () => {
			// 파일이 있는지 확인
			if (file) {
				// 이미지 파이어베이스 업로드
				const storageRef = storage.ref();
				const fileRef = storageRef.child(file.name);
		
				fileRef.put(file).then(() => {
					console.log('File uploaded successfully!');
					fileRef.getDownloadURL().then((url) => {
						console.log("저장경로 확인 : " + url);
						setUploadedUrl(url);
						setSortedFlow("");
					});
				});
			} else {
				console.log('파일이 없습니다.');
				
			}
		};
		
		useEffect(() => {
			if (uploadedUrl) {
				continueToDB();
			}
		}, [uploadedUrl]);

		// 글 DB에 올리는 부분 구현
		const continueToDB = async () => {
				const response = await MyFlowApi.newFlow(flowModalText, uploadedUrl, place)
				console.log("데이터 확인" + response.data);
				setData(response.data);
				setSortedFlow(response.data);
			setPlace("");
			setFlowModalText("");
			setThumbnailSrc("");
			setFlowModalOpen(false);
			setLocationValue("");
		};

		

	// 플로우 작성 시 이미지 추가 및 추가시 썸네일

  const [thumbnailSrc, setThumbnailSrc] = useState("");
  
	const handleFileInputChange = (e) => {
	  const file = e.target.files[0];
		setFile(e.target.files[0]);
	  if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
  
		reader.onload = (e) => {
		  setThumbnailSrc(e.target.result);
		};
  
		reader.readAsDataURL(file);
	  } else {
		setThumbnailSrc("");
	  }
	};

	const textLimit = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 90) {
      setFlowModalText(inputText);
    }
  };

	const goToFlow =()=> {
		navigate("/flow");
	}

			//flowModal의 체크박스 관리 툴
			const [isVisible, setIsVisible] = useState(false);
			const handleVisible = () => {
				setIsVisible(!isVisible);
			}
			
		
		const handleCheckboxCheck = (id) => {
			setCheckedIds((prevCheckedIds) => {
				if (prevCheckedIds[id]) {
					const updatedIds = { ...prevCheckedIds };
					delete updatedIds[id];
					return updatedIds;
				} else {
					return { ...prevCheckedIds, [id]: true };
				}
			});
		};
		
		
		
		const deleteRequest = async () => {
			try {
				const idsToDelete = Object.keys(checkedIds);
				const data = {
					id: idsToDelete
				}
				console.log(data);
				await MyFlowApi.deleteFlow(data);
				setCheckedIds({});
				const token = localStorage.getItem("authToken")
				const response = await MyFlowApi.getmyFlow(token);
				setData(response.data);
				setSortedFlow(response.data);
					
				
			} catch (error) {
				console.log(error);
			}
		}

    return(
		
			<MyFlowWrapper>
				{isLoggedIn ?
			<MyFlowDiv>
				<MyFlowMenuName>
				<CreateBtn2 onClick={goToFlow}>
					<TfiArrowLeft style={{fontSize: "20px"}}/>
				</CreateBtn2>
				
				<div className="title">
  				my<span style={{ color: '#00B4D8' }}>F</span>low
				</div>

					<CreateBtn onClick={openFlowModal}>
					<AiOutlinePlus style={{ color: 'grey' }}></AiOutlinePlus>
				</CreateBtn>
				</MyFlowMenuName>
				
				<MenuBar>
				<SearchBarInput type="text" className="nicknameInput" value={searchValue} onChange={handleSearchChange}  />
					<MenuButtonWrapper>
						<SearchImg />
						{isVisible && <DeleteButton onClick={deleteRequest} >
							<DeleteImg />
						</DeleteButton>}
						<SearchImg />
						<CheckButton onClick={handleVisible}>
							<CheckImg />
						</CheckButton>
						<SortButton onClick={handleSort}>
							{sort === "az" ? <SortAz /> : <SortZa />}
						</SortButton>
					</MenuButtonWrapper>	
				</MenuBar>
				<ScrollBar >
          <FlowDiv>
					{sortedFlow && sortedFlow.map((sortedFlow) => (
              <MyFlowContainer
								className="myFlowContainer"
                key={sortedFlow.id}
								id={sortedFlow.id}
                img={sortedFlow.img}
                time={new Date(sortedFlow.date).toLocaleTimeString([], { timeStyle: 'medium' })}
                content={sortedFlow.content}
                isVisible={isVisible}
								onCheck={handleCheckboxCheck}
								location={sortedFlow.location}
								isDelete={sortedFlow.isDelete}
								date={new Date(sortedFlow.date).toLocaleDateString([], {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								}
								
								)}
								
              />
            ))}
          </FlowDiv>
        </ScrollBar>
				<LocationModal 
					open={locationModalOpen}
					close={handleLocationModal}
					type="y"
					confirm={locationConfirm}
				 	header="Flow">
			
					<div className="placeDiv" style={{
							position:"absolute",
							top:"45px",
							left:"30px",
							zIndex:"9999999"
									}}>
						<label htmlFor="location" className="locationPin"><SlLocationPin /></label>
						<input type="text" value={place} onChange={(e) => setPlace(e.target.value)} id="location" placeholder="장소를 입력해주세요" 
						style={{
							backgroundColor: "transparent",
        			outline: "none",
        			color: `${props=>props.theme.textColor}`,
        			border: "none"
						}}
						/>
					</div>
					<Map className="map" // 지도를 표시할 Container 
									center={state.center}
									isPanto={state.isPanto}
									style={{
									// 지도의 크기
									width: "90%",
									height: "75%",
									position:"absolute",
        					alignSelf: "center",
        					justifyContent: "center",
									}}
									level={3} // 지도의 확대 레벨
								>
									<div
									style={{
										display: "flex",
										gap: "10px",
									}}
									>
									<button className="locationButton" style={{
										width: "35px",
										height: "35px",
										alignItems: "center",
										justifyContent: "center",
										border: "none",
										borderRadius: "100px",
										backgroundColor: "#d9d9d9",
										position:"absolute",
										right:"40px",
										bottom:"70px",
										zIndex:"9999"
									}}
									onClick={() => { 
										getCurrentLocation();
										setState(
											{
												center: { lat: location.latitude, lng: location.longitude },
												isPanto: true,
											},
											
										);
									}}
									>
										<BiCurrentLocation style={{
											position:"absolute",
											top:"0",
											left:"0",
											color: "black",
											width: "35px",
											height: "35px",
											alignSelf: "center",
											justifyContent: "center",
											border: "none",
											backgroundColor: "transparent"
									}} />
									</button>
									</div>
								</Map>
								    <>
    </>
		
		</LocationModal>
		<FlowModal
        open={flowModalOpen}
        close={closeFlowModal}
        header={<div className="title">
				<span style={{ color: '#00B4D8' }}>F</span>low
				</div>}
        type="y"
				confirm={handleUpload}
      	>
        <textarea className="flowArea" placeholder="나의 플로우를 공유해 보세요(90자 이내)"
          value={flowModalText}
          onChange={textLimit}
        />
				<p className="textLength">{flowModalText.length}/90</p>
				<div className="wrapper">
					<FileBox className="filebox">
						<div className="filebox">
								<label htmlFor="file"><AiOutlineCamera style={
									{ width: "25px",
										height: "25px",
										color: theme.textColor}} />
								</label> 
								<input type="file" onChange={handleFileInputChange} className="fileSelect" id="file"/>
								{thumbnailSrc !== "" && (
										<img id="thumbnail" src={thumbnailSrc} alt="" className="thumbnail" />
								)}	
						</div>
					</FileBox>
					<div className="locationDiv">
						<label htmlFor="locationBtn" className="locationPin"><SlLocationPin /></label>
						<input type="text" value={locationValue} readOnly onClick={handleLocationModal} placeholder="위치 설정하기" className="locationInputBtn" id="locationBtn" />
					</div>
				</div>
    </FlowModal>
		
		<Modal open={modalOpen} close={closeModal} header="SpotFlow" type={"type"} confirm={closeBoth}>{modalText}</Modal>
	</MyFlowDiv>
	:
	<ErrorPage />}
	</MyFlowWrapper>
	
    );
		
};

export default MyFlow;