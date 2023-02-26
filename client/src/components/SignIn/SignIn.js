import React from "react";
import "./SignIn.css";
import Button from "../Buttons/Button";
import { useState, useEffect } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hoverEmail, setHoverEmail] = useState(false);
  const [hoverPass, setHoverPass] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); //That so we don't lose our state
    console.log(email, pass);
    const url = "http://localhost:3001/signin";
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    };
    try {
      const response = await fetch(url, req);
      const result = await response.json();
      localStorage.setItem("token", result.token);
      const url2 = "http://localhost:3001/signin";
      const verifyReq = {
        method:"GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      };
      try {
        const response = await fetch(url2, verifyReq);
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const verify = async () => {
    const url = "http://localhost:3001/getUserInfo";
    const req = {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch(url, req);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (email !== "") {
      setHoverEmail(true);
    }
    if (pass !== "") {
      setHoverPass(true);
    }
  }, []);

  return (
    <div className="form-login">
      <h1 className="text-center">Jobify</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container ic1">
          <div className="label-container">
            {hoverEmail && (
              <label htmlFor="email" className="label">
                Email Address
              </label>
            )}
          </div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onInput={(e) => {
              if (e.target.value !== "") {
                setHoverEmail(true);
              }
            }}
            type="email"
            placeholder={!hoverEmail ? "Email Address" : ""}
            id="email"
            onFocus={() => {
              setHoverEmail(true);
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setHoverEmail(false);
              }
            }}
            name="email"
          />
        </div>{" "}
        <div className="input-container ic2">
          <div className="label-container">
            {hoverPass && (
              <label htmlFor="password" className="label">
                {" "}
                Password{" "}
              </label>
            )}
          </div>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onInput={(e) => {
              if (e.target.value !== "") {
                setHoverPass(true);
              }
            }}
            type="password"
            placeholder={!hoverPass ? "Password" : ""}
            id="password"
            onFocus={() => {
              setHoverPass(true);
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setHoverPass(false);
              }
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
