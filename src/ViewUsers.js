import axios from "axios";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function ViewUsers(){

    const cookies = new Cookies();

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const fetchAllUsers = async () => {

        const token = cookies.get("token");
        const baseUrl = "http://localhost:8080/getUsers";

        try {
            const response = await axios.get(baseUrl, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(response.data);

            if(Array.isArray(response.data)){
                setUsers(response.data);
            }
            else{
                console.log("Not a valid format");
            }
        }

        catch(error)
        {
            console.log(error);
            navigate("/login");
        }

    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    return(
        <>
            <h1>This is all users in our system</h1>

            <div>
                {users.length > 0 ? (
                    <ul>
                        {users.map((user) => (
                            <>
                                <li key = {user.id}>
                                    Name: {user.name}, Email: {user.email}
                                </li>
                            </>
                        ))}
                    </ul>
                ):(
                    <p> no record found </p>
                )}
            </div>
        </>
    )
}

export default ViewUsers;