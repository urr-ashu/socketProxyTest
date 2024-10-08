const express = require("express");
const app = express();

const http = require("http");
const socketIo = require("socket.io");

const configureSocketIo = (server) => {
  const io = socketIo(server, {
    path: "/my/socket",
  });

  global.socketIoInstance = io;

  io.on("connection", (socket) => {
    try {
      console.log("socket=> a user connected");
      socket.emit("message", "socket=> connection established");

      socket.on("socket=> clientMessage", (data) => {
        console.log(data);
      });

      socket.on("disconnect", () => {
        console.log("socket=> user disconnected");
      });
    } catch (error) {
      console.log(error);
    }
  });

  return io;
};

const server = http.createServer(app);

configureSocketIo(server);

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
