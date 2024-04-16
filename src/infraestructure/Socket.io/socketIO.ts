import { Server, Socket } from "socket.io";
import { SocketRepository } from "../../domain/repository/socket-repository";
// import { server } from "../../domain/entities/server";
import { SocketEvent } from "../../domain/entities/socket-events";

export class SocketIO implements SocketRepository {
  constructor(private readonly server: Server) {}
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
      io.on(SocketEvent.CONNECTION, (socket) => {
        console.log("connected");
        this.consumeData(io, socket, event, eventEmit);
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
