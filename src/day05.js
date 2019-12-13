const computor = require("../lib/reload.js")("../lib/computor.js")

const input = process.argv[2]
  .match(/-?\d+/g)

// eslint-disable-next-line no-console
// console.log(Math.random())
// console.log(computor(input))

computor(input)
// console.log(computor("1002,4,3,4,33".match(/\d+/g)))
// computor("3,0,102,7,6,0,4,0,99".match(/\d+/g))
