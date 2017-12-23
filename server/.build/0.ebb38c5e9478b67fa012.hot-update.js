exports.id = 0;
exports.modules = {

/***/ "./node_modules/webpack/buildin/harmony-module.js":
false,

/***/ "./src/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller__ = __webpack_require__("./src/controller.js");
// const { SERVER_PORT } = require('./constants');
// // const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// app.use(require('./controller'));
// require('./socket.js')(io);

// http.listen(SERVER_PORT, () => {
//   console.log(
//     'Listening on port ' + SERVER_PORT + '... http://localhost:' + SERVER_PORT,
//   );
// });




var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

app.use(__WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (app);

/***/ }),

/***/ "./src/controller.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);



var _this = this;

// const rollerBlind = require('./rollerBlind');
var express = __webpack_require__("express");

var router = express.Router();

var rollerBlind = {};

router.route('/position').get(function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(req, res) {
    var position;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
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
  var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(req, res) {
    var pos;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
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

/* harmony default export */ __webpack_exports__["a"] = (router);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/"))

/***/ })

};