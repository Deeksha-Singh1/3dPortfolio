import React ,{useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';
import './Chat.css';

let socket;

const Chat = ({location}) => {

  const [name, setName]=useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [searchParams] = useSearchParams();

  const ENDPOINT ='localhost:5000';

  useEffect(()=>{
    const {name,room} = Object.fromEntries([...searchParams])
  

    socket=io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join',{name,room},()=>{
    });

    return ()=>{
      socket.emit('disconnect');

      socket.off();
    }
   
  },[ENDPOINT,searchParams]);

//for handling messages
useEffect(()=> {
  socket.on('message',(message)=>{
    setMessages(messages =>[...messages,message]);
  });
},[messages]);

//function for sending messages
const sendMessage = (event) =>{
  event.preventDefault();
  if(message){
    socket.emit('sendMessage',message, ()=> setMessage(''));
  }
}

console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
          {/* <input type="text" value={message} onChange={(event)=> setMessage(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event):null}/> */}
      </div>
    </div>
  )
}

export default Chat