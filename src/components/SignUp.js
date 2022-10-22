import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import {Form, Button} from 'react-bootstrap'

function SignUp ()  {
    let params = useParams()
    const [signin, setSignin] = useState({
        userId: params.userId,
        username:"",
        password:"",
        email:"",
        firstName:"",
        lastName:"",
        city:"",
        state:"",
        age:0
    });

    let { createUser, updateUser, getUser } = useContext(UserContext);
    let navigate = useNavigate();
    let {userId, username, password, email, firstName, lastName, city, state, age} = signin

    useEffect(() => {
        if (userId === undefined) return
        async function fetch() {
          await getUser(userId)
            .then((signin) => setSignin(signin))
        }
        fetch()
      }, [userId])

    function handleChange(event) {
        setSignin((preValue) => {
          return { ...preValue, [event.target.name]: event.target.value }})
      }

      function addOrUpdate() {
        if (userId === undefined) {
          return createUser(username, password, email, firstName,
             lastName, city, state, age).then(() =>
           navigate('/login'))
        } else {
          return updateUser(signin).then(() =>
          navigate(`/profile/${userId}`))
        }
      }

    function handleSubmit(event) {
        event.preventDefault();
        addOrUpdate()
         
        .catch(error => {
            console.log(error);
            window.alert('Failed registration: error creating user');
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>username</Form.Label>
        <Form.Control type="text" name="username" value={username} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>password</Form.Label>
        <Form.Control type="password" name="password" value={password} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>email</Form.Label>
        <Form.Control type="email" name="email" value={email} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>firstName</Form.Label>
        <Form.Control type="text" name="firstName" value={firstName} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>lastName</Form.Label>
        <Form.Control type="text" name="lastName" value={lastName} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>city</Form.Label>
        <Form.Control type="text" name="city" value={city} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>state</Form.Label>
        <Form.Control type="text" name="state" value={state} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>age</Form.Label>
        <Form.Control type="text" name="age" value={age} onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
)};

export default SignUp;