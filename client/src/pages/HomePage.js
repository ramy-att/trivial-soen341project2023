import React from "react";
import Footer from "../components/Footer/Footer";
import Landing from "../components/Landing/Landing";
import OurNav from "../components/NavBar/OurNav";
import { useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const userInfo = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userInfo !== "nonAuth") {
      history.push("/job-postings");
    }
  }, []);
  return <Landing />;
};

export default HomePage;
