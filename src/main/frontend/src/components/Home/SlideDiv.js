import React from 'react';
import { CSSTransition} from 'react-transition-group';
import './SlideDiv.css'

const SlideEffect = ({ show, children }) => {
  return (
    <CSSTransition
    in={show}
    timeout={300}
    classNames="slide"
    unmountOnExit
    >
      <div className="slide-container">
        {children}
      </div>
    </CSSTransition>
  );
};

export default SlideEffect;

