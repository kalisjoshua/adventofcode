const log = require('./log')

const stillWorking = Symbol('still working')

function report (part, result, expected = stillWorking) {
  if (expected === stillWorking) {
    log(part, 'current working result: [', result, '] try that.')
  } else if (result !== expected) {
    log(part, 'not complete:', expected, 'does not equal', result)
  } else {
    log(part, 'completed successfully.')
  }
}

module.exports = report
