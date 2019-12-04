import raw from "./input"
const input = raw
  .match(/\d+/g)

input[1] = "12"
input[2] = "2"

const computor = {
  1(a, b) {return a + b},
  2(a, b) {return a * b},
}

let offset = 0

processing:
// eslint-disable-next-line no-constant-condition
while (true) {
  const [opCode, noun, verb, outputIndex] = input
    .slice(offset)

  if (/^99$/.test(opCode)) {
    break processing
  } else if (opCode in computor) {
    input[outputIndex] = computor[opCode](+input[noun], +input[verb])
    offset = offset + 4
  } else {
    throw new Error(`Invalid op code: ${opCode}`)
  }

  if (/^19690720$/.test(input[outputIndex])) {
    throw new Error("FOUND")
    // break processing
  }
}

export default input[0]
