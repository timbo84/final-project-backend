import { useParams, useNavigate, Outlet, Link} from "react-router-dom";
import { useContext, useState, useEffect } from 'react'
import MessageContext from "../contexts/MessageContext";
import { Stack } from "react-bootstrap";


function UserMesssage() {
    let params = useParams()
    let [Message, setMessage] = useState([])
    let { getUserMessage, deleteMessage } = useContext(MessageContext);
    let navigate = useNavigate()
   
    useEffect(() => {
        async function fetch() {
            await getUserMessage(params.userId)
                .then((Message)=> setMessage(Message));
                console.log(Message)
        }
        fetch();
    }, [params.userId, getUserMessage]);

    function handleDeleteMessage(id) {
        deleteMessage(id).then(() => {
            
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
       
    }

function userMessage() {
   return Message.map((m) =>
        <div class= "message" key={m.messageId}>
            <p>{m.message}</p>
            <Link to={`/message/${m.messageId}`}>Edit message</Link>
                <br/>
            <button onClick={handleDeleteMessage.bind(this, m.messageId)}>Delete</button>
         </div>
     )}

return (
    <>
        <h1>Messages</h1>
        <Stack>
            {userMessage()}
            <Outlet />
        </Stack>
    </>
)

}
export default UserMesssage