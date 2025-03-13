"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _http = _interopRequireDefault(require("http"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const server = _http.default.createServer((req, res) => {
  res.end('Hello from the server');
}).listen(4001);
console.log('Server is up and running');
var _default = exports.default = server;