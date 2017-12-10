const model = require('./model');
const { SERVER_STATUS, ERROR_MESSAGE } = require('./constants');

module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.emit('position', model.getPosition());

    socket.on('position', function(position) {
      model
        .setPosition(position)
        .then(() => io.emit('position', position))
        .catch(exception => socket.emit('exception', { exception }));
    });
  });
};
