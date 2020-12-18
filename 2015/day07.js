const isNum = (n) => `${n}` === parseInt(n, 10).toString()

function main (input, libs) {
  input = input
    .trim()
    .split(/\n/)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  // function followWire (source, wire) {
  //   const [a, op, b] = source
  //     .match(RegExp(`^([^\\s]+)?(?:\\s*(AND|OR|(?:L|R)SHIFT|NOT)\\s+([^\\s]+))?\\s+->\\s+(${wire})$`, 'm'))
  //     .slice(1)
  //   console.log(a, op, b, wire)
  //
  //   const resolve = (v) => (isNum(v) ? parseInt(v, 10) : followWire(source, v))
  //
  //   switch (op) {
  //     // eslint-disable-next-line no-bitwise, no-multi-spaces
  //     case 'AND':     return resolve(a) & resolve(b)
  //     // eslint-disable-next-line no-bitwise, no-multi-spaces
  //     case 'LSHIFT':  return resolve(a) << resolve(b)
  //     // eslint-disable-next-line no-bitwise, no-multi-spaces
  //     case 'NOT':     return 2 ** 16 + ~resolve(b)
  //     // eslint-disable-next-line no-bitwise, no-multi-spaces
  //     case 'OR':      return resolve(a) | resolve(b)
  //     // eslint-disable-next-line no-bitwise, no-multi-spaces
  //     case 'RSHIFT':  return resolve(a) >> resolve(b)
  //     // eslint-disable-next-line no-bitwise, no-multi-spaces
  //     default:        return resolve(a)
  //   }
  // }
  //
  // const result = followWire(input, 'a')
  //
  // // ========================================================

  // const rSignal = /^([^\s]+)?(?:\s*(AND|OR|(?:L|R)SHIFT|NOT)\s+([^\s]+))?\s+->\s+([^\s]+)$/
  // let line
  // let processing = input.slice(0)
  // const signals = {}
  //
  // while (processing.length) {
  //   [line, ...processing] = processing
  //   const [a, op, b, wire] = line.match(rSignal).slice(1)
  //   // console.log(line, {a, op, b, wire})
  //
  //   switch (op) {
  //     case 'AND':
  //       if (signals[a] && signals[b]) {
  //         // eslint-disable-next-line no-bitwise
  //         signals[wire] = signals[a] & signals[b]
  //       } else {
  //         processing.push(line)
  //       }
  //       break
  //     case 'LSHIFT':
  //       if (signals[a] && signals[b]) {
  //         // eslint-disable-next-line no-bitwise
  //         signals[wire] = signals[a] << signals[b]
  //       } else {
  //         processing.push(line)
  //       }
  //       break
  //     case 'NOT':
  //       if (signals[a] && signals[b]) {
  //         // eslint-disable-next-line no-bitwise
  //         signals[wire] = 2 ** 16 + ~signals[b]
  //       } else {
  //         processing.push(line)
  //       }
  //       break
  //     case 'OR':
  //       if (signals[a] && signals[b]) {
  //         // eslint-disable-next-line no-bitwise
  //         signals[wire] = signals[a] | signals[b]
  //       } else {
  //         processing.push(line)
  //       }
  //       break
  //     case 'RSHIFT':
  //       if (signals[a] && signals[b]) {
  //         // eslint-disable-next-line no-bitwise
  //         signals[wire] = signals[a] >> signals[b]
  //       } else {
  //         processing.push(line)
  //       }
  //       break
  //     default:
  //       if (isNum(a)) {
  //         signals[wire] = a
  //       } else {
  //         processing.push(line)
  //       }
  //   }
  // }
  // const result = input
  //   .match(/-> a/)
  //   // .reduce((output, line) => {
  //   //   const [a, op, b, wire] = line.match(rSignal).slice(1)
  //   //   let signal
  //   //
  //   //   switch (op) {
  //   //     case 'AND':
  //   //       // eslint-disable-next-line no-bitwise
  //   //       signal = (output[a] || a) & (output[b] || b)
  //   //       break
  //   //     case 'OR':
  //   //       // eslint-disable-next-line no-bitwise
  //   //       signal = (output[a] || a) | (output[b] || b)
  //   //       break
  //   //     case 'LSHIFT':
  //   //       // eslint-disable-next-line no-bitwise
  //   //       signal = (output[a] || a) << (output[b] || b)
  //   //       break
  //   //     case 'RSHIFT':
  //   //       // eslint-disable-next-line no-bitwise
  //   //       signal = (output[a] || a) >> (output[b] || b)
  //   //       break
  //   //     case 'NOT':
  //   //       // eslint-disable-next-line no-bitwise
  //   //       signal = 2 ** 16 + ~(output[b] || b)
  //   //       break
  //   //     default:
  //   //       signal = output[a] || a
  //   //   }
  //   //
  //   //   output[wire] = signal
  //   //
  //   //   return output
  //   // }, {})

  // report(result)
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
