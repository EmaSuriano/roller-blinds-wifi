exports.id = 0;
exports.modules = {

/***/ "./src/controller.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const rollerBlind = require('./rollerBlind');
var express = __webpack_require__("express");

var router = express.Router();

var rollerBlind = {};

router.route('/position').get(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var position;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return rollerBlind.getPosition();

          case 3:
            position = _context.sent;
            return _context.abrupt('return', res.json({ position: position }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            res.statusMessage = _context.t0;
            return _context.abrupt('return', res.sendStatus(400).end());

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).put(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var pos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return rollerBlind.setPosition(req.position);

          case 3:
            pos = _context2.sent;
            return _context2.abrupt('return', res.sendStatus(200));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            res.statusMessage = _context2.t0;
            return _context2.abrupt('return', res.sendStatus(400).end());

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.get('/', function (req, res) {
  return res.sendFile(__dirname + '/index.html');
});

router.get('/status', function (req, res) {
  var status = rollerBlind.getStatus();
  return res.json({ status: status });
});

module.exports = router;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ })

};