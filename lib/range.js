const range = (len, shift = 0) => Array
  .apply(0, new Array(+len)).map((_, i) => i + shift)

module.exports = range
