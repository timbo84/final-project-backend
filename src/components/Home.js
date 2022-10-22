import {Navbar, Nav, Container, Stack} from 'react-bootstrap'
import {useParams, Link, Outlet, useNavigate} from "react-router-dom"
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from 'react'



function Home() {
    let navigate = useNavigate()
     let params = useParams()
    let [ user, setUser] = useState ({
        userId: 0,
        username: "",
        password: "",
    })
    let { getUser } = useContext(UserContext)
    useEffect(() => {
        async function fetch() {
            await getUser(params.userId)
                .then((user) => setUser(user))
        }
        fetch()
    },[params.userId] )
    
     function onSignOut(){
        localStorage.clear();
         setUser("")
         navigate('/login')
    }
    function onSignIn(){
        navigate('/login')
    }

    function authLink(){
        if (user.username === "")
                    return(
                            <Nav className="justify-content-end">
                            <button variant="link" onClick={onSignIn}>Login</button>
                            </Nav>
                    )
                    else {
                        return<nav>Signed in as: {user.username} <button variant="link" onClick={onSignOut}>Log Out</button></nav>
                         
                    }}

    return (
        <>
            <Navbar sticky="top" bg="danger" variant="danger">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="https://th.bing.com/th/id/R.b237e5c944663d16a3d525eef43e8ef2?rik=L5C%2b9vHUxL1E9Q&pid=ImgRaw&r=0"
                            width="40"
                            height="40"
                            className="d-inline-block align-center"
                            alt="2022"/>{' '}
                            Just Nugget
                    </Navbar.Brand>
                    <Navbar.Text>
                      {authLink()}
                    </Navbar.Text>
                    <Nav className="justify-content-end" activeKey="/home">
                    <Link to="/" className="nav-link">Home</Link>
                        
                        <Link to="/message" className="nav-link">Messages</Link>
                        <Link to="/message/new" className="nav-link">Post</Link>
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                        <Link to={`/profile/${user.userId}`} className="nav-link">Profile</Link>
                    </Nav>
                </Container>
            </Navbar>
            <Stack gap={3} className="col-md-10 mx-auto mt-3">
                <Outlet />
            </Stack>
        </>

    )
}

export default Home