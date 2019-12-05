const input = process.argv[2]
  .match(/\d+/g)

const operations = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
}

function compute (noun, verb) {
  let program = input.slice(0)

  program[1] = noun
  program[2] = verb

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

let noun = 12
let verb = 2
const target = 19690720

while (target > compute(++noun, verb));
--noun
while (target > compute(noun, ++verb));

// eslint-disable-next-line no-console
console.log(100 * noun + verb)
