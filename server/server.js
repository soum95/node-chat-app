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
	from :'admin',
	text:'welcome to the chat app',
	createAt:new Date().getTime()
});
socket.broadcast.emit('newMessage',{
	from :'admin',
	text:'new userjoined',
	createAt:new Date().getTime()});
socket.on('createMessage',(newMessage)=>{
console.log('create email',newMessage);
io.emit('newMessage',{
	from :newMessage.from,
	text:newMessage.text,
	createAt:new Date().getTime()
});
/*socket.broadcast.emit('newMessage',{
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