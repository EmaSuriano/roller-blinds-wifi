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
    model
      .setPosition(req.position)
      .then(function() {
        return res.sendStatus(200);
      })
      .catch(err => {
        res.statusMessage = err;
        return res.sendStatus(400).end();
      });
  });

router.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

router.get('/status', function(req, res) {
  const status = model.getStatus();
  return res.json({ status });
});

module.exports = router;
