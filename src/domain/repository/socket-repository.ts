import { SocketEvent } from "../entities/socket-events";

export interface SocketRepository {
  createServer(): Promise<any>;
  connect(): Promise<any>;
  consumeData(event: SocketEvent, eventEmit: SocketEvent): Promise<any>;
}
