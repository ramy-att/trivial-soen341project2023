import React from "react";
import Form from "react-bootstrap/Form";
import "./SignIn.css";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //That so we don't lose our state
    console.log(email, pass);
  };
  const [currentForm, setCurrentForm] = useState("login");

  return (
    <div className="form-login">
      <h4> Jobify</h4>
      <form onSubmit={handleSubmit}>
        <div className=" input-container ic1">
          <label htmlFor="email"> Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your.email@gmail.com"
            id="email"
            name="email"
          />
        </div>
        <div className="input-container ic2">
          <label htmlFor="password"> Password </label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
          />
        </div>
        <button className="submit-login" type="submit">
          SignIn
        </button>
      </form>
    </div>
  );
};

export default SignIn;
