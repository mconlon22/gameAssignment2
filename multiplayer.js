var express = require("express");
var app = express();

var http = require("http").createServer(app);
var io = require("socket.io")(http, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

http.listen(3000, function(){
console.log("Successfully Connected Node Server");

 io.on("connection", function(socket){
    console.log("Auth value: " + socket.id);

    socket.on("sendNotification", function(details){
        socket.broadcast.emit("sendNotification", details);
    });
});
});