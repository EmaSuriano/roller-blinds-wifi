import socketIo from 'socket.io';
import { SERVER_PORT } from './constants';

const appSocket = server => {
  const io = socketIo(server, {
    serveClient: false,
    wsEngine: 'ws', // uws is not supported since it is a native module
  });

  let connectedSockets = [];

  const socketConnection = socket => {
    connectedSockets.push(socket.id);
    console.log('new socket connection', connectedSockets);

    socket.on('disconnect', () => {
      connectedSockets = connectedSockets.filter(x => x !== socket.id);
      console.log('disconnected socket', connectedSockets);
    });
  };

  io.on('connection', socketConnection);
};

export default appSocket;
