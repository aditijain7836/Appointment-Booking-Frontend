import React, { useState } from "react";
import axios from "axios";

function Register () {
    const [password, setPasswordValue] = useState("");
    const [email, setEmailValue] = useState(""); 
    const [name, setNameValue] = useState("");
    const [phoneNo, setPhoneValue] = useState("");
    const [role, setRoleValue] = useState("");

    const setName = (e) => {
        setNameValue(e.target.value);
    }

    const setPhone = (e) => {
        setPhoneValue(e.target.value);
    }

    const setPassword = (e) => {
        setPasswordValue(e.target.value);
    }

    const setEmail = (e) => {
        setEmailValue(e.target.value);
    }

    const setRole = (e) => {
        setRoleValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                <br/>
                <br/>
                <label>Phone no:</label>
                <input type="tel" placeholder="Enter your phone no." value={phoneNo} onChange={setPhone}/>
                <br/>
                <br/>
                <label>Password:</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={setPassword}/>
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