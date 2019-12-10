// d: src/day05.js

const getInput = () => 1
const rHeader = /^(\d+?)(\d\d)$/

function computor (state, offset = 0) {
  if (state[offset] == 99 || offset >= state.length) return state

  const memory = state.slice(0)

  const [modes, opCode] = memory[offset]
    .toString().padStart(5, 0).match(rHeader).slice(1)
  const args = memory
    .slice(offset + 1, offset + (/[12]$/.test(opCode) ? 4 : 2))
    .reverse()
    .reduce((a, n, i) => `${a},${+modes[i] ? +n : +memory[n]}`)
    .split(",")
    .reverse()

  // const DEBUG = () => {
  //   console.log(offset, memory.slice(offset, offset + 6).join())
  //   console.log({opCode, modes, args})
  // }

  switch (opCode) {
    case "01":
      memory[args[2]] = +args[0] + +args[1]
      break
    case "02":
      memory[args[2]] = +args[0] * +args[1]
      break
    case "03":
      memory[args[0]] = getInput()
      break
    case "04":
      // eslint-disable-next-line no-console
      console.log(`Program output - ${memory[args[0]]}`)
      break
    default:
      throw new Error(`Invalid opCode; ${opCode}.`)
  }

  return computor(memory, offset + 1 + args.length)
}

module.exports = computor
