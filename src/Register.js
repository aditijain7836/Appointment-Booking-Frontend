import React, { useState } from "react";
import axios from "axios";

function Register () {
    const [password, setPasswordValue] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmailValue] = useState(""); 
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [name, setNameValue] = useState("");
    const [phoneNo, setPhoneValue] = useState("");
    const [phoneValid, setPhoneValid] = useState(true);
    const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
    const [role, setRoleValue] = useState("");

    const setName = (e) => {
        setNameValue(e.target.value);
    }

    const setPhone = (e) => {
        const enteredPhone = e.target.value;
        setPhoneValue(enteredPhone);
        const regex = /[0-9]/;
        let isValid = true;
        
        if(enteredPhone.length!=10)
        {
            isValid = false;
            setPhoneErrorMsg("Minimum length is 10.");
        }

        if(!regex.test(enteredPhone))
        {
            isValid = false;
            setPhoneErrorMsg("Not a valid phone no.");
        }

        setPhoneValid(isValid);
    }

    const setEmail = (e) => {
        const enteredEmail = e.target.value;
        const regex = /^[^\s@]+@(gmail\.com|yahoo\.in|outlook\.com)$/;
        const isValidEmail = regex.test(enteredEmail);
        setEmailValid(isValidEmail);        
        setEmailValue(enteredEmail);
        setEmailErrorMsg("Email must follow conventions.");
    }

    const handlePasswordChange = (e) => {
        const enteredPw = e.target.value;
        setPasswordValue(enteredPw);

        //Password validation rules
        const minLength = 8;
        const regex = {
            uppercase: /[A-Z]/,
            lowercase: /[a-z]/,
            number: /[0-9]/,
            specialChar:  /[ -/:-@[-`{-~]/
        };

        let isValid = true;
        let message = '';

        if(enteredPw.length < minLength)
        {
            isValid = false;
            message = "Password must be at least 8 characters long.";
        }
        if(!regex.uppercase.test(enteredPw))
        {
            isValid = false;
            message = "Password must contain at least one uppercase letter.";
        }
        if(!regex.lowercase.test(enteredPw))
        {
            isValid = false;
            message = "Password must contain at least one lowercase letter.";
        }
        if (!regex.number.test(enteredPw)) {
            isValid = false;
            message = "Password must contain at least one number.";
        }
        if (!regex.specialChar.test(enteredPw)) {
        isValid = false;
        message = "Password must contain at least one special character.";
        }

        setPasswordValid(isValid);
        setErrorMessage(message);
    }

    const setRole = (e) => {
        setRoleValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!passwordValid)
        {
            alert("Please enter a valid password");
            return;
        }

        if(!emailValid)
        {
            alert("Please enter a valid email ID");
            return;
        }

        if(!phoneValid)
        {
            alert("Please enter a valid phone no.");
            return;
        }

        console.log("Submit!!" + name + ',' + email + ',' + password + ',' + phoneNo);
    
        const data = {
            "name": name,
            "email": email,
            "password": password,
            "phoneNo": phoneNo,
            "role": role
        }

        try{
            const response = await axios.post("http://localhost:8080/register", data);

            if(response.data == "Success")
            {
                alert("User is registered successfully!!");
            }
            else
            {
                alert("Failed registration");
            }
        }

        catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <h1>Register</h1>
            <div className="container">
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" placeholder="Enter your name" value={name} onChange={setName}/>
                <br/>
                <br/>
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={setEmail}/>
                {!emailValid && <div style={{color: 'blue'}}>{emailErrorMsg}</div>}
                <br/>
                <br/>
                <label>Phone no:</label>
                <input type="tel" placeholder="Enter your phone no." value={phoneNo} onChange={setPhone}/>
                {!phoneValid && <div style={{color: 'blue'}}>{phoneErrorMsg}</div>}
                <br/>
                <br/>
                <label>Password:</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange}/>
                {!passwordValid && <div style={{color: 'blue'}}>{errorMessage}</div>}
                <br/>
                <br/>
                <label>Role:</label>
                <input type="text" placeholder="Enter your role" value={role} onChange={setRole}/>
                <br/>
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
        </>
    );
}

export default Register;