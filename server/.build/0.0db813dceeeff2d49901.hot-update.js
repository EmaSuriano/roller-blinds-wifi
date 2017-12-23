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

/***/ })

};