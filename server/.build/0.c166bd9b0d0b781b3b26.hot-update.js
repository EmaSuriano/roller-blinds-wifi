exports.id = 0;
exports.modules = {

/***/ "./src/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller__ = __webpack_require__("./src/controller.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__controller__);
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


app.use(__WEBPACK_IMPORTED_MODULE_1__controller___default.a);

/* harmony default export */ __webpack_exports__["a"] = (app);

/***/ }),

/***/ "./src/board.js":
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var j5 = __webpack_require__("johnny-five");
var EtherPort = __webpack_require__("etherport");

var _require = __webpack_require__("./src/constants.js"),
    BOARD_STATUS = _require.BOARD_STATUS,
    ERROR_MESSAGE = _require.ERROR_MESSAGE,
    ETHERPORT_PORT = _require.ETHERPORT_PORT,
    MOTOR_PINS = _require.MOTOR_PINS,
    EXCEPTIONS = _require.EXCEPTIONS,
    DISABLE_BOARD = _require.DISABLE_BOARD;

function Board() {
  var _this = this;

  console.log('Board suffesfully connected!');
  this.status = BOARD_STATUS.CONNECTING;
  this.isMoving = false;
  this.moveMotor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            throw new Error(ERROR_MESSAGE.NOT_CONNECTED);

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  var board = new j5.Board({
    port: new EtherPort(ETHERPORT_PORT),
    timeout: 1e5,
    repl: false
  });

  board.on('ready', function () {
    _this.status = BOARD_STATUS.SUCCESSFUL;

    var stepper = new j5.Stepper({
      type: j5.Stepper.TYPE.FOUR_WIRE,
      stepsPerRev: 96,
      pins: MOTOR_PINS
    });

    moveMotor = function moveMotor(steps) {
      return new Promise(function (resolve) {
        return stepper.rpm(300).direction(steps > 0 ? j5.Stepper.DIRECTION.CCW : j5.Stepper.DIRECTION.CW).step(Math.abs(steps), resolve);
      });
    };

    _this.moveMotor = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(steps) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this.isMoving === true)) {
                  _context2.next = 2;
                  break;
                }

                throw new Error(ERROR_MESSAGE.ROLLER_BLINDS_MOVING);

              case 2:
                _this.isMoving = true;
                _context2.next = 5;
                return moveMotor(steps);

              case 5:
                _this.isMoving = false;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
  });

  board.on('error', function (error) {
    _this.status = BOARD_STATUS.ERROR;
    console.error(ERROR_MESSAGE.CONNECTING_BOARD_ERROR);
  });
}

function BoardDisable() {
  var _this2 = this;

  console.log('BOARD SUCCESSFULLY DISABLED!');
  this.status = BOARD_STATUS;
  this.isMoving = false;

  var moveMotor = function moveMotor(steps) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, Math.abs(steps));
    });
  };

  this.moveMotor = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(steps) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(_this2.isMoving === true)) {
                _context3.next = 2;
                break;
              }

              throw new Error(ERROR_MESSAGE.ROLLER_BLINDS_MOVING);

            case 2:
              _this2.isMoving = true;
              _context3.next = 5;
              return moveMotor(steps);

            case 5:
              _this2.isMoving = false;

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
}

module.exports = DISABLE_BOARD ? BoardDisable : Board;

/***/ }),

/***/ "./src/constants.js":
/***/ (function(module, exports, __webpack_require__) {

var BOARD_STATUS = {
  CONNECTING: 'CONNECTING',
  SUCCESSFUL: 'SUCCESSFUL',
  ERROR: 'ERROR'
};

var ERROR_MESSAGE = {
  NOT_CONNECTED: 'Your roller blinds are not connected yet.',
  CONNECTING_BOARD_ERROR: "Can't connect to your roller blinds, please check the configuration",
  ROLLER_BLINDS_MOVING: 'Your roller blinds are moving right now.',
  DATABASE_GET_ERROR: "Can't get your roller blinds position from database",
  DATABASE_INSERT_ERROR: "Can't save your roller blinds position into database",
  UNHANDLED_ERROR: 'Something weird happenned',
  UNRECOGNIZED_ACTION: 'Socket has received an invalid action, nothing was done ...'
};

var ACTIONS = {
  SET_POSITION_REQUEST: 'server/SET_POSITION',
  SET_POSITION: 'SET_POSITION',
  SERVER_ERROR: 'SERVER_ERROR',
  SOCKET_CONNECTED: 'SOCKET_CONNECTED'
};

var DEFAULT_ENV = {
  PORT: 8000,
  MOTOR_PINS: [14, 12, 13, 15],
  ETHERPORT_PORT: 3030,
  DEBUG: true,
  DISABLE_BOARD: false
};

var SERVER_PORT = Object({"BUILD_TARGET":"src"}).PORT || DEFAULT_ENV.PORT;

var MOTOR_PINS = Object({"BUILD_TARGET":"src"}).MOTOR_PIN || DEFAULT_ENV.MOTOR_PINS;

var ETHERPORT_PORT = Object({"BUILD_TARGET":"src"}).ETHERPORT_PORT || DEFAULT_ENV.ETHERPORT_PORT;

var DEBUG = Object({"BUILD_TARGET":"src"}).DEBUG || DEFAULT_ENV.DEBUG;

var DISABLE_BOARD = Object({"BUILD_TARGET":"src"}).DISABLE_BOARD || DEFAULT_ENV.DISABLE_BOARD;

module.exports = {
  BOARD_STATUS: BOARD_STATUS,
  ERROR_MESSAGE: ERROR_MESSAGE,
  ACTIONS: ACTIONS,
  SERVER_PORT: SERVER_PORT,
  MOTOR_PINS: MOTOR_PINS,
  ETHERPORT_PORT: ETHERPORT_PORT,
  DEBUG: DEBUG,
  DISABLE_BOARD: DISABLE_BOARD
};

/***/ }),

