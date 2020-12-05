function main (input, {report}) {
  const height = 6
  const width = 25

  const slices = input
    .match(new RegExp(`\\d{${height * width}}`, 'g'))

  const checksum = slices
    .map((layer) => ([layer.match(/0/g).length, layer, layer.match(/1/g).length, layer.match(/2/g).length]))
    .sort(([a], [b]) => a - b)[0]
    .slice(-2)
    .reduce((a, b) => a * b)

  report('Part one', checksum, 1848)

  const pixels = slices
    .map((s) => s.split(''))
    .reduce((acc, slice) => {
      let pointer = 0

      while (pointer < slice.length) {
        if (parseInt(acc[pointer], 10) === 2) {
          acc[pointer] = slice[pointer]
        }

        pointer += 1
      }

      return acc
    })
    .join('')
    .match(new RegExp(`\\d{${width}}`, 'g'))
    .map((s) => s.replace(/0/g, ' ').replace(/1/g, '#'))

  report('Part two', pixels)
}

module.exports = main
