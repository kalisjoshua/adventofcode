module.exports = (input, {report}) => {
  input = input
    .trim()
    .split(/\n/)
    .map((line) => {
      const [command, value] = line.trim().split(/\s+/)

      return [command, parseInt(value, 10)]
    })

  const partOne = input
    .reduce((acc, [command, value]) => {
      const [depth, position] = acc

      switch (command) {
        case "forward":
          return [depth, position + value]
        case "down":
          return [depth + value, position]
        case "up":
          return [depth - value, position]
        default:
          throw new Error(`Unknown command "${command}"`)
      }
    }, [0, 0])
    .reduce((a, b) => a * b)

  const partTwo = input
    .reduce((acc, [command, value]) => {
      const [aim, depth, position] = acc

      switch (command) {
        case "forward":
          return [aim, depth + aim * value, position + value]
        case "down":
          return [aim + value, depth, position]
        case "up":
          return [aim - value, depth, position]
        default:
          throw new Error(`Unknown command "${command}"`)
      }
    }, [0, 0, 0])
    .slice(1)
    .reduce((a, b) => a * b)

  report('Part one', partOne, 2102357)
  report('Part two', partTwo, 2101031224)
}
