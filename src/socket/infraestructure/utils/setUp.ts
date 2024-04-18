import cors from "cors";
import express, { Application } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { SocketIO } from "../Socket.io/socketIO";
import { ConsumeSocket } from "../../application/consume-socket.service";
import { JwtRepositoryImp } from "../../../tokens/infraestructure/ports/JwtRepository.port";
import { VerifyTokenService } from "../../../tokens/application/services/verifyToken.service";

export function setUp(app: Application) {
  app.use(cors());
  app.use(express.json());
  app.set("port", process.env.PORT || 8080);
  const server = createServer(app);
  //server socket
  const socketConfig = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    },
  });
  const jwtPort = new JwtRepositoryImp();
  const verifyTokenService = new VerifyTokenService(jwtPort);
  const socketServer = new SocketIO(socketConfig, verifyTokenService);
  const consumerSocket = new ConsumeSocket(socketServer);

  return { consumerSocket, server };
}
