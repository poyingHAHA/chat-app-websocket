// the socket.io library is provided in the index.html file
const socket = io()

socket.on('message', (message) => {
  console.log(message)
})

// When listen to form submission, we get access to that e event argument.
document.querySelector('#message-form').addEventListener('submit', (e)=>{
  e.preventDefault()

  const message = e.target.elements.message.value
  // console.log(message)

  socket.emit('sendMessage', message)
})
