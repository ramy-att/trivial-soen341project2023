import React from "react";
import { Route, withRouter } from "react-router-dom";
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
      {window.location.pathname != "/" && <OurNav type="student" />}
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      {window.location.pathname != "/" && <Footer />}
    </div>
  );
};

export default App;
