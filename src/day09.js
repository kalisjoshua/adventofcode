const computor = require("../lib/reload.js")("../lib/computor.js")
// const pipeline = require("../lib/pipeline")

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)

function run (program, expected) {
  program = program
    .trim()
    .split(",")

  let result = computor(program)
    .next(1)

  while (result.next) {
    if (result.log) log(result.log.slice(-1)[0])
    result = result.next()
  }

  result = result.log.slice(-1)[0]

  if (expected) {
    if (expected != result) {
      run.anythingFailing = true
      log("FAIL", result)
    }
  }
  else {
    log("Try this", result)
  }
}

// provided test programs with expected output
run("1102,34915192,34915192,7,4,7,99,0", 1219070632396864)
run("104,1125899906842624,99", 1125899906842624)

run(process.argv[2], "3460311188")

if (!run.anyFailing) log("Program completed successfully")
