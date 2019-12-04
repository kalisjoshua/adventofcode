const input = process.argv[2]
  .match(/\d+/g)

input[1] = "12"
input[2] = "2"

const computor = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
}

let offset = 0

processing:
// eslint-disable-next-line no-constant-condition
while (true) {
  const [opCode, nounIndex, verbIndex, outputIndex] = input
    .slice(offset)

  if (/^99$/.test(opCode)) {
    break processing
  } else if (opCode in computor) {
    // if (/^19690720$/.test(100 * noun + verb)) {
    //   throw new Error("FOUND!")
    //   break processing
    // }
    input[outputIndex] = computor[opCode](+input[nounIndex], +input[verbIndex])
    offset = offset + 4
  } else {
    throw new Error(`Invalid op code: ${opCode}`)
  }
}

// eslint-disable-next-line no-console
console.log(input[0])
