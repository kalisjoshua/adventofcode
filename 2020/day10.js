const cleanInput = (input) => input
  .trim()
  .split(/\n/)
  .map(Number)
  .sort((a, b) => a - b)

function main (input, libs) {
  input = cleanInput(input)
  input = input
    .concat(Math.max(...input) + 3)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const jolts = input
    .reduce((diffs, num, index, all) => {
      diffs[!index ? num : num - all[index - 1]] += 1

      return diffs
    }, [0, 0, 0, 0])
  const result = jolts[1] * jolts[3]

  report(result, 2277)
}

function partTwo (input, report) {
  const diffs = (acc, num, i, all) => (!i ? [num] : [...acc, num - all[i - 1]])
  const pseudoTribonacci = [1, 2, 4, 7]
  const result = input
    .reduce(diffs, [])
    .join('')
    .match(/1+/g)
    .reduce((a, {length}) => a * pseudoTribonacci[length - 1], 1)

  report(result, 37024595836928)
}

module.exports = main
