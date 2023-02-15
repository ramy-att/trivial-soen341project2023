import React, { useEffect } from "react";
import { useState } from "react";
import  Form from 'react-bootstrap/Form';

import Button from "../Buttons/Button";

import { Alert } from "react-bootstrap";
export default function Employer  (){
   
   
    const [organization , setOrganiztation] = useState();  
   
    const [username , setUsername] = useState();  

    const [email , setEmail] = useState();  

    const [password, setPassword] = useState();

    const [submitted, setSubmitted] = useState(false );

    const [checks, setChecks] = useState({
    capitalLetter: false,
    lengthPassword: false,
    numbers: false
})
    
    function Validation (event){

  const {password} = event.target.value;
   const capitalLetterCheck = /[A-Z]/.test(password) 
   const numbersCheck = /[0-9]/.test(password)
   const lengthCheck = password.length>8
   
   setChecks({ capitalLetter: capitalLetterCheck,
    lengthPassword: lengthCheck,
    numbers: numbersCheck})


    }
    function handlOrganizationChange(event){
        setOrganiztation(event.target.value)

    }
    
    function  handlUsernameChange(event){
setUsername(event.target.value)
    }
    function handlEmailChange(event){
         setEmail(event.target.value)
    }
    function handleSubmission (event){

        if (checks.capitalLetter  && checks.numbers && checks.lengthPassword){
            setSubmitted(true);
    console.log("aya haga")
        }
    }
    
    return (
       <div>

         {submitted && <Alert key="sucess" variant="success" >
            <p>Kos amk</p>
         </Alert>
         }
        
        <Form onSubmit={handleSubmission}>
        <Form.Group className="email" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required placeholder="name@example.com" value ={email} onChange = {handlEmailChange}/>
        </Form.Group>
        <Form.Group className="username" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" required value ={username} onChange = {handlUsernameChange} />
        </Form.Group>
        <Form.Group className="organization" controlId="exampleForm.ControlTextarea1">
          <Form.Label>organization</Form.Label>
          <Form.Control type="text" required  value= {organization} onChange = {handlOrganizationChange} />
        </Form.Group>
        <Form.Group className="password" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required  value= {password} onChange = {Validation }  />
        </Form.Group>

        <Button type="submit" >Submit form</Button>
      </Form>
      </div>
    )


}