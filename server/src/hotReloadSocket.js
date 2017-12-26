import socketIo from 'socket.io';
import rollerBlind from './rollerBlind';

const { ACTIONS, ERROR_MESSAGE, DEBUG } = require('./constants');

const onSocket = io => async socket => {
  console.log('new socket connection JAJAJA', socket.id);

  //   socket.on('disconnect', () => {
  //     console.log('disconnected socket', printConnectedSocket());
  //   });
  console.log(rollerBlind.getStatus());

  socket.emit('action', { type: ACTIONS.SOCKET_CONNECTED });
  try {
    const position = await rollerBlind.getPosition();
    socket.emit('action', { type: ACTIONS.SET_POSITION, position });
  } catch (error) {
    socket.emit('action', {
      type: ACTIONS.SERVER_ERROR,
      error: error.message,
    });
  }

  socket.on('action', async action => {
    if (DEBUG) console.log('New action received', action.type);

    switch (action.type) {
      case ACTIONS.SET_POSITION_REQUEST:
        try {
          const newPosition = await rollerBlind.setPosition(action.position);
          io.emit('action', {
            type: ACTIONS.SET_POSITION,
            position: newPosition,
          });
        } catch (error) {
          socket.emit('action', {
            type: ACTIONS.SERVER_ERROR,
            error: error.message,
          });
        }
        break;
      default:
        socket.emit('action', {
          type: ACTIONS.SERVER_ERROR,
          error: ERROR_MESSAGE.UNRECOGNIZED_ACTION,
        });
        break;
    }
  });
};

export default onSocket;
