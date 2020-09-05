const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    socket.on('message', ({ name, message, code }) => {
        io.emit('message', ({ name, message, code }))
    })
})

http.listen(4000, function () {
    console.log('listening on port 4000')
})
