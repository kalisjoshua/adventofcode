const computor = require('./computor.js')

function main (input, {report}) {
  partOne(input, (...args) => report('Part one', ...args))
  partTwo(input, (...args) => report('Part two', ...args))
}

function run (startingInput, memory) {
  memory = memory
    .match(/-?\d+/g)
    .slice(0)

  let program = computor(memory)
    .next(startingInput)

  while (!program.done) {
    program = program.next(program.log.slice(-1)[0])
  }

  return program.log.slice(-1)[0]
}

// const eight = [
//   '3,21,1008,21,8,20,1005,20,22',
//   ',107,8,21,20,1006,20,31,1106,0',
//   ',36,98,0,0,1002,21,125,20,4,20',
//   ',1105,1,46,104,999,1105,1,46,1101',
//   ',1000,1,20,4,20,1105,1,46,98,99',
// ].join('')
// run(1, eight, 999)
// run(8, eight, 1000)
// run(9, eight, 1001)
//
// run(9, '3,0,4,0,99', 9)

function partOne (input, report) {
  report(run(1, input), 7692125)
}

function partTwo (input, report) {
  report(run(5, input), 14340395)
}

module.exports = main
