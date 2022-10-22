import axios from "axios";
import { useEffect, useState } from "react";
import MessageContext from "./MessageContext";
import moment from "moment";

export const MessageProvider = (props) => {

    const [ message, setMessage ] = useState([]);
    const baseUrl = "http://localhost:3000/api/messages/";

    useEffect(() => {
        async function fetchData() {
            await getAllMessage();
        }
        fetchData();
    }, []);

    async function getAllMessage() {
        const response = await axios.get(baseUrl);
        return setMessage(response.data);
    }
    async function getUserMessage(userId) {
        
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };
        const response = await axios.get(baseUrl + "/user/" + userId, { headers: myHeaders });
         console.log(response)
        return await new Promise(resolve => resolve(response.data));
       
    }

    async function getMessage(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };
        const response = await axios.get(baseUrl + id, { headers: myHeaders });
        return await new Promise(resolve => resolve(response.data));
    }

    async function createMessage(message) {        
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };

        const response = await axios.post(baseUrl, message, { headers: myHeaders });
        getAllMessage();
        return await new Promise(resolve => resolve(response.data));
    }

    async function updateMessage(message) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };

        const response = await axios.put(baseUrl + message.messageId, message, { headers: myHeaders });
        getAllMessage();
        return await new Promise(resolve => resolve(response.data));
    }

    async function deleteMessage(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };
        const response = await axios.delete(baseUrl + id, { headers: myHeaders });
        getAllMessage();
        return await new Promise(resolve => resolve(response.data));
    }

    return (
        <MessageContext.Provider value={{
            message,
            getMessage,
            createMessage,
            updateMessage,
            deleteMessage,
            getUserMessage
        }}>
            { props.children }
        </MessageContext.Provider>
    )
};