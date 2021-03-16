var socketIO = require('socket.io')
var ot = require('ot');
const Task = require('./models/Task')
var roomList = {};


module.exports = function (server) {
    var str = 'This is a Markdown heading \n\n' +
        'var i=i+1';
    var io = socketIO(server);
    io.on('connection', (socket) => {

        socket.on('joinRoom', function (data) {
            if (!roomList[data.room]) {                   //takes the id
                var socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function (socket, cb) {
                    var self = this;
                    Task.findByIdAndUpdate(data.room, { content: self.document }, function (err) {
                        if (err) return cb(false);
                        cb(true);
                    })

                });
                roomList[data.room] = socketIOServer
            }
            roomList[data.room].addClient(socket);            //id to the socket
            roomList[data.room].setName(socket, data.username)  //setName for the socket
            socket.room = data.room;
            socket.join(data.room);
           
           // console.log(userId)
        })

        socket.on('join-room',(data,userId)=>{
            socket.join(data.room)
            socket.to(data.room).broadcast.emit('user-connected',userId)
        })
        socket.on('chatMessage', (data) => {
            io.to(socket.room).emit('chatMessage', data)
        })
        socket.on('disconnect', function () {
            socket.to(socket.room).broadcast.emit('user-disconnected', socket.room)
        })
    })
} 