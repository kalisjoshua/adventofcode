const log = require('./log')

function report (part, result, expected = Symbol()) {
  if (result !== expected) {
    log(part, 'not complete:', expected, 'does not equal', result)
  } else {
    log(part, 'completed successfully.')
  }
}

module.exports = report
