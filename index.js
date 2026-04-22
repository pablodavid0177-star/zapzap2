const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
 
const mongoose = require("mongoose");
const multer = require("multer");
 
// 🔥 CONECTA NO BANCO
mongoose.connect("mongodb://127.0.0.1:27017/chat");
 
console.log("Mongo conectado");
 
// 📦 MODELO
const Message = mongoose.model("Message", {
  name: String,
  msg: String,
  room: String,
  time: { type: Date, default: Date.now }
});
 
// 📷 UPLOAD
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
 
const upload = multer({ storage });
 
// permitir acessar imagens
app.use("/uploads", express.static("uploads"));
app.use(express.static(__dirname));
 
// rota upload
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ url: "/uploads/" + req.file.filename });
});
 
// 🔌 SOCKET
io.on("connection", (socket) => {
 
  console.log("Usuário conectado");
 
  socket.on("joinRoom", async ({ name, room }) => {
 
    socket.join(room);
 
    // manda histórico
    const oldMessages = await Message.find({ room }).sort({ time: 1 });
 
    socket.emit("oldMessages", oldMessages);
 
    io.to(room).emit("chat message", {
      name: "Sistema",
      msg: `${name} entrou na sala`,
      room
    });
  });
 
  socket.on("chat message", async (data) => {
 
    // salva no banco
    const newMsg = new Message(data);
    await newMsg.save();
 
    io.to(data.room).emit("chat message", data);
  });
 
  socket.on("disconnect", () => {
    console.log("Usuário saiu");
  });
 
});
 
// 🚀 PORTA ONLINE
const PORT = process.env.PORT || 3000;
 
http.listen(PORT, () => {
  console.log("Rodando...");
});
