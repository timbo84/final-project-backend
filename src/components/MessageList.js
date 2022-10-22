import React, { useContext } from 'react';
import MessageContext from '../contexts/MessageContext';
import {useNavigate, Link } from 'react-router-dom';
import moment from "moment";


const MessageList = () => {
    let { deleteMessage} = useContext(MessageContext)
    let navigate = useNavigate()

    
    return (
        <MessageContext.Consumer>
        
        {
            ({ message }) => {
                
                return <div>
                    <h1>MESSAGES</h1>
                    <div>
                        {message.map((m) => {
                            return (
                                <div class= "message" key={m.messageId}>
                                    <p>{m.message}</p>
                                    <p class= "info">({m.createdAt} {m.userId}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        }
        </MessageContext.Consumer>
    );
}

export default MessageList;