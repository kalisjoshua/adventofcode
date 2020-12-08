require('../lib/selfReload.js')(__dirname, 'interpreter.js')

const initializeMemory = () => ({
  acc: 0,
  exec: [],
})

function interpreter (program, memory = initializeMemory(), pointer = 0) {
  if (memory.exec.includes(pointer)) {
    return [false, memory.acc]
  }

  if (!program[pointer]) {
    return [true, memory.acc]
  }

  const [op, arg] = program[pointer]
    .match(/^(acc|jmp|nop)\s+([-+]\d+)\s*$/)
    .slice(1)

  memory.exec.push(pointer)

  switch (op) {
    case 'acc':
      memory.acc += parseInt(arg, 10)

      return interpreter(program, memory, pointer + 1)
    case 'jmp':
      return interpreter(program, memory, pointer + parseInt(arg, 10))
    case 'nop':
      return interpreter(program, memory, pointer + 1)
    default:
      throw new Error(`Unexpected opcode "${op}"`)
  }
}

module.exports = interpreter
