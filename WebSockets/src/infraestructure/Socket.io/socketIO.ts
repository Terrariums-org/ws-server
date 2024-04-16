import { Server } from "socket.io";
import { SocketRepository } from "../../domain/repository/socket-repository";
import { server } from "../../domain/entities/server";
import { SocketEvent } from "../../domain/entities/socket-events";

export class SocketIO implements SocketRepository {
  constructor() {}
  async connect(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const io = new Server(server, {
          cors: {
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
          },
        });
        io.on(SocketEvent.CONNECTION, (socket) => {
          console.log("connected");
          resolve(socket);
/*           socket.on(SocketEvent.SEND_DATA, (data: any) => {
            console.log(data);
            io.emit(SocketEvent.SHOW_CLIENT, data);
          }); */
        });
      } catch (err: any) {
        reject(err);
      }
    });
  }
}
