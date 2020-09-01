var excerpts = require("excerpts");

const numWords = 30;
module.exports = function excerptFilter(value) {
  return excerpts(value, {words: numWords})
};
