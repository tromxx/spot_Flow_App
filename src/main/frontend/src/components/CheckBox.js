import React, {  useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  
`;
const Checkbox = ({key, id, itemHandler}) => {
  const [checked, setChecked] = useState(false);
  
  const checkHandler = ({target}) => {
    setChecked(!checked);
    itemHandler(id, target.checked);
  }
    return(
      <Container>
        <div className="check" style={{zIndex: 2}}>
          <input 
            style={{borderRadius:"30px"}}
            type="checkbox" 
            id={"check1"} 
            className="checkboxes" 
            checked={checked} 
            onChange={(e) => checkHandler(e)}
          />
          <label htmlFor="check1"></label>
        </div>
      </Container>
    );
};
export default Checkbox;