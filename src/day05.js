const computor = require("../lib/reload.js")("../lib/computor.js")

const input = process.argv[2]
  .match(/-?\d+/g)

computor(input)
