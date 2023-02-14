import React, { useState } from "react";

export const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompName] = useState("");
  const [signUpClient, setSignUpClient] = useState("");
  /* So here the one above we need to recive if the user clicked on student or employer when they are signning up
  by onClick take it and save it in the signUpClient. Then we will use this to detrmine which one we display*/

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, pass, name, companyName);
  };

  return (
    <div className="form-login">
      <h2>Jobify</h2>
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
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
export default SignUp;
