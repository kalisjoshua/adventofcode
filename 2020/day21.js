const cleanInput = (input) => input
  .trim()
  .split(/\n/)
  .map((line) => {
    const [match, allergens] = line.match(/\(contains ([^)]+)\)/)
    const ingredients = line
      .replace(match, '')
      .trim()
      .split(' ')

    return [ingredients, allergens.split(', ')]
  })

function main (input, libs) {
  input = cleanInput(input)

  const possibilities = input
    .reduce((acc, [ingredients, allergens]) => {
      allergens
        .forEach((allergen) => {
          acc[allergen] = acc[allergen]
            ? acc[allergen].filter((ingred) => ingredients.includes(ingred))
            : ingredients
        })

      return acc
    }, {})

  let possibleAllergens = Reflect.ownKeys(possibilities)

  do {
    const allergen = possibleAllergens
      .filter((key) => possibilities[key].length === 1)
      .shift()

    possibleAllergens = possibleAllergens
      .filter((i) => i !== allergen)

    possibleAllergens
      .forEach((key) => {
        possibilities[key] = possibilities[key]
          .filter((i) => i !== possibilities[allergen][0])
      })
  } while (possibleAllergens.length)

  const found = Reflect.ownKeys(possibilities)
    .map((key) => {
      possibilities[key] = possibilities[key].shift()

      return possibilities[key]
    })

  const nonAllergenic = Array.from(input
    .reduce((acc, [line]) => {
      line
        .filter((i) => !found.includes(i))
        .forEach((item) => acc.add(item))

      return acc
    }, new Set()))

  const counts = input
    .reduce((acc, [line]) => {
      line
        .forEach((ingredient) => {
          if (nonAllergenic.includes(ingredient)) {
            acc[ingredient] = (acc[ingredient] || 0) + 1
          }
        })

      return acc
    }, {})

  const partOneAnswer = Reflect.ownKeys(counts)
    .reduce((sum, key) => sum + counts[key], 0)

  const partTwoAnswer = Reflect.ownKeys(possibilities)
    .sort()
    .map((key) => possibilities[key])
    .join(',')

  // main.libs = libs

  libs.report('Part one', partOneAnswer, 2287)
  // partOne(partOneAnswer, (...args) => libs.report('Part one', ...args))
  libs.report('Part two', partTwoAnswer, 'fntg,gtqfrp,xlvrggj,rlsr,xpbxbv,jtjtrd,fvjkp,zhszc')
  // partTwo(input, (...args) => libs.report('Part two', ...args))
}

// function partOne (input, report) {
//   report(input, 2287)
// }

// function partTwo (input, report) {
//   // const result = input
//
//   report()
// }

module.exports = main
