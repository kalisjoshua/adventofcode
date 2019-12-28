// d: src/day07.js

function factory (getInput, out, debug = () => {}) {
  function computor (memory, offset = 0) {
    const ref = (mode, pos) => +(mode ? memory[offset + pos] : memory[memory[offset + pos]])
    const set = (pos, val) => {memory[memory[offset + pos]] = val}
    debug("before", memory.join())

    switch (+memory[offset]) {
      case    1: set(3, ref(0, 1) + ref(0, 2)); offset += 4; break
      case  101: set(3, ref(1, 1) + ref(0, 2)); offset += 4; break
      case 1001: set(3, ref(0, 1) + ref(1, 2)); offset += 4; break
      case 1101: set(3, ref(1, 1) + ref(1, 2)); offset += 4; break

      case    2: set(3, ref(0, 1) * ref(0, 2)); offset += 4; break
      case  102: set(3, ref(1, 1) * ref(0, 2)); offset += 4; break
      case 1002: set(3, ref(0, 1) * ref(1, 2)); offset += 4; break
      case 1102: set(3, ref(1, 1) * ref(1, 2)); offset += 4; break

      case    3: set(1, getInput()); offset += 2; break

      case    4: out(ref(0, 1))    ; offset += 2; break
      case  104: out(ref(1, 1))    ; offset += 2; break

      case    5: offset = ref(0, 1) !== 0 ? ref(1, 1) : offset + 3; break
      case  105: offset = ref(1, 1) !== 0 ? ref(0, 2) : offset + 3; break
      case 1005: offset = ref(0, 1) !== 0 ? ref(1, 2) : offset + 3; break
      case 1105: offset = ref(1, 1) !== 0 ? ref(1, 2) : offset + 3; break

      case    6: offset = ref(0, 1) === 0 ? ref(1, 1) : offset + 3; break
      case  106: offset = ref(1, 1) === 0 ? ref(0, 2) : offset + 3; break
      case 1006: offset = ref(0, 1) === 0 ? ref(1, 2) : offset + 3; break
      case 1106: offset = ref(1, 1) === 0 ? ref(1, 2) : offset + 3; break

      case    7: set(3, ref(0, 1) < ref(0, 2) ? 1 : 0); offset += 4; break
      case  107: set(3, ref(1, 1) < ref(0, 2) ? 1 : 0); offset += 4; break
      case 1007: set(3, ref(0, 1) < ref(1, 2) ? 1 : 0); offset += 4; break
      case 1107: set(3, ref(1, 1) < ref(1, 2) ? 1 : 0); offset += 4; break

      case    8: set(3, ref(0, 1) === ref(0, 2) ? 1 : 0); offset += 4; break
      case  108: set(3, ref(1, 1) === ref(0, 2) ? 1 : 0); offset += 4; break
      case 1008: set(3, ref(0, 1) === ref(1, 2) ? 1 : 0); offset += 4; break
      case 1108: set(3, ref(1, 1) === ref(1, 2) ? 1 : 0); offset += 4; break

      default:
        throw new Error(`Invalid opCode; ${memory[offset]}.`)
    }
    debug("after", memory.join())

    return (memory[offset] == 99 || offset >= memory.length)
      ? out
      : computor(memory.slice(0), offset)
  }

  return computor
}

module.exports = factory
