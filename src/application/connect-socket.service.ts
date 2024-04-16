import { SocketRepository } from "../domain/repository/socket-repository";

export class ConnectSocket {
    constructor(private readonly socketRepository: SocketRepository) {}
    async run() {
      try {
        await this.socketRepository.connect();
      } catch (err: any) {
        throw new Error(err);
      }
    }
  }