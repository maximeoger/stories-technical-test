import io, { Socket, SocketOptions } from "socket.io-client"

const CONNECTION_URL = "wss://api.dev.stories.studio/"
const SOCKET_PATH = "/interview-test"
const SOCKET_TRANSPORTS = ["websocket"]

const connection = () : Socket => {
  const socket : Socket = io(CONNECTION_URL, {
    transport: SOCKET_TRANSPORTS,
    path: SOCKET_PATH
  } as SocketOptions)

  socket.open()

  return socket
};

let conn = connection()

export default conn