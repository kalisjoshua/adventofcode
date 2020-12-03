function main (input, {report}) {
  input = input
    .split(/\n/)

  // key orbits value
  const directOrbitsMap = input
    .map((orbit) => orbit.split(")"))
    .reduce((acc, [a, b]) => (acc[b] = a, acc), {})

  const countOrbits = (orbiter) => 1 + (directOrbitsMap[orbiter] === "COM"
    ? 0
    : countOrbits(directOrbitsMap[orbiter]))

  const checksum = Array.from(new Set(Object.keys(directOrbitsMap)).values())
    .map(countOrbits)
    .reduce((a, b) => a + b)

  const follow = (orbit, acc = []) => directOrbitsMap[orbit] === "COM"
    ? [orbit, ...acc]
    : [orbit, ...follow(directOrbitsMap[orbit], acc)]

  const [SAN, YOU] = [
    new Set(follow(directOrbitsMap.SAN).reverse()),
    new Set(follow(directOrbitsMap.YOU).reverse()),
  ]

  const transfers = (function () {
    let all = new Set([
      ...Array.from(SAN.values()),
      ...Array.from(YOU.values()),
    ])

    for (const el of all) {
      if (SAN.has(el) && YOU.has(el)) {
        all.delete(el)
      }
    }

    return all.size
  }())

  report('Part one', checksum, 241064)
  report('Part two', transfers, 418)
}

module.exports = main
