import axios from "axios";
import UserContext from "./UserContext";
import { useState } from "react";

export const UserProvider = (props) => {
    const [ user, setUser ] = useState([]);
    const baseUrl = "http://localhost:3000/api/users/";


    async function getAllUser() {
        const response = await axios.get(baseUrl);
        return setUser(response.data);
    }

    async function createUser(username, password, email, firstName, lastName, city, state, age) {       
        let user = { username, password, email, firstName, lastName, city, state, age };
        
        const response = await axios.post(baseUrl, user);
        return await new Promise(resolve => resolve(response.data));
    }

    async function loginUser(username, password) {
        let user = { username, password };

        const response = await axios.post(`${baseUrl}/login`, user);
        localStorage.setItem('myMessageToken', response.data.token);
        return await new Promise(resolve => resolve(response.data));
    }

    async function getUser(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };
        const response = await axios.get(baseUrl + id, { headers: myHeaders });
        return await new Promise(resolve => resolve(response.data));
    }

    async function updateUser(signin) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };

        const response = await axios.put(baseUrl + signin.userId, signin, { headers: myHeaders });
        return await new Promise(resolve => resolve(response.data));
    }

    return (
        <UserContext.Provider value={{
            user,
            getUser,
            getAllUser,
            createUser,
            loginUser,
            updateUser
        }}>
            { props.children }
        </UserContext.Provider>
    )
}