const interpreter = require('./interpreter.js')

function main (input, libs) {
  input = input
    .trim()
    .split(/\n/)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const [result] = interpreter(input).slice(1)

  report(result, 2034)
}

function partTwo (input, report) {
  let result

  input
    .some((line, lineNumber, program) => {
      let state = false

      if (line.match(/^nop|jmp/)) {
        const altered = program.slice(0)

        altered[lineNumber] = line.startsWith('nop')
          ? line.replace('nop', 'jmp')
          : line.replace('jmp', 'nop');

        [state, result] = interpreter(altered)
      }

      return state
    })

  report(result, 672)
}

module.exports = main
