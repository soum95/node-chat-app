const path=require('path');
const express=require('express');
const publicPath =path.join(__dirname,'../public');
const socketIO=require('socket.io');
const http=require('http');
const {generateMessage}=require('./utiles/message');

var app = express();


const port = process.env.PORT ||3000;
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
console.log('new user connected');

socket.emit('newMessage',generateMessage('admin','welcome to the chat app'));
socket.broadcast.emit('newMessage',generateMessage('admin','welcome to the chat app'));
socket.on('createMessage',(newMessage,callback)=>{
console.log('create email',newMessage);
io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));

callback('This is from the server');/*socket.broadcast.emit('newMessage',{
	from :newMessage.from,
	text:newMessage.text,
	createAt:new Date().getTime()
});*/
});
socket.on('disconnect',()=>{
console.log('user desconnected');
});
});
server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});