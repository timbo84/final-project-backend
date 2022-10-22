import React from 'react';
import { Route, BrowserRouter, Routes,} from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MessageList from './components/MessageList'
import { MessageProvider } from './contexts/MessageProvider';
import { UserProvider } from './contexts/UserProvider';
import NewMessage from './components/NewMessage';
import EditMessage from './components/EditMessage';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import ViewMessages from './components/ViewMessages'

function App() {
  return (
    <UserProvider>
    <MessageProvider>
            <BrowserRouter>
                <Routes>
                    <Route  path="/" element={ <Home /> }>
                     <Route index element={<Welcome />} />
                     <Route path="/profile/:userId" element={<Profile />}>
                     <Route path="/profile/:userId" element={<ViewMessages />} />
                     <Route path=":userId/edit" element={ <SignUp /> } />
                     </Route>
                     <Route path="login" element={ <SignIn /> } />
                     <Route path="signup" element={ <SignUp /> }>
                     

                     </Route>
                     <Route path="message" element={ <MessageList /> } />
                     <Route path="message/new" element={ <NewMessage /> } />
                     <Route path="message/:messageId" element={ <EditMessage />} />
                     </Route>      
                </Routes>
            </BrowserRouter>
    </MessageProvider>
    </UserProvider>
  );
}

export default App;

