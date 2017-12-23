exports.id = 0;
exports.modules = {

/***/ "./src/storage.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);



var _this = this;

var datastore = __webpack_require__("nedb-promise");

var _require = __webpack_require__("./src/utils.js"),
    withDebugHOF = _require.withDebugHOF;

var _require2 = __webpack_require__("./src/constants.js"),
    ERROR_MESSAGE = _require2.ERROR_MESSAGE,
    DEBUG = _require2.DEBUG;

var db = datastore({ filename: './src/database.db', autoload: true });

var getPosition = function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
    var document;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
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
  var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(position) {
    var newPositionRecord;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
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

/* harmony default export */ __webpack_exports__["default"] = ({
  getPosition: withDebugHOF(getPosition),
  setPosition: withDebugHOF(setPosition)
});

/***/ })

};