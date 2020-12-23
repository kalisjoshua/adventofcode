const cleanInput = (input) => input
  .trim()
  .replace(/player \d:\n/gi, '')
  .split(/\n\n/)
  .map((s) => s.split(/\n/).map(Number))
const copy = (obj) => JSON.parse(JSON.stringify(obj))

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(copy(input), (...args) => libs.report('Part one', ...args))
  partTwo(copy(input), (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  let counter = 0

  while (input[0].length && input[1].length && counter < 500) {
    const cards = [
      input[0].shift(),
      input[1].shift(),
    ]

    if (cards[0] > cards[1]) {
      input[0] = input[0].concat(cards)
    } else {
      input[1] = input[1].concat(cards.reverse())
    }

    counter += 1
  }

  const result = input
    .flat()
    .reduce((sum, card, index, {length}) => sum + (card * (length - index)), 0)

  report(result, 35397)
}

function partTwo (input, report) {
  function combat ([one, two], game = 1) {
    let counter = 0
    const hands = [one.slice(0), two.slice(0)]
    const history = []

    function winner (i, cards) {
      const shadow = cards.slice(0)

      if (i === 1) {
        shadow.reverse()
      }

      hands[i] = hands[i].concat(shadow)
    }

    while (hands[0].length && hands[1].length && counter < 1250) {
      const state = hands.flat().join()

      if (history.find((round) => round === state)) {
        return [[1], []]
      }

      history.push(state)

      const cards = [
        hands[0].shift(),
        hands[1].shift(),
      ]
      // console.log(`-- Round ${counter + 1} --`)
      console.log(`-- Round ${counter + 1} (Game ${game}) --\n`, {
        'Player 1 deck': hands[0],
        'Player 2 deck': hands[1],
        'Player 1 plays': cards[0],
        'Player 2 plays': cards[1],
      })

      if (hands[0].length >= cards[0] && hands[1].length >= cards[1]) {
        const subGame = combat(hands, game + 1)
        // console.log('recursing', subGame)

        winner(subGame[0].length > subGame[1].length ? 0 : 1, cards)
      } else {
        winner(cards[0] > cards[1] ? 0 : 1, cards)

        if (hands[0].length === 0 || hands[1].length === 0) {
          return hands
        }
      }

      counter += 1
    }

    if (!(hands[0].length === 0 || hands[1].length === 0)) {
      console.log(hands)
      throw new Error('Game not complete.')
    }

    return hands
  }
  const result = combat(input)
    .flat()
    .reduce((sum, card, index, {length}) => sum + (card * (length - index)), 0)
  console.log(result)

  report()
}

module.exports = main
