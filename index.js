const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
 
app.use(express.static(__dirname));
 
let users = {};
 
io.on("connection", (socket) => {
 
  socket.on("joinRoom", ({ name, room }) => {
    socket.join(room);
    users[socket.id] = { name, room };
 
    io.to(room).emit("chat message", {
      name: "Sistema",
      msg: `${name} entrou na sala`,
      room
    });
  });
 
  socket.on("chat message", (data) => {
    io.to(data.room).emit("chat message", data);
  });
 
  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit("chat message", {
        name: "Sistema",
        msg: `${user.name} saiu`,
        room: user.room
      });
      delete users[socket.id];
    }
  });
 
});
 
http.listen(3000, () => {
  console.log("Rodando em http://localhost:3000");
});
