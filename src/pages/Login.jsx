import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Login () {
    const [password, setPasswordValue] = useState("");
    const [username, setUsernameValue] = useState(""); 

    const cookies = new Cookies();

    const navigate = useNavigate();

    const setPassword = (e) => {
        setPasswordValue(e.target.value);
    }

    const setUsername = (e) => {
        setUsernameValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit!!" + username + ',' + password);
    
        const data = {
            "email": username,
            "password": password
        }

        try{
            const response = await axios.post("http://localhost:8080/auth/login", data);

            if(response.data == false)
            {
                alert("Invalid User Id or Password");
            }
            else
            {
                const token = response.data.token;
                cookies.set("token", token);
                alert("Login Successful");
                navigate("/users");
            }
        }

        catch(error){
            console.log(error);
        }
    }

    const RedirectToRegister = () => {
        window.location.href = "/register";
    }

    return (
        <>
        <h1>Login</h1>
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="email" placeholder="Enter your username" value={username} onChange={setUsername}/>
                <br/>
                <br/>
                <label>Password:</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={setPassword}/>
                <br/>
                <br/>
                
                <a onClick={RedirectToRegister}>Don't have an account?</a>
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    );
}

export default Login;