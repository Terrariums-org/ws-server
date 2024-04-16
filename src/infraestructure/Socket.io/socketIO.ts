import { Server } from "socket.io";
import { SocketRepository } from "../../domain/repository/socket-repository";
import { server } from "../../domain/entities/server";
import { SocketEvent } from "../../domain/entities/socket-events";

export class SocketIO implements SocketRepository {
  constructor() {}

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

  async connect(): Promise<{
    socket: any;
    io: Server;
  }> {
    return new Promise<{
      socket: any;
      io: Server;
    }>(async (resolve, reject) => {
      try {
        const io = await this.createServer();
        io.on(SocketEvent.CONNECTION, (socket) => {
          console.log("connected");
          resolve({
            socket,
            io,
          });
        });
      } catch (err: any) {
        reject(err);
      }
    });
  }

  async consumeData(event: SocketEvent, eventEmit: SocketEvent): Promise<any> {
    try {
      const { socket, io } = await this.connect();
      socket.on(event, (data: any) => {
        console.log(data);
        io.emit(eventEmit, data);
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
