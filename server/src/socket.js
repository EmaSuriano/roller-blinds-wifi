const rollerBlind = require('./rollerBlind');
const { ACTIONS } = require('./constants');

module.exports = io => {
  io.on('connection', async socket => {
    try {
      const position = await rollerBlind.getPosition();
      socket.emit(ACTIONS.SET_POSITION, position);
    } catch (error) {
      socket.emit(ACTIONS.SERVER_ERROR, error.message);
    }

    socket.on(ACTIONS.SET_POSITION, async newPosition => {
      try {
        const pos = await rollerBlind.setPosition(newPosition);
        io.emit(ACTIONS.SET_POSITION, pos);
      } catch (error) {
        socket.emit(ACTIONS.SERVER_ERROR, error.message);
      }
    });
  });
};
