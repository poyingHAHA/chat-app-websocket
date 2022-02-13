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

  // Omitting the eent from the server to the client.
  // count is going to be available from the callback function on the client.
  socket.emit('countUpdated', count)

  socket.on('increment', () => {
    count+=1
    // when using emit, we're emitting the event to a particular connection.
    // socket.emit('countUpdated', count)
    // io.emit is going to omit the event to every single connection that's currently available
    io.emit('countUpdated', count)
  })
})


server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
