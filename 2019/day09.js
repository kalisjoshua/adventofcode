const computor = require('./computor.js')

function main (input, {report}) {
  function run (program) {
    program = program
      .trim()
      .split(',')

    let result = computor(program)
      .next(1)

    while (result.next) {
      result = result.next()
    }

    return result.log.slice(-1)[0]
  }

  // // provided test programs with expected output
  // run('1102,34915192,34915192,7,4,7,99,0', 1219070632396864)
  // run('104,1125899906842624,99', 1125899906842624)

  report('Part one', run(input), 3460311188)
}

module.exports = main
