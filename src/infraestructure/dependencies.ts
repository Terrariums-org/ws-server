import { ConsumeSocket } from "../application/consume-socket.service";
import { SocketIO } from "./Socket.io/socketIO";

const socketIORepo = new SocketIO();
export const consumerSocket = new ConsumeSocket(socketIORepo);