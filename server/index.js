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

const PORT = process.env.PORT || 5000;

io.on('connection', (socket)=>{
  console.log('we have a new connection');

  socket.on('join', ({name,room}, callback)=> {
    console.log(name,room);
    
  })

  socket.on('disconnect', ()=>{
    console.log("user has left");
  })

})

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
})

