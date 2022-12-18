const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
  .reduce(parser, {})
const rParse = /^Valve ([A-Z]+) has flow rate=(\d+).*?((?:[A-Z]+(?:, )?)+)/

function parser (acc, line) {
  const [valve, flow, others] = line
    .trim()
    .match(rParse)
    .slice(1)

  acc[valve] = {
    flow: parseInt(flow, 10),
    others: others.split(', ')
  }

  return acc
}

function partOne(input, report, answer) {
  const result = input
  console.log(Object.entries(result).filter(([,{flow}]) => flow))

  report('Part one', 1, answer)
}

function partTwo(input, report, answer) {
  const result = input

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  const example = cleanRawInput(`Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`)

  partOne(input, report, NOPE)
  // partTwo(input, report, NOPE)
}
