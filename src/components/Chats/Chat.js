import React,{useState,useRef,useEffect} from 'react'
import io from 'socket.io-client';
import baseUrl from '../../utils/baseUrl';
import Comment from '../Chats/Comment'
import MessageInputfield from './MessageInputField';
import getUserInfo from '../../utils/getUserInfo';
import './chat.css';
// import calculateTime from '../../utils/calculateTime'


function Chat({user,room}) {

    const [messages,setMessages ] = useState([]);
    const socket =useRef();

     /// Connection useEffect

   useEffect(() => {

    if(!socket.current) {
         socket.current = io(baseUrl);
    }

    if (socket.current) {
        console.log(user);
      socket.current.emit("join", { userId: user._id });
    }

 }, [user]);

 useEffect(()=>{
  socket.current.on('messageEveryone',async ({messageString,userId,date})=>{
         
    const {name,profilePicUrl} = await getUserInfo(userId);
    const message ={
      name,profilePicUrl,date,messageString
    }
  setMessages(prev=>[...prev,message])
;        
})
 },[]);
  
 console.log(messages);

   const sendMsg =(messageString) =>{
    if (socket.current) {
        socket.current.emit("sendNewMsg", {
          userId: user._id,
          messageString,
          date:Date.now(),
        });
      }
   }


    return (
        <div className='chat__container'>
          <div className='messages__container'>
            {messages.map(message=>(
              <Comment message={message}/>
            ))}
          </div>
            <div className='field__container'>
            <MessageInputfield sendMsg = {sendMsg}/>
            </div>
           
            
        </div>
    )
}

export default Chat
