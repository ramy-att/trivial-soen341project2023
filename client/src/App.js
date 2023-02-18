import React from "react";
import OurNav from "./components/NavBar/OurNav";
import Footer from "./components/Footer/Footer";
import Student from "./components/Students/Student";
import Employer from "./components/Employer/EditPage";

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
