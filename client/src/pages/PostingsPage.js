import React from "react";
import StudentPostings from "../components/Postings/StudentPostings";
import EmployerPostings from "../components/Postings/EmployerPostings";
import { useContext } from "react";
import { UserContext } from "../App";
import OurNav from "../components/NavBar/OurNav";
import Footer from "../components/Footer/Footer";

const PostingsPage = () => {
  const userInfo = useContext(UserContext);
  const posting =
    userInfo && userInfo.type === "employer" ? (
      <EmployerPostings />
    ) : userInfo && userInfo.type === "student" ? (
      <StudentPostings />
    ) : null;
  return (
    <>
      <OurNav />
      {posting}
      <Footer />
    </>
  );
};
export default PostingsPage;
