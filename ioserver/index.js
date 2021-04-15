const http = require("http").createServer();
const io=require("socket.io")(http,{
    cors:{origin: "*"}
})
io.on("connection",(socket) => console.log('user connected'))
io.on('disconnect', () => {
    console.log(' disconnected')
  });
http.listen(8080,() => console.log('server running'))
