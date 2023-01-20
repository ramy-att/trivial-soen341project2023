import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <div className="App">
      <Route path="/welcome">
        <HomePage />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
    </div>
  );
};

export default App;
