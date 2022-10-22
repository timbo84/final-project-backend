import MessageContext from '../contexts/MessageContext';

function Greeting() {
   
    return (
        <MessageContext.Consumer>
        {
            ({ message }) => {
                return <>
                    <h1 class="welcome">
                    Welcome to JUST NUGGET! 
                    <br/>
                    A place to leave a nugget of information to family and friends!
                    </h1> 
                      <div>
                        {message.map((m) => {
                            return (
                                <div class="message" key={m.messageId}>
                                    <p>{m.message}</p> 
                                    <p class="info">{m.createdAt}  {m.userId}</p> 
                                    
                                </div>)})}
                      </div>
                        </>} 
        }
        </MessageContext.Consumer>);
        }
export default Greeting