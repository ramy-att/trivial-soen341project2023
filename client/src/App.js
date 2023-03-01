import React from "react";
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
/**
 * TODO:
 * 1- Include Navbar and Footer on all pages
 * 2- Make sure all pages are well layed out
 * 3- Pass correct Navbar type
 * 4- Include Routes for all pages
 * */
const App = () => {
  return (
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
        <PostingsPage />
      </Route>
      <Route>
        <Route exact path="/job-postings/:id">
          <Posting />
        </Route>
      </Route>
      <Route>
        <Route exact path="/edit-profile">
          <Editprofile />
        </Route>

        <Route exact path="/edit-profile-employer">
          <EditProfileEmp />
        </Route>
      </Route>

      {window.location.pathname !== "/" &&
        window.location.pathname !== "/SignIn" && <Footer />}
    </div>
  );
};

export default App;
