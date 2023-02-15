import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
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
      {window.location.pathname !== "/" &&
        window.location.pathname !== "/signin" && <OurNav type="student" />}
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/signin">
        <SignInPage />
      </Route>
      <Route exact path="/signup">
        <SignUpPage />
      </Route>

      {window.location.pathname !== "/" &&
        window.location.pathname !== "/signin" && <Footer />}
    </div>
  );
};

export default App;
