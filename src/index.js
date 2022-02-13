const path = require("path");
const express = require("express");
const http = require('http')
const socketio = require('socket.io')

const app = express();
// The express library does this behind the scenes anyways, 
// so we're not changing the behavior. we're just doing a little bot of refactoring 
const server = http.createServer(app)
// configure socketio to work with a given server and we pass to that server right here
const io = socketio(server) 

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0

// socket is an object and it contains information about that new connection.
io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.emit('message', 'Welcome')
  
  socket.on('sendMessage', (message) => {
    io.emit('message', message)
  })
})


server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
