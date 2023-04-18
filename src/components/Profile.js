import { useParams, Outlet, Link} from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from 'react'
import { Stack } from "react-bootstrap";


function User() {
    let params = useParams()
    let [user, setUser] = useState ({
        userId: parseInt(params.userId),
        username: "",
        email: "",
        firstName:"",
        lastName:"",
        city:"",
        state:"",
        age: 0,
    })
    
    
    let { username, email, firstName, lastName, city, state, age } = user
    let { getUser } = useContext(UserContext)
    
    useEffect(() => {
        async function fetch() {
            await getUser(params.userId)
                .then((user) => setUser(user))
        }
        fetch()
    }, [params.userId,getUser])

        return (
            
            <>
            <Stack>
                <h1>User Profile: {username}</h1>
                <br/>
                <p class="profilePage">Name: {firstName} {lastName}</p>
                <br/>
                <p class="profilePage">Location: {city}, {state} </p>
                <br/>
                <p class="profilePage">Contact Me: {email}</p>
                <br/>
                <p class="profilePage">Age: {age}</p>
                <br/><br/><br/>
                <Link to=":userId/edit" className="updateLink">Update Profile</Link>
                <Outlet />
                </Stack>
            </>
        )
    }


export default User