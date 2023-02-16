import React from "react";
import { Button as ReactButton } from "react-bootstrap";
import "./Button.css";
import { BoxArrowUpRight } from "react-bootstrap-icons";

const Button = (props) => {
  const {
    type = "submit" | "cancel" | "authen" | "apply",
    children,
    onClick,
  } = props;

  const getChildren = () => {
    return type === "apply" ? (
      <span className="applyButtonCont">
        {children} <BoxArrowUpRight size={15} />
      </span>
    ) : (
      children
    );
  };
  return (
    <ReactButton onClick={onClick} className={type}>
      {getChildren()}
    </ReactButton>
  );
};
export default Button;
