const rollerBlind = require('./rollerBlind');
const { ACTIONS, ERROR_MESSAGE } = require('./constants');

module.exports = io => {
  io.on('connection', async socket => {
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
      console.log('Action received', action.type);
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
  });
};
