import React from "react";
import Error404 from "../components/Error404/Error404";
import Footer from "../components/Footer/Footer";
import OurNav from "../components/NavBar/OurNav";

const ErrorPage = () => {
  return (
    <>
      <OurNav />
      <Error404 />
      <Footer/>
    </>
  );
};
export default ErrorPage;
