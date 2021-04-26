var app = require("express")();
var http = require("http").Server(app);
const io=require("socket.io")(http,{
    cors:{origin: "*"}
})
const port = 6600;

var rooms={}

io.on("connection",(socket) =>{
      console.log('connection')


   socket.on('join_room',({room,playerid})=>{
      console.log('join room',playerid,room)
      if(rooms[room]==null){
     rooms[room]=[]
     }
      rooms[room].push(playerid)
      console.log(rooms[room])
          

   
    socket.emit('players',rooms[room])

      console.log(playerid)
     socket.to(room).emit('player_joined',{playerid:playerid})
     socket.join(room)
     
       
   })
    socket.on('message',({room,message})=>{
     socket.to(room).emit(message)
   })
   socket.on('knockout',({room,playerid,playerPunching})=>{
     console.log(playerid)

     socket.to(room).emit('knockout',{id:playerid,playerPunching:playerPunching})
   })
    socket.on('start_game',({room})=>{
      console.log('start',room)
     socket.to(room).emit('start_game', 'world')
   })
   socket.on('score',({room,playerid,playerscore})=>{
     console.log(playerscore)
     socket.to(room).emit('score', {playerid,playerscore})
   })

  socket.on('moved', ({room,playerid,x,y,z}) => {
    console.log(room,playerid,x,y,z)
    socket.to(room).emit('player_moved',{playerid,x,y,z})
    });

  socket.on('disconnect', () => {

    });
})
http.listen(port, function() {
  console.log(`listening on *:${port}`);
});














