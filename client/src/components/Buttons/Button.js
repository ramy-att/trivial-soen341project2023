import React from "react";
import {Button as ReactButton} from "react-bootstrap";
import './Button.css';

const Button = (props) => {
  const { type = "submit" | "cancel" | "authen", children, onClick } = props;
  
  return (
    <ReactButton onClick={onClick} className={type}>
      {children}
    </ReactButton>
  );
};
export default Button;