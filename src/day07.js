const computorFactory = require("../lib/reload.js")("../lib/computor.js")
const permute = require("../lib/permute")
const pipeline = require("../lib/pipeline")
const range = require("../lib/range")

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)
// // eslint-disable-next-line no-constant-condition
// const debug = false
//   ? (...args) => log("DEBUG", ...args)
//   : () => {}

function phaseSetting (phases, memory) {
  return phases
    .reduce((ampInput, phase) => {
      const ar = [phase, ampInput]
      const get = () => ar.shift()
      const puts = (val) => puts.val = [...(puts.val || []), val]
      computorFactory(get, puts)(memory.slice(0))

      return puts.val.pop()
    }, 0)
}

function run (program, expected) {
  run.run = (run.run || 0) + 1
  program = program
    .match(/-?\d+/g)
    .slice(0)

  const maxThrusterOutput = pipeline(
    range(5, -1),
    permute,
    Array.from,
    (permutations) => permutations.map((phases) => phaseSetting(phases, program)),
    (outputs) => Math.max.apply(null, outputs)
  )

  if (expected) {
    if (maxThrusterOutput != expected) {
      run.anyFailing = true
      log(`${run.run} - ${maxThrusterOutput} should be ${expected}`)
    }
  } else {
    if (!run.anyFailing) {
      log("try this", maxThrusterOutput)
    }
  }
}

run(`3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`, 43210)
run(`3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0`, 54321)
run(`3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0`, 65210)

run(process.argv[2], 366376)

if (!run.anyFailing) log("Program completed successfully")
