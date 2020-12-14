const cleanInput = (input) => input
  .trim()
  .split(/\n/)

function main (input, libs) {
//   input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0`
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  function applyBitMask (mask, value) {
    const binary = parseInt(value, 10)
      .toString(2)
      .padStart(36, '0')
      .split('')
      .reverse()
      .reduce((acc, bit, pos) => {
        switch (mask[mask.length - 1 - pos]) {
          case '0': return `0${acc}`
          case '1': return `1${acc}`
          default: return `${bit}${acc}`
        }
      }, '')

    return parseInt(binary, 2)
  }

  const result = input
    .reduce(({mask, memory}, line, index, all) => {
      if (/^mask/.test(line)) {
        [mask] = line.split(' = ').slice(1)
      } else {
        const [address, value] = line
          .match(/^mem\[(\d+)\] = (\d+)/)
          .slice(1)

        memory[address] = applyBitMask(mask, value)
      }

      return all[index + 1]
        ? {mask, memory}
        : memory.reduce((a, b) => a + b)
    }, {mask: '', memory: []})

  report(result)
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
