exports.id = 0;
exports.modules = {

/***/ "./src/board.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);


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
  this.moveMotor = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
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
      var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(steps) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
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
    var _ref3 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3(steps) {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
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

// export default (DISABLE_BOARD ? BoardDisable : Board);
/* harmony default export */ __webpack_exports__["default"] = (BoardDisable);

/***/ })

};