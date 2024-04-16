import express from "express";
import { SocketEvent } from "./domain/entities/socket-events";
import { setUp } from "./infraestructure/utils/setUp";

function start() {
  const app = express();
  const { server, consumerSocket } = setUp(app);
  server.listen(app.get("port"), () => {
    console.log("Servidor corriendo en puerto", app.get("port"));
  });
  consumerSocket.run(SocketEvent.SEND_DATA, SocketEvent.SHOW_CLIENT);
}

start();
