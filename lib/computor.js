// d: src/day05.js

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)

function computor (input, offset = 0) {
  if (input[offset] == 99 || offset >= input.length) return input

  const memory = input.slice(0)

  switch (+memory[offset]) {
    case 1:    memory[memory[offset + 3]] = +memory[memory[offset + 1]] + +memory[memory[offset + 2]]; offset += 4; break
    case 101:  memory[memory[offset + 3]] = +memory[offset + 1]         + +memory[memory[offset + 2]]; offset += 4; break
    case 1001: memory[memory[offset + 3]] = +memory[memory[offset + 1]] + +memory[offset + 2]        ; offset += 4; break
    case 1101: memory[memory[offset + 3]] = +memory[offset + 1]         + +memory[offset + 2]        ; offset += 4; break

    case 2:    memory[memory[offset + 3]] = +memory[memory[offset + 1]] * +memory[memory[offset + 2]]; offset += 4; break
    case 102:  memory[memory[offset + 3]] = +memory[offset + 1]         * +memory[memory[offset + 2]]; offset += 4; break
    case 1002: memory[memory[offset + 3]] = +memory[memory[offset + 1]] * +memory[offset + 2]        ; offset += 4; break
    case 1102: memory[memory[offset + 3]] = +memory[offset + 1]         * +memory[offset + 2]        ; offset += 4; break

    case 3:    memory[memory[offset + 1]] = 1                                                        ; offset += 2; break

    case 4:    log("Program output", memory[memory[offset + 1]])                                     ; offset += 2; break
    case 104:  log("Program output", memory[offset + 1])                                             ; offset += 2; break

    default:
      throw new Error(`Invalid opCode; ${memory[offset]}.`)
  }

  return computor(memory, offset)
}

module.exports = computor
