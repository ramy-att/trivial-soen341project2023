import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPageStu from "./pages/SignUpPageStu";
import SignUpPageEmp from "./pages/SignUpPageEmp";
import PostingsPage from "./pages/PostingsPage";
import OurNav from "./components/NavBar/OurNav";
import Footer from "./components/Footer/Footer";
import Posting from "./components/Postings/Posting";import Editprofile from "./pages/EditProfile";
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
      {window.location.pathname !== "/" && <OurNav type="student" />}
       <OurNav/>
        <Student/>
        <Footer/>
      {window.location.pathname !== "/" && <Footer />}
    </div>
  );
};

export default App;
