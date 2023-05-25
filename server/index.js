const {addUser, removeUser, getUser, getUsersInRoom } = require('./users.js') ;

const express = require('express');
const app = express();
const http = require('http');

const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const {Server} = require('socket.io');
 const io =  new Server(server,{
    cors:{}
 });


const router = require('./router');
app.use(router);

const PORT = process.env.PORT || 5000;

io.on('connect', (socket)=>{
  socket.on('join', ({name,room}, callback)=> {
      const {error, user} = addUser({id:socket.id,name,room});

      //if error occurs then return the error
      if(error) return callback(error);

      socket.join(user.room);

      socket.emit('message',{ user:'admin',text:` Welcome to the room ${user.name} :)`});

      socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined!`});

      io.to(user.room).emit('roomData',{room:user.room , users:getUsersInRoom(user.room)})

      //else join the user to the room
     

      callback();
  });

  socket.on('sendMessage',(message,callback)=>{
    const user = getUser(socket.id);
    io.to(user.room).emit('message',{user:user.name , text:message});
    io.to(user.room).emit('roomData',{room:user.room , users:getUsersInRoom(user.room)});
    callback();
  } );

  socket.on('disconnect', ()=>{
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })

});



server.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
})

