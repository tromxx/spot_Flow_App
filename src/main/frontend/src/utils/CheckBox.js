import React from "react";
import styled from "styled-components";
import Redpin from "../images/Redpin.png"

function Checkbox({ text, checked, onChange }) {
  return (
    <StyledLabel htmlFor={text}>
      <StyledInput 
			type="checkbox" 
			id={text} 
			name={text} 
			checked={checked}
			onChange={onChange}
		/>
      <StyledP>{text}</StyledP>
    </StyledLabel>
  );
}

export default Checkbox;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid var(--grey);
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    border-color: transparent;
    background-image: url(${Redpin});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-color: var(--blue);
  }
`;

const StyledP = styled.p`
  font-size: 15px !important;
  font-weight: lighter !important;
  margin-left: 20px !important;
`;