/***/ "./src/controller.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var rollerBlind = __webpack_require__("./src/rollerBlind.js");
var express = __webpack_require__("express");

var router = express.Router();

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

/***/ }),

/***/ "./src/rollerBlind.js":
/***/ (function(module, exports, __webpack_require__) {

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var storage = __webpack_require__("./src/storage.js");
var Board = __webpack_require__("./src/board.js");

var _require = __webpack_require__("./src/utils.js"),
    calculateSteps = _require.calculateSteps,
    noop = _require.noop;

var board = new Board();

var getPosition = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return storage.getPosition();

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getPosition() {
    return _ref.apply(this, arguments);
  };
}();

var setPosition = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(newPosition) {
    var position, steps;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return storage.getPosition();

          case 2:
            position = _context2.sent;
            steps = calculateSteps(newPosition, position);
            _context2.next = 6;
            return board.moveMotor(steps);

          case 6:
            _context2.next = 8;
            return storage.setPosition(newPosition);

          case 8:
            return _context2.abrupt('return', newPosition);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function setPosition(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getStatus = function getStatus() {
  return board.status;
};

module.exports = {
  getPosition: getPosition,
  setPosition: setPosition,
  getStatus: getStatus
};

/***/ }),

/***/ "./src/storage.js":
/***/ (function(module, exports, __webpack_require__) {

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var datastore = __webpack_require__("nedb-promise");

var _require = __webpack_require__("./src/utils.js"),
    withDebugHOF = _require.withDebugHOF;

var _require2 = __webpack_require__("./src/constants.js"),
    ERROR_MESSAGE = _require2.ERROR_MESSAGE,
    DEBUG = _require2.DEBUG;

var db = datastore({ filename: './src/database.db', autoload: true });

var getPosition = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var document;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.cfind({}).sort({ dateTime: -1 }).limit(1).exec();

          case 3:
            document = _context.sent;
            return _context.abrupt('return', document[0].position);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            throw new Error(ERROR_MESSAGE.DATABASE_GET_ERROR);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[0, 7]]);
  }));

  return function getPosition() {
    return _ref.apply(this, arguments);
  };
}();

var setPosition = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(position) {
    var newPositionRecord;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newPositionRecord = { position: position, dateTime: Date.now() };
            _context2.next = 4;
            return db.insert(newPositionRecord);

          case 4:
            return _context2.abrupt('return', position);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            throw new Error(ERROR_MESSAGE.DATABASE_INSERT_ERROR);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this, [[0, 7]]);
  }));

  return function setPosition(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  getPosition: withDebugHOF(getPosition),
  setPosition: withDebugHOF(setPosition)
};

/***/ }),

/***/ "./src/utils.js":
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__("./src/constants.js"),
    DEBUG = _require.DEBUG;

var STEPPER_MOTOR_STEPS_ONE_LAP = 4096;
var TOTAL_STEPS_FULL_BLINDS = STEPPER_MOTOR_STEPS_ONE_LAP * 8;

var MIN_POSITION = 0;
var MAX_POSITION = 100;

var positionToSteps = function positionToSteps(position) {
  return position * TOTAL_STEPS_FULL_BLINDS / MAX_POSITION;
};

var calculateSteps = function calculateSteps(newPosition, currentPosition) {
  return positionToSteps(newPosition) - positionToSteps(currentPosition);
};

var functionCallLoggerHOF = function functionCallLoggerHOF(func) {
  return function (params) {
    var functionCall = 'function called: ' + func.name;
    var paramsDescription = params ? ', with params: ' + params : '';
    console.log('FUNCTION_LOGGER: ' + functionCall + paramsDescription);

    return func(params);
  };
};

var noop = function noop() {};

var withDebugHOF = function withDebugHOF(func) {
  return DEBUG ? functionCallLoggerHOF(func) : func;
};

module.exports = {
  calculateSteps: calculateSteps,
  withDebugHOF: withDebugHOF,
  noop: noop
};

/***/ }),

/***/ "etherport":
/***/ (function(module, exports) {

module.exports = require("etherport");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "johnny-five":
/***/ (function(module, exports) {

module.exports = require("johnny-five");

/***/ }),

/***/ "nedb-promise":
/***/ (function(module, exports) {

module.exports = require("nedb-promise");

/***/ })

};