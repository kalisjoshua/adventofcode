// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)

const height = 6
const width = 25
const image = process.argv[2].trim()

const slices = image
  .match(new RegExp(`\\d{${height * width}}`, "g"))

const checksum = slices
  .map((layer) => ([layer.match(/0/g).length, layer, layer.match(/1/g).length, layer.match(/2/g).length]))
  .sort(([a], [b]) => a > b ? 1 : a < b ? -1 : 0)[0]
  .slice(-2)
  .reduce((a, b) => a * b)

if (checksum !== 1848) log("FAIL", checksum)
else log("Checksum good")

// const layers = slices
//   .map((slice) => slice.match(new RegExp(`\\d{${width}}`, "g")))

const pixels = slices
  .map((s) => s.split(""))
  .reduce((acc, slice) => {
    let pointer = 0

    while (pointer < slice.length) {
      if (acc[pointer] == 2) {
        acc[pointer] = slice[pointer]
      }

      pointer++
    }

    return acc
  })
  .join("")
  .match(new RegExp(`\\d{${width}}`, "g"))
  .map((s) => s.replace(/0/g, " ").replace(/1/g, "#"))

log(pixels)
