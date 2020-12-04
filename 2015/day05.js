function main (input, {report}) {
  input = input
    .trim()
    .split(/\n/)

  partOne(input, (...args) => report('Part one', ...args))
  partTwo(input, (...args) => report('Part two', ...args))
}

function partOne (input, report) {
  const result = input
    .filter((str) => {
      const vowels = (str.match(/[aeiou]/g) || []).length >= 3
      const double = !!str.match(/(.)\1/)
      const naughty = ['ab', 'cd', 'pq', 'xy']
        .some((not) => str.includes(not))

      return vowels && double && !naughty
    })
    .length

  report(result, 236)
}

function partTwo (input, report) {
  const result = input
    .filter((str) => {
      const repeatPair = !!/(..).*?\1/.exec(str)
      const repeatOne = !!/(.).\1/.exec(str)

      return repeatPair && repeatOne
    })
    .length

  report(result, 51)
}

module.exports = main
