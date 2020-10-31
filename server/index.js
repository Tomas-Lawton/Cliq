const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    socket.on('message', ({ YourCliq, displayname, useremail, message, publickey, currenttime }) => {
        io.emit('message', ({ YourCliq, displayname, useremail, message, publickey, currenttime }))
    })
})

http.listen(4000, function () {
    console.log('listening on port 4000')
})
