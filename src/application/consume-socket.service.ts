import { SocketEvent } from "../domain/entities/socket-events";
import { SocketRepository } from "../domain/repository/socket-repository";

export class ConsumeSocket {
  constructor(private readonly socketRepository: SocketRepository) {}
  async run(eventListen: SocketEvent, sendDataToEvent: SocketEvent) {
    try {
      await this.socketRepository.connect(eventListen, sendDataToEvent);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
