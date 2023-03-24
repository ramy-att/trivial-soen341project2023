import React from "react";
import Application from "../components/Application/Application";
import { useContext } from "react";
import { UserContext } from "../App";
import OurNav from "../components/NavBar/OurNav";
import Footer from "../components/Footer/Footer";

const ApplicationsPage = () => {
  const userInfo = useContext(UserContext);
  const application =
    userInfo && userInfo.type === "student" ? (
      <Application />
    ) : null;
  return (
    <>
      <OurNav />
      {application}
      <Footer />
    </>
  );
};
export default ApplicationsPage;
