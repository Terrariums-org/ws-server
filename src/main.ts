import { SocketEvent } from "./domain/entities/socket-events";
import { consumerSocket } from "./infraestructure/dependencies";

consumerSocket.run(SocketEvent.SEND_DATA, SocketEvent.SHOW_CLIENT);
