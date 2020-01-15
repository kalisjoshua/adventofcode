// d: src/day07.js
// days: 2, 5, 7
const pipeline = require("./pipeline")

const argModes = {"000": [0, 0], "001": [1, 0], "010": [0, 1], "011": [1, 1]}

function computor (memory, offset = 0, log = []) {
  if (offset > memory.length) throw new Error("Index out of bounds")

  const set = (pos, val) => memory[memory[offset + pos]] = val
  const resolveMap = (mode, index) => mode
    ? +memory[offset + index + 1]
    : +memory[resolveMap(1, index)]

  const args = pipeline(
    memory[offset],
    (rawOpCode) => rawOpCode.toString().padStart(5, 0).match(/^\d{3}/)[0],
    (modes) => argModes[modes].map(resolveMap)
  )

  const next = (nxt) => memory[nxt] == 99
    ? {done: true, log, memory}
    : computor(memory.slice(0), nxt, log)

  switch (+memory[offset].toString().match(/\d\d?$/)[0]) {
    case 1: set(3, args[0] + args[1]);                        offset += 4; break
    case 2: set(3, args[0] * args[1]);                        offset += 4; break
    case 3: return {next: (message) => (set(1, message), next(offset + 2))}
    case 4: log.push(args[0]); return {log, next: () => next(offset + 2)}
    case 5:                offset = args[0] !== 0 ? args[1] : offset +  3; break
    case 6:                offset = args[0] === 0 ? args[1] : offset +  3; break
    case 7: set(3, args[0]  <  args[1] ? 1 : 0);              offset += 4; break
    case 8: set(3, args[0] === args[1] ? 1 : 0);              offset += 4; break
    default: throw new Error(`Invalid opCode; ${memory[offset]}.`)
  }

  return next(offset)
}

module.exports = computor
