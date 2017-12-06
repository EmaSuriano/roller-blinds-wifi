const model = require('./model');
const { SERVER_STATUS, ERROR_MESSAGE } = require('./constants');
const express = require('express');

const router = express.Router();

router
  .route('/position')
  .get(function(req, res) {
    const position = model.getPosition();
    return res.json({ position });
  })
  .put(function(req, res) {
    if (model.getStatus() !== SERVER_STATUS.SUCCESFULL) {
      res.statusMessage = ERROR_MESSAGE.NOT_CONNECTED;
      return res.sendStatus(400).end();
    }

    model.setPosition(req.position).then(function() {
      return res.sendStatus(200);
    });
  });

router.get('/status', function(req, res) {
  const status = model.getStatus();
  return res.json({ status });
});

module.exports = router;
