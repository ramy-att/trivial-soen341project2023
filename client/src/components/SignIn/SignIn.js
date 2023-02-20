import React from "react";
import "./SignIn.css";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hoverEmail, setHoverEmail] = useState(false);
  const [hoverPass, setHoverPass] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault(); //That so we don't lose our state
    console.log(email, pass);
  };

  return (
    <div className="form-login">
      <h1 className="text-center">Jobify</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container ic1">
          <div>
            {hoverEmail && (
              <label htmlFor="email" className="label">
                Email Address
              </label>
            )}
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={!hoverEmail ? "Email Address" : ""}
            id="email"
            onFocus={() => {
              setHoverEmail(true);
            }}
            onBlur={() => {
              setHoverEmail(false);
            }}
            name="email"
          />
        </div>{" "}
        {/* For email address */}
        <div className="input-container ic2">
          <div>{hoverPass && <label htmlFor="password"> Password </label>}</div>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder={!hoverPass ? "Password" : ""}
            id="password"
            onFocus={() => {
              setHoverPass(true);
            }}
            onBlur={() => {
              setHoverPass(false);
            }}
            name="password"
          />
        </div>
        <div className="text-center">
          <button className="submit-login" type="submit">
            Sign In
          </button>
        </div>
        <div className="sign-up-instead">
          <a href="SignUp">Don't have an account ? Sign Up</a>
          {/*Need to be changed and redirected to the landing page where they specify if epmloyer or student*/}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
