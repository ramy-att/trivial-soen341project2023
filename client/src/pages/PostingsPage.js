import React from "react";
import StudentPostings from "../components/Postings/StudentPostings";
import EmployerPostings from "../components/Postings/EmployerPostings";
import { useContext } from "react";
import { UserContext } from "../App";

const PostingsPage = () => {
  const userInfo = useContext(UserContext);
  if (userInfo && userInfo.type === "employer") {
    return <EmployerPostings />;
  } else if (userInfo && userInfo.type === "student") {
    return <StudentPostings />;
  }
};
export default PostingsPage;
