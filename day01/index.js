import raw from "./input"
const input = raw
  .match(/\d+/g)

function fuel (mass) {
  const f = Math.floor(mass / 3) - 2

  return f > 0 ? f + fuel(f) : 0
}

const result = input
  .map(fuel)
  .reduce((a, x) => a + x)

export default result
