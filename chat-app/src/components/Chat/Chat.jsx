import React ,{useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client'

let socket;

const Chat = ({location}) => {

  const [name, setName]=useState('');
  const [room, setRoom] = useState('');

  const [searchParams] = useSearchParams();

  const ENDPOINT ='localhost:5000';

  useEffect(()=>{
    const {name,room} = Object.fromEntries([...searchParams])
  

    socket=io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join',{name,room},({error})=>{

    });

    return ()=>{
      socket.emit('disconnect');

      socket.off();
    }
   
  },[ENDPOINT,searchParams]);

  return (
    <div>Chat</div>
  )
}

export default Chat