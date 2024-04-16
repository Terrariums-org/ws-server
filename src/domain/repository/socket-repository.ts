import { SocketEvent } from "../entities/socket-events";

export interface SocketRepository {
  createServer(): Promise<any>;
  connect(event: SocketEvent, eventEmit: SocketEvent): Promise<void>;
  consumeData(
    io: unknown,
    socket: unknown,
    event: SocketEvent,
    eventEmit: SocketEvent
  ): Promise<void>;
}
