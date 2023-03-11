import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  return (
    <div className="error">
      <h1>Ooops!</h1>
      <p>404: Something went wrong!</p>
      <p>Make sure you don't make these types of mistakes on your CV :)</p>
      <p>
        Did you mean to <Link to="/signin">Sign In</Link>?
      </p>
    </div>
  );
};
export default Error404;
