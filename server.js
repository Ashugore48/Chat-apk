// to use express we have to import it from node_modules

const express = require('express');
const cors = require("cors")

//let's make an express app out of it
const app = express();

app.use(cors());
const server = require('http').Server(app);

//this will use my index.html from client-side folder
app.use(express.static('client-side'));

//integrating server with socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        method: ['GET', 'POST']
    }.method
});

io.on('connection', (socket)=>{
    console.log('connection established', socket.id);
    socket.on('user-joined', (id)=>{
        io.emit('user-joined', socket.id);
    })

    socket.on('message', (data)=>{
        io.emit('message', data);
    })
    socket.on('disconnect', ()=>{
        console.log(`${socket.id} left the chat`);
    })
})

const PORT = 9000;
server.listen(PORT, ()=>{
    console.log(`server is running on ${PORT} this port`); 
})
