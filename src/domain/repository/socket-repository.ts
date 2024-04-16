export interface SocketRepository {
  connect(): Promise<any>;
}