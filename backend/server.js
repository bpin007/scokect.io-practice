const express = require("express");

const PORT = 5004;

const app = express();

const server = app.listen(PORT, () => {
  console.log(`server is running successfully in ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTime: 60000,
  cors: {
    origin: "http://localhost:5176",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("joinRoom", (data) => {
    console.log(data);
    socket.join(data);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receviedMessage", data);
    console.log(data);
  });
});
