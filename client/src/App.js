import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPageStu from "./pages/SignUpPageStu";
import SignUpPageEmp from "./pages/SignUpPageEmp";
import PostingsPage from "./pages/PostingsPage";
import OurNav from "./components/NavBar/OurNav";
import Footer from "./components/Footer/Footer";
import Posting from "./components/Postings/Posting";
import Editprofile from "./pages/EditProfile";
import EditProfileEmp from "./pages/EditProfileEmp";
import ErrorPage from "./pages/ErrorPage";
import { useHistory } from "react-router-dom";
/**
 * TODO:
 * 1- Include Navbar and Footer on all pages
 * 2- Make sure all pages are well layed out
 * 3- Pass correct Navbar type
 * 4- Include Routes for all pages
 * */
export const UserContext = React.createContext();

const App = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState();

  console.log("Dom Dom Rakka Dom Dom"); // Leave this please - Ramy

  const verifyUser = async () => {
    const url2 = "http://localhost:3001/signin";
    const verifyReq = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch(url2, verifyReq);
      const result = await response.json();
      return { ...result };
    } catch (error) {}
  };
  const redirect = () => {
    verifyUser().then((result) => {
      const user = result.user;
      setUserInfo({ ...user });
      if (user && user.type === "student") {
        if (
          window.location.pathname === "/signup-emp" ||
          window.location.pathname === "/edit-profile-employer"
        ) {
          history.push("/job-postings");
        }
      } else if (user && user.type === "employer") {
        if (
          window.location.pathname === "/signup-stu" ||
          window.location.pathname === "/edit-profile-student"
        ) {
          history.push("/job-postings");
        }
      }
      if (
        window.location.pathname === "/signin" ||
        window.location.pathname === "/signup-emp" ||
        (window.location.pathname === "/signup-student" && user)
      ) {
        history.push("/job-postings");
      }
    });
  };
  useEffect(() => {
    redirect();
  }, [window.location.pathname]);
  return (
    <UserContext.Provider value={userInfo}>
      <div className="App">
        {window.location.pathname !== "/" &&
          window.location.pathname !== "/SignIn" && <OurNav type="student" />}
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/signin">
          <SignInPage />
        </Route>
        <Route exact path="/signup-stu">
          <SignUpPageStu />
        </Route>
        <Route exact path="/signup-emp">
          <SignUpPageEmp />
        </Route>
        <Route exact path="/job-postings">
          <PostingsPage userInfo={userInfo} />
        </Route>
        <Route>
          <Route exact path="/job-postings/:id">
            <Posting userInfo={userInfo} />
          </Route>
        </Route>
        <Route>
          <Route exact path="/edit-profile-student">
            <Editprofile />
          </Route>
          <Route exact path="/edit-profile-employer">
            <EditProfileEmp />
          </Route>
        </Route>
        {window.location.pathname !== "/" &&
          window.location.pathname !== "/SignIn" && <Footer />}
      </div>
    </UserContext.Provider>
  );
};

export default App;
