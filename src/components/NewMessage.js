import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageContext from '../contexts/MessageContext';

const NewMessage = () => {
    let [ newMessage, setNewMessage ] = useState({
        message: "",
    });

    let { createMessage } = useContext(MessageContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewMessage((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        createMessage(newMessage).then(() => {
            navigate('/message');
        }).catch(error => {
            console.log(error);
            navigate('/login');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>NEW Message</h1>
            <span>MESSAGES  </span>
            <input placeholder="" type="text" name="message" value={newMessage.message} onChange={handleChange} />
            <br></br><br></br>
            <button>POST</button>
        </form>
    )
};

export default NewMessage;