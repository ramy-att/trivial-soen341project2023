import React, { useState } from "react";
import "../SignIn/SignIn.css";

export const SignUp = (props) => {
  const { type } = props;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompName] = useState("");
  const [hoverEmail, setHoverEmail] = useState(false);
  const [hoverPass, setHoverPass] = useState(false);
  const [hoverName, setHoverName] = useState(false);
  const [hoverCompany, setHoverCompany] = useState(false);
  const [signUpClient, setSignUpClient] = useState("");
  /* So here the one above we need to recive if the user clicked on student or employer when they are signning up
  by onClick take it and save it in the signUpClient. Then we will use this to detrmine which one we display*/

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, pass, name, companyName);
  };

  return (
    <div className="form-signUp">
      {type === "student" ? (
        <>
          <h1 className="text-center">Jobify</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="user-box">
              <label htmlFor="name">Full name</label>
              <input
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="full Name"
              />
            </div>
            <div className="user-box">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
              />
            </div>
            <div className="user-box">
              <label htmlFor="password">Password</label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="********"
                id="password"
                name="password"
              />
            </div>
            <div className="submit_form">
              <button type="submit">Log In</button>
            </div>
          </form>
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login here.
          </button>
        </>
      ) : type === "employer" ? (
        <>
          <div className="form-signUp">
            <h1 className="text-center">Jobify</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container ic1">
                <div>
                  {hoverName && <label htmlFor="name">Full name</label>}
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={!hoverName && "Full Name"}
                  id="name"
                  onFocus={() => {
                    setHoverName(true);
                  }}
                  onBlur={() => {
                    setHoverName(false);
                  }}
                  name="name"
                />
              </div>
              <div className="input-container ic1">
                <div>
                  {hoverCompany && (
                    <label htmlFor="companyName">Company Name</label>
                  )}
                </div>
                <input
                  value={companyName}
                  onChange={(e) => setCompName(e.target.value)}
                  type="text"
                  placeholder={!hoverCompany && "Company Name"}
                  id="compnayName"
                  onFocus={() => {
                    setHoverCompany(true);
                  }}
                  onBlur={() => {
                    setHoverCompany(false);
                  }}
                  name="companyName"
                />
              </div>
              {/* <div className="user-box"> */}
              {/* <label htmlFor="name">Company name</label> */}
              {/* <input */}
              {/* //   value={companyName} */}
              {/* //   name="companyname" */}
              {/* //   onChange={(e) => setCompName(e.target.value)} */}
              {/* //   id="name" */}
              {/* //   placeholder="Company Name" */}
              {/* // /> */}
              {/* </div> */}

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
                  placeholder={!hoverEmail && "Email Address"}
                  id="email"
                  onFocus={() => {
                    setHoverEmail(true);
                  }}
                  onBlur={() => {
                    setHoverEmail(false);
                  }}
                  name="email"
                />
              </div>
              <div className="input-container ic2">
                <div>
                  {hoverPass && <label htmlFor="password"> Password </label>}
                </div>
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  placeholder={!hoverPass && "Password"}
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
                <div className="submit_form">
                  <button className="submit-login" type="submit">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
            <button
              className="link-btn"
              onClick={() => props.onFormSwitch("login")}
            >
              Already have an account? Login here.
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default SignUp;
