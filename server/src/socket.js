const rollerBlind = require('./rollerBlind');
const { ACTIONS } = require('./constants');

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

    socket.on(ACTIONS.SET_POSITION, async newPosition => {
      try {
        const pos = await rollerBlind.setPosition(newPosition);
        io.emit('action', { type: ACTIONS.SET_POSITION, position });
      } catch (error) {
        socket.emit('action', {
          type: ACTIONS.SERVER_ERROR,
          error: error.message,
        });
      }
    });
  });
};
