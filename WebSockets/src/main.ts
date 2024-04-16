import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { SocketEvent } from "./domain/entities/socket-events";

const app = express();

app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 8080);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my api");
});

app.use("*", (req, res) => {
  res.send("Esta ruta no existe en la API");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

io.on(SocketEvent.CONNECTION, (socket) => {
  socket.on(SocketEvent.SEND_DATA, (data: any) => {
    console.log(data);
    io.emit(SocketEvent.SHOW_CLIENT, data);
  });
});

//Empieza servidor
server.listen(app.get("port"), () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
});