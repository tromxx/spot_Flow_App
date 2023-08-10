import React from 'react'
import styled from 'styled-components'
import { AiOutlineSearch} from "react-icons/ai";
import DiaryApi from '../../api/DiaryApi';

const Container = styled.div`
.Search-bar {
    @media (max-width: 850px) {
      & {width: 85%;}
    }
    @media (min-width: 1300px) {
      & {width: 300%;}
    }
    width: 100%;
    padding: 15px;
    padding-left: 30px;
    height: 0px;
    margin-left: 20px;
    border:1px solid ${(props) => props.theme.timeLineBgColor};
    background-color: ${(props) => props.theme.timeLineBgColor};
    border-radius:15px;

  }

  `


function DiarySearchBar({activeEnter,setSearch,setPlace}) {

  const handleSearch = async (place) => {
    const res = await DiaryApi.searchPlace(place);
    console.log(res.data);
    setSearch(res.data);
}


  return (
    <Container>
        <div style={{width: "70%", position: "relative"}}>
            <input onChange={(e)=> setPlace(e.target.value)} onKeyDown={(e)=>{activeEnter(e)}} type="text" className="Search-bar"
            /> <AiOutlineSearch style={{position: "absolute", left: "30px", bottom: "7px"}}/>
          </div>
          </Container>
  )
}

export default DiarySearchBar