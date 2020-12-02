delete require.cache["../computor.js"]
const computor = require("../computor.js")

const permute = require("../../lib/permute")
const pipeline = require("../../lib/pipeline")
const range = require("../../lib/range")

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)

function phaseSetting (phases, memory) {
  const outputLog = []

  const amps = phases
    .map((phase, index, {length}) => {
      let program = computor(memory.slice(0), 0, outputLog)
        .next(phase)

      return (message) => {
        const output = () => program.log.slice(-1)[0]

        while (program.next) {
          program = program.next(message)

          if (program.log) {
            amps[index === length - 1 ? 0 : index + 1](output())
          }
        }

        return output()
      }
    })

  return amps[0](0)
}

function run (program, expected, rangeShift = 0) {
  program = program
    .split(",")

  const maxThrusterOutput = pipeline(
    range(5, rangeShift),
    permute,
    Array.from,
    (permutations) => permutations.map((phases) => phaseSetting(phases, program)),
    (outputs) => Math.max.apply(null, outputs)
  )

  if (expected) {
    if (maxThrusterOutput != expected) {
      run.anyFailing = true
      log(`FAIL - ${maxThrusterOutput} should be ${expected}`)
    }
  } else {
    if (!run.anyFailing) {
      log("try this", maxThrusterOutput)
    }
  }
}

run("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0", 43210)
run("3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0", 54321)
run("3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0", 65210)
run("3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5", 139629729, 5)
run(`3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`, 18216, 5)

run(process.argv[2], 366376)
run(process.argv[2], 21596786, 5)

if (!run.anyFailing) log("Program completed successfully")
