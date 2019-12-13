delete require.cache[require("path").join(process.cwd(), "lib/computor.js")]
const computor = require("../lib/computor")

const input = process.argv[2]
  .match(/-?\d+/g)

let noun = 12
let verb = 2
const target = 19690720

const fixInput = (input, n, v) => {
  const changed = input.slice(0)

  changed[1] = n
  changed[2] = v

  return changed
}

while (target > computor(fixInput(input, ++noun, verb)));
--noun
while (target > computor(fixInput(input, noun, ++verb)));

// eslint-disable-next-line no-console
console.log(100 * noun + verb)
