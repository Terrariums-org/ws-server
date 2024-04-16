import { Server, Socket } from "socket.io";
import { SocketRepository } from "../../domain/repository/socket-repository";
import { server } from "../../domain/entities/server";
import { SocketEvent } from "../../domain/entities/socket-events";

export class SocketIO implements SocketRepository {
  constructor() {}
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

  async createServer(): Promise<Server> {
    try {
      return new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async connect(event: SocketEvent, eventEmit: SocketEvent) {
    try {
      const io = await this.createServer();
      io.on(SocketEvent.CONNECTION, (socket) => {
        console.log("connected");
        this.consumeData(io, socket, event, eventEmit);
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
