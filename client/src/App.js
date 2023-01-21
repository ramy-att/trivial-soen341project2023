import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import OurNav from "./components/NavBar/OurNav";
import Footer from "./components/Footer/Footer";

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
      <OurNav type="student" />
      <Route path="/welcome">
        <HomePage />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Footer />
    </div>
  );
};

export default App;
