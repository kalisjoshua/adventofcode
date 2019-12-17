const input = process.argv[2]
  .trim().split(/\n/)

// key orbits value
const directOrbitsMap = input
  .map((orbit) => orbit.split(")"))
  .reduce((acc, [a, b]) => (acc[b] = a, acc), {})

const countOrbits = (orbiter) => 1 + (directOrbitsMap[orbiter] === "COM"
  ? 0
  : countOrbits(directOrbitsMap[orbiter]))

const totalOrbits = Array.from(new Set(Object.keys(directOrbitsMap)).values())
  .map(countOrbits)
  .reduce((a, b) => a + b)

// eslint-disable-next-line no-console
console.log(totalOrbits)
