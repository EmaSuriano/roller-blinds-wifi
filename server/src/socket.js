const rollerBlind = require('./rollerBlind');
const { ACTIONS } = require('./constants');

module.exports = function(io) {
  io.on('connection', function(socket) {
    rollerBlind
      .getPosition()
      .then(position =>
        socket.emit('action', { type: ACTIONS.SET_POSITION, position }),
      )
      .catch(err => socket.emit(ACTIONS.SERVER_ERROR, err));

    socket.on('action', action => {
      if (action.type === ACTIONS.WANT_SET_POSITION) {
        console.log('receiving set position');
        rollerBlind
          .setPosition(action.position)
          .then(position => {
            console.log('emiting position!');
            io.emit('action', { type: ACTIONS.SET_POSITION, position });
          })
          .catch(err =>
            socket.emit('action', { type: ACTIONS.SERVER_ERROR, err }),
          );
      }
    });

    // socket.on(ACTIONS.WANT_SET_POSITION, function(position) {});
  });
};
