const log = require('./log')

const stillWorking = Symbol('still working')

function report (part, result, expected = stillWorking) {
  if (result === undefined) {
    log(part, Symbol('Still working on getting an answer.'))
  } else if (expected === stillWorking) {
    log(part, 'current working result: [', result, '] try that.')
  } else if (result !== expected) {
    log(part, 'not complete:', expected, 'does not equal', result)
  } else {
    log(part, 'completed successfully.')
  }
}

module.exports = report
