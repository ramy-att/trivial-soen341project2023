import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import OurNav from "./components/NavBar/OurNav";
const App = () => {
  return (
    <div className="App">
      <OurNav>
        <Route path="/welcome">
          <HomePage />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
      </OurNav>
    </div>
  );
};

export default App;
