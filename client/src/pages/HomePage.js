import React from "react";
import Landing from "../components/Landing/Landing";
import { useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const userInfo = useContext(UserContext).userInfo;
  const history = useHistory();

  useEffect(() => {
    if (userInfo !== "nonAuth") {
      history.push("/job-postings");
    }
  }, []);
  return <Landing />;
};

export default HomePage;
