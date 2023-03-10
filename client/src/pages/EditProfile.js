import React from "react";
import EditPage from "../components/EditPage/EditPage";
import Footer from "../components/Footer/Footer";
import OurNav from "../components/NavBar/OurNav";

export default function Editprofile() {
  return (
    <>
      <OurNav />
      <EditPage type="student" />;
      <Footer />
    </>
  );
}
