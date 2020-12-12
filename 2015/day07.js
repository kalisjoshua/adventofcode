function main (input, libs) {
  input = input
    .trim()
    // .split(/\n/)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const rSignal = /^([^\s]+)?(?:\s*(AND|OR|(?:L|R)SHIFT|NOT)\s+([^\s]+))?\s+->\s+([^\s]+)$/
  const result = input
    .match(/-> a/)
    // .reduce((output, line) => {
    //   const [a, op, b, wire] = line.match(rSignal).slice(1)
    //   let signal
    //
    //   switch (op) {
    //     case 'AND':
    //       // eslint-disable-next-line no-bitwise
    //       signal = (output[a] || a) & (output[b] || b)
    //       break
    //     case 'OR':
    //       // eslint-disable-next-line no-bitwise
    //       signal = (output[a] || a) | (output[b] || b)
    //       break
    //     case 'LSHIFT':
    //       // eslint-disable-next-line no-bitwise
    //       signal = (output[a] || a) << (output[b] || b)
    //       break
    //     case 'RSHIFT':
    //       // eslint-disable-next-line no-bitwise
    //       signal = (output[a] || a) >> (output[b] || b)
    //       break
    //     case 'NOT':
    //       // eslint-disable-next-line no-bitwise
    //       signal = 2 ** 16 + ~(output[b] || b)
    //       break
    //     default:
    //       signal = output[a] || a
    //   }
    //
    //   output[wire] = signal
    //
    //   return output
    // }, {})

  report(result)
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
