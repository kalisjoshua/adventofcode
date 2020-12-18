const cleanInput = (input) => input
  .trim()
  .split(/\n/)

function applyBitMask (reducer, value) {
  return parseInt(value, 10)
    .toString(2)
    .padStart(36, '0')
    .split('')
    .reduce(reducer, '')
}

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const result = input
    .reduce(({mask, memory}, line, index, all) => {
      if (/^mask/.test(line)) {
        [mask] = line.split(' = ').slice(1)
      } else {
        const [address, value] = line
          .match(/^mem\[(\d+)\] = (\d+)/)
          .slice(1)
        const masked = applyBitMask((acc, bit, pos) => {
          switch (mask[pos]) {
            case 'X': return `${acc}${bit}`
            default: return `${acc}${mask[pos]}`
          }
        }, value)

        memory[address] = parseInt(masked, 2)
      }

      return all[index + 1]
        ? {mask, memory}
        : memory.reduce((a, b) => a + b)
    }, {mask: '', memory: []})

  report(result, 8332632930672)
}

function partTwo (input, report) {
  input = cleanInput(`mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`)

  const result = input
    .reduce(({mask, memory}, line, index, all) => {
      if (/^mask/.test(line)) {
        [mask] = line.split(' = ').slice(1)
      } else {
        const [address, value] = line
          .match(/^mem\[(\d+)\] = (\d+)/)
          .slice(1)
        const floating = applyBitMask((acc, bit, pos) => {
          switch (mask[pos]) {
            case '0': return `${acc}${bit}`
            case '1': return `${acc}1`
            default: return `${acc}X`
          }
        }, address)

        console.log(floating)
        floating
          .split('')
          .reduce((options, char) => (
            char !== 'X'
              ? options
              : options.map((opt, count) => opt.replace(char, count % 2))
          ), Array(floating.match(/X/g).length * 2).fill(floating))
          .forEach((location) => {
            console.log(location)
            memory[parseInt(location, 2)] = parseInt(value, 10)
          })
      }

      if (!all[index + 1]) {
        console.log(memory)
      }

      return all[index + 1]
        ? {mask, memory}
        : memory.reduce((a, b) => a + b)
    }, {mask: '', memory: []})

report(result)
}

module.exports = main
