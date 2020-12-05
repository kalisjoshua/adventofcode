const computor = require('./computor.js')

function main (input, {permute, pipeline, range, report}) {
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

  function run (program, rangeShift = 0) {
    program = program
      .split(',')

    const maxThrusterOutput = pipeline(...[
      range(5, rangeShift),
      permute,
      Array.from,
      (permutations) => permutations.map((phases) => phaseSetting(phases, program)),
      (outputs) => Math.max.apply(null, outputs),
    ])

    return maxThrusterOutput
  }

  report('Part one', run(input), 366376)
  report('Part two', run(input, 5), 21596786)
}

module.exports = main
