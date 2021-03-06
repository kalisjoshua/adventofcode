const crypto = require('crypto')

const LIMIT = 9999

const md5 = (str) => crypto
  .createHash('md5')
  .update(str)
  .digest('hex')

function main (input, libs) {
  // input = input

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  let hash
  let result = 346385

  do {
    hash = md5(`${input}${result}`)
    result += 1
  } while (result < LIMIT && !hash.startsWith('00000'))

  report(result, 346386)
}

function partTwo (input, report) {
  let hash
  let result = 9958217

  do {
    hash = md5(`${input}${result}`)
    result += 1
  } while (result < LIMIT && !hash.startsWith('000000'))

  report(result, 9958218)
}

module.exports = main
