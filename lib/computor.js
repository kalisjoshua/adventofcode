// d: src/day05.js

// eslint-disable-next-line no-console
const log = console.log.bind(console, "Program output")

function computor (memory, offset = 0) {
  const ref = (mode, pos) => +(mode ? memory[offset + pos] : memory[memory[offset + pos]])
  const set = (pos, val) => {memory[memory[offset + pos]] = val}

  switch (+memory[offset]) {
    case    1: set(3, ref(0, 1) + ref(0, 2)); offset += 4; break
    case  101: set(3, ref(1, 1) + ref(0, 2)); offset += 4; break
    case 1001: set(3, ref(0, 1) + ref(1, 2)); offset += 4; break
    case 1101: set(3, ref(1, 1) + ref(1, 2)); offset += 4; break

    case    2: set(3, ref(0, 1) * ref(0, 2)); offset += 4; break
    case  102: set(3, ref(1, 1) * ref(0, 2)); offset += 4; break
    case 1002: set(3, ref(0, 1) * ref(1, 2)); offset += 4; break
    case 1102: set(3, ref(1, 1) * ref(1, 2)); offset += 4; break

    case    3: set(1, 1)                    ; offset += 2; break

    case    4: log(ref(0, 1))               ; offset += 2; break
    case  104: log(ref(1, 1))               ; offset += 2; break

    default:
      throw new Error(`Invalid opCode; ${memory[offset]}.`)
  }

  return (memory[offset] == 99 || offset >= memory.length)
    ? memory
    : computor(memory.slice(0), offset)
}

module.exports = computor
