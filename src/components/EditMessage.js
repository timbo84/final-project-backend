import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MessageContext from '../contexts/MessageContext';

const EditMessage = () => {
      let params = useParams()
    let [ UpdateMessage, setUpdateMessage ] = useState({
        id:parseInt(params.messageId),
        message: "",
        userId:0
    });

    let {updateMessage, getMessage } = useContext(MessageContext);
    let navigate = useNavigate();
    let {id, message,} = UpdateMessage

    useEffect(() => {
         if (id === undefined) return
        async function fetch() {
            await getMessage(id)
            .then((updateMessage) => setUpdateMessage(updateMessage))
        }
        fetch()
    }, [id])

    function handleChange(event) {
        setUpdateMessage((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        
        event.preventDefault();
        updateMessage(UpdateMessage).then(() => {
            navigate('/message');
            window.alert('update successful');
        }).catch(error => {
            console.log(error);
            navigate('/login');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Need to change your message?</h1>
            <span>Message  </span> 
            <input placeholder="" type="text" name="message" value={message} onChange={handleChange} />
           
            <button>UPDATE</button>
        </form>
    )
};

export default EditMessage;