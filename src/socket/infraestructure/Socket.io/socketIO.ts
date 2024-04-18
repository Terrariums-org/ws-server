import { Server, Socket } from "socket.io";
import { SocketRepository } from "../../domain/repository/socket-repository";
// import { server } from "../../domain/entities/server";
import { SocketEvent } from "../../domain/entities/socket-events";
import { VerifyTokenService } from "../../../tokens/application/services/verifyToken.service";

export class SocketIO implements SocketRepository {
  constructor(
    private readonly server: Server,
    private readonly verifyTokenService: VerifyTokenService
  ) {}
  async consumeData(
    io: Server,
    socket: Socket,
    event: SocketEvent,
    eventEmit: SocketEvent
  ): Promise<void> {
    try {
      socket.on(event, (data: any) => {
        console.log(data);
        io.emit(eventEmit, data);
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async connect(event: SocketEvent, eventEmit: SocketEvent) {
    try {
      const io = await this.server;
      //middleware
      io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) {
          throw new Error("Token no proporcionado");
        }
        this.verifyTokenService
          .run(token)
          .then((_res) => {
            next();
          })
          .catch((err) => {
            next(err);
          });
      });
      
      io.on(SocketEvent.CONNECTION, (socket) => {
        console.log("connected");
        this.consumeData(io, socket, event, eventEmit);
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
