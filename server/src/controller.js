const model = require('./model');
const { SERVER_STATUS, ERROR_MESSAGE } = require('./constants');
const express = require('express');

const router = express.Router();

router.get('/position', function(req, res) {
  res.status(200).send(model.getPosition());
});

router.put('/position', function(req, res) {
  if (model.getStatus() !== SERVER_STATUS.SUCCESFULL) {
    res.statusMessage = ERROR_MESSAGE.NOT_CONNECTED;
    return res.status(400).end();
  }

  model.setPosition(req.position);
  return res.status(200);
});

router.get('/status', function(req, res) {
  res.send(model.getStatus());
});

module.exports = router;
