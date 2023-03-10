import React from "react";
import "./SignIn.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hoverEmail, setHoverEmail] = useState(false);
  const [hoverPass, setHoverPass] = useState(false);
  const [errorF, setError] = useState("");
  const history = useHistory();

  const verifyUser = async () => {
    const url2 = "http://localhost:3001/signin";
    const verifyReq = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch(url2, verifyReq);
      const result = await response.json();
      return { ...result };
    } catch (error) {}
  };
  const redirect = () => {
    verifyUser().then((result) => {
      const user = result.user;
      // [TO DO]: FIX REDIRECTS
      if (user && user.type === "student") {
        history.push("/");
      } else if (user && user.type === "employer") {
        history.push("/");
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //That so we don't lose our state
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
      if (result.token) {
        localStorage.setItem("token", result.token);
      } else {
        setError("Invalid Credentials");
      }
      setTimeout(() => {
        setError("");
      }, 5000);
      redirect();
    } catch (error) {
      console.log("BYEEE");
      setError("Some Error has Occured! Please try again.");
    }
  };
  useEffect(() => {
    // If logged in redirect
    if (email !== "") {
      setHoverEmail(true);
    }
    if (pass !== "") {
      setHoverPass(true);
    }
  }, []);

  return (
    <div className="form-login">
      {errorF && <Alert variant="danger">{errorF}</Alert>}
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
          <a href="/">Don't have an account ? Go back to SignUp</a>
          {/*Need to be changed and redirected to the landing page where they specify if epmloyer or student*/}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
