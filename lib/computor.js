// d: src/day05.js

const rHeader = /^(\d+?)(\d\d)$/
const xHeader = (h) => h.toString().padStart(5, 0).match(rHeader).slice(1)

function computor (program) {
  let offsetIndex = 0
  const offset = (num) => num ? (offsetIndex += num) : offsetIndex
  let instruction

  interpreter:
  while (offset() < program.length) {
    const [header, a, b, i] = program
      .slice(offset())
    const [modes, opCode] = header
      .toString()
      .padStart(5, 0)
      .match(rHeader)
      .slice(1)
    const args = [
      +(!+modes[2] ? program[a] : a),
      +(!+modes[1] ? program[b] : b),
      +(!+modes[0] ? program[i] : i),
    ]

    switch (opCode) {
      case "01":
        instruction = [opCode, args[0], args[1], args[2], args[0] + args[1]]
        program[i] = args[0] + args[1]
        offset(4)
        break
      case "02":
        instruction = [opCode, args[0], args[1], args[2], args[0] + args[1]]
        program[i] = args[0] * args[1]
        offset(4)
        break
      case "03":
        instruction = [opCode, args[0], getInput()]
        program[args[0]] = getInput()
        // program[a] = getInput()
        offset(2)
        break
      case "04":
        instruction = [opCode, args[0], program[args[0]]]
        // eslint-disable-next-line no-console
        console.log(`Program output: ${program[args[0]]}`)
        // console.log(`Program output: ${program[a]}`)
        offset(2)
        break
      case "99":
        instruction = [opCode]
        break interpreter
      default:
        instruction = [opCode]
        offset(4)
        // throw new Error(`Invalid op code: ${opCode}`)
    }

    // eslint-disable-next-line no-console
    // console.log(modes, "-", instruction.join())
    // console.log(args)
  }

  return program[0]
}

function getInput () {

  return 1
}

function getInstruction () {}

module.exports = computor
