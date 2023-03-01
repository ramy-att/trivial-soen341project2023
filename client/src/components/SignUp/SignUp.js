import React, { useState } from "react";
import "../SignIn/SignIn.css";
import { Alert } from "react-bootstrap";

export const SignUp = (props) => {
  const { typeSignUp } = props;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompName] = useState("");
  const [SignUpError, setSignUpError] = useState("");
  const [hoverEmail, setHoverEmail] = useState(false);
  const [hoverPass, setHoverPass] = useState(false);
  const [hoverName, setHoverName] = useState(false);
  const [hoverCompany, setHoverCompany] = useState(false);

  /* So here the one above we need to recive if the user clicked on student or employer when they are signning up
  by onClick take it and save it in the signUpClient. Then we will use this to detrmine which one we display*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeSignUp === "student") {
      const url = "http://localhost:3001/students";
      const req = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: name,
          studentEmail: email,
          studentPassword: pass,
        }),
      };
      /**
       * Message from Ramy:
       * Please keep the code in the try and catch to catch errors
       * Errors should be handled and stored in state to be displayed
       * If no errors we can store the user ID in the redux storage
       */
      try {
        const response = await fetch(url, req);
        const result = await response.json();
        console.log(result);
        if (result.err) {
          setSignUpError(result.err);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (typeSignUp === "employer") {
      const url = "http://localhost:3001/employers";
      const req = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass,
          organizationName: companyName,
        }),
      };
      /**
       * Message from Ramy:
       * Please keep the code in the try and catch to catch e
       * Errors should be handled and stored in state to be d
       * If no errors we can store the user ID in the redux s
       */
      
      /**Here we are setting the signup error for the already exisiting user */
      try {
        const response = await fetch(url, req);
        const result = await response.json();
        console.log(result);
        if (result.err) {
          setSignUpError(result.err);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="form-signUp">
      {/* Need to get the value of "type" by clicking on either student or employer from landing page*/}
      {typeSignUp === "student" ? (
        <>
          {SignUpError && <Alert variant="danger">{SignUpError}</Alert>}
          <h1 className="text-center">Jobify</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container ic1">
              <div className="label-container">
                {hoverName && (
                  <label htmlFor="name" className="label">
                    Full name
                  </label>
                )}
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onInput={(e) => {
                  if (e.target.value !== "") {
                    setHoverName(true);
                  }
                }}
                type="text"
                placeholder={!hoverName ? "Full Name" : ""}
                id="name"
                onFocus={(e) => {
                  setHoverName(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setHoverName(false);
                  }
                }}
                name="name"
              />
            </div>
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
            </div>
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
              <div className="submit_form">
                <button className="submit-login" type="submit">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
          <a
            href="SignIn"
            className="link-btn"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login here.
          </a>
          {/* </div> */}
        </>
      ) : typeSignUp === "employer" ? (
        <>
          {/* <div className="form-signUp"> */}
          {SignUpError && <Alert variant="danger">{SignUpError}</Alert>}
          <h1 className="text-center">Jobify</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container ic1">
              <div className="label-container">
                {hoverName && (
                  <label htmlFor="name" className="label">
                    Full name
                  </label>
                )}
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onInput={(e) => {
                  if (e.target.value !== "") {
                    setHoverName(true);
                  }
                }}
                type="text"
                placeholder={!hoverName ? "Full Name" : ""}
                id="name"
                onFocus={() => {
                  setHoverName(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setHoverName(false);
                  }
                }}
                name="name"
              />
            </div>
            <div className="input-container ic1">
              <div className="label-container">
                {hoverCompany && (
                  <label htmlFor="companyName" className="label">
                    Company Name
                  </label>
                )}
              </div>
              <input
                value={companyName}
                onChange={(e) => setCompName(e.target.value)}
                onInput={(e) => {
                  if (e.target.value !== "") {
                    setHoverCompany(true);
                  }
                }}
                type="text"
                placeholder={!hoverCompany ? "Company Name" : ""}
                id="compnayName"
                onFocus={() => {
                  setHoverCompany(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setHoverCompany(false);
                  }
                }}
                name="companyName"
              />
            </div>

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
            </div>
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
              <div className="submit_form">
                <button className="submit-login" type="submit">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
          <div className="sign-in-instead">
            <a
              href="SignIn"
              className="link-btn"
              onClick={() => props.onFormSwitch("login")}
            >
              Already have an account? Login here.
            </a>
          </div>
          {/* </div> */}
        </>
      ) : null}
    </div>
  );
};
export default SignUp;
