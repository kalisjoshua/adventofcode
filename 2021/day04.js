const example = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`
const isWinner = (card, list) =>
  card.some((row) => row.every((num) => list.includes(num)))

function bingoParser (input) {
  const hopper = input
    .shift()
    .split(",")
    .map(Number)
  const cards = input
    .reduce(([head = [], ...tail], line) => {
      if (line.length) {
        head.push(line.trim().split(/\s+/).map(Number))
      }

      return (head.length === 5)
        ? [[], head, ...tail]
        : [head, ...tail]
    }, [])
    .slice(1)
    .reverse()
    // cards start with only 5 rows; add columns as rows
    .map((card) => card.concat(card.reduce((acc, row) => row.map((n, i) => (acc[i] || []).concat(n)), [])))

  return {cards, hopper}
}

function firstWinner (cards, list) {

  return cards
    .reduce((winner, card) => winner || isWinner(card, list) && unmarked(card, list), false)
}

function lastWinner (cards, list) {

  return list
    .reduce((winner, num, index) => {
      if (winner !== false) return winner

      const called = list.slice(0, index)

      if (cards.length > 1) {
        cards = cards
          .filter((card) => !isWinner(card, called))
      } else if (isWinner(cards[0], called)) {
        winner = unmarked(cards[0], called)
      }

      return winner
    }, false)
}

function unmarked (card, list) {

  return card
    .slice(0, 5)
    .flatMap((row) => row)
    .filter((num) => !list.includes(num))
    .reduce((a, b) => a + b) * list.pop()
}

module.exports = (input, {report}) => {
  input = input.trim().split(/\n/)

  const {cards, hopper} = bingoParser(input)

  const partOne = hopper
    .reduce((bingo, _, index, list) => {

      return bingo || firstWinner(cards, list.slice(0, index))
    }, false)

  const partTwo = lastWinner(cards, hopper)

  report('Part one', partOne, 72770)
  report('Part two', partTwo, 13912)
}
