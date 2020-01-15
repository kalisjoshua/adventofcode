const computor = require("../lib/reload.js")("../lib/computor.js")

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)

function run (startingInput, memory, expected) {
  memory = memory
    .match(/-?\d+/g)
    .slice(0)

  let program = computor(memory)
    .next(startingInput)

  while (!program.done) {
    program = program.next(program.log.slice(-1)[0])
  }

  const result = program.log.slice(-1)[0]

  if (expected) {
    if (expected !== result) {
      run.anyFailing = true
      log("FAIL!", result)
      log(program)
    }
  } else {
    log("Try this", result)
  }
}

const eight = "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99"
run(1, eight, 999)
run(8, eight, 1000)
run(9, eight, 1001)

run(9, "3,0,4,0,99", 9)

run(1, process.argv[2], 7692125)
run(5, process.argv[2], 14340395)

if (!run.anyFailing) log("Program completed successfully")
