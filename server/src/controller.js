const rollerBlind = require('./rollerBlind');
const express = require('express');

const router = express.Router();

router
  .route('/position')
  .get(function(req, res) {
    const position = rollerBlind.getPosition();
    return res.json({ position });
  })
  .put(function(req, res) {
    rollerBlind
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
  const status = rollerBlind.getStatus();
  return res.json({ status });
});

module.exports = router;
