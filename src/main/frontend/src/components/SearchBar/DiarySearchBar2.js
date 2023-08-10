import React from 'react'
import styled from 'styled-components'
import { AiOutlineSearch} from "react-icons/ai";

const Container = styled.div`
.Search-bar {
    @media (max-width: 850px) {
      & {width: 200px;}
    }
    @media (min-width: 1300px) {
      & {width: 300%;}
    }
    width: 100%;
    padding: 15px;
    padding-left: 30px;
    height: 0px;
    border:1px solid ${(props) => props.theme.timeLineBgColor};
    background-color: ${(props) => props.theme.timeLineBgColor};
    border-radius:15px;

  }

  `
 
 const DiarySearchBar2 = () => {
    return (
      <Container>
          <div style={{width: "70%", position: "relative"}}>
              <input type="text" className="Search-bar"
              /> <AiOutlineSearch style={{position: "absolute", left: "10px", bottom: "7px"}}/>
            </div>
      </Container>
    )
  }

  export default DiarySearchBar2;