const input = process.argv[2]
  .trim()
  .split("-")

let [min] = input
const options = []

const alwaysIncreasing = (num) =>
  num == num.toString().split("").sort().join("")
const properSequence = (num) =>
  (num.toString().match(/(\d)\1+/g) || []).some((s) => s.length === 2)

do {
  if (properSequence(min) && alwaysIncreasing(min)) options.push(min)
} while (++min < input[1])

// eslint-disable-next-line no-console
console.log("Total options", options.length)
