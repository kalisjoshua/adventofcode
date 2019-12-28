const range = (len, shift = 0) =>
  Array.apply(0, new Array(+len)).map((_, i) => i + 1 + shift)

module.exports = range
