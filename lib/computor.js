const operations = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
}

function computor (program) {
  let offset = 0

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [opCode, a, b, i] = program
      .slice(offset)

    if (/^99$/.test(opCode)) {
      return program[0]
    } else if (opCode in operations) {
      program[i] = operations[opCode](+program[a], +program[b])
      offset = offset + 4
    } else {
      throw new Error(`Invalid op code: ${opCode}`)
    }
  }
}

module.exports = computor
