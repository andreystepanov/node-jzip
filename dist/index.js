"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compress = compress;
exports.decompress = decompress;

var _pako = _interopRequireDefault(require("pako"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compress(data, options) {
  let string;

  switch (typeof data) {
    case 'string':
      string = data;
      break;

    default:
      string = JSON.stringify(data);
      break;
  }

  const compressed = _pako.default.deflate(string, { // level: 9,
    ...options,
    to: 'string'
  });

  return Buffer.from(compressed).toString('base64');
}

function decompress(data) {
  const binary = Buffer.from(data, 'base64').toString();

  const decompressed = _pako.default.inflate(binary, {
    to: 'string'
  });

  try {
    const json = JSON.parse(decompressed);
    return json;
  } catch (e) {
    return decompressed;
  }
}