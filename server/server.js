const path=require('path');
const express=require('express');
const publicPath =path.join(__dirname,'../public');
const socketIO=require('socket.io');
const http=require('http');
var app = express();


const port = process.env.PORT ||3000;
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
console.log('new user connected');
socket.emit('newMessage',{
from :'soumaya',
text:'ok',
createAt:123
});
socket.on('createMessage',(newMessage)=>{
console.log('create email',newMessage);
});
socket.on('disconnect',()=>{
console.log('user desconnected');
});
});
server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});