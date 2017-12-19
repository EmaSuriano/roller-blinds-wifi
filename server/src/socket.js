const rollerBlind = require('./rollerBlind');
const { ACTIONS } = require('./constants');

module.exports = function(io) {
  io.on('connection', function(socket) {
    rollerBlind
      .getPosition()
      .then(pos => socket.emit(ACTIONS.SET_POSITION, pos))
      .catch(err => socket.emit(ACTIONS.SERVER_ERROR, err));

    socket.on(ACTIONS.SET_POSITION, function(position) {
      rollerBlind
        .setPosition(position)
        .then(pos => io.emit(ACTIONS.SET_POSITION, pos))
        .catch(err => socket.emit(ACTIONS.SERVER_ERROR, err));
    });
  });
};
