const NOPE = Symbol("NOPE");
const cleanRawInput = (raw) =>
  raw
    .trim()
    .split(/\n/)
    .map((card) =>
      card
        .replace(/card\s*\d+:\s*/i, "")
        .split("|")
        .map((str) => str.match(/\d+/g))
    );

const example = cleanRawInput(`
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`);

function partOne(input, report, answer) {
  const result = input.reduce((acc, [win, num]) => {
    const found = num.filter((n) => win.includes(n)).length;

    if (found) acc += 1 << (found - 1);

    return acc;
  }, 0);

  report("Part one", result, answer);
}

function partTwo(input, report, answer) {
  const result = input
    .reduce(
      ([sum, set], [win, num], index) => {
        set[index] = 1 + (set[index] ?? 0);

        let found = num.filter((n) => win.includes(n)).length;

        while (set[index]) {
          sum += 1;

          let i = 0;

          while (i++ < found) {
            set[index + i] = 1 + (set[index + i] ?? 0);
          }

          set[index]--;
        }

        return [sum, set];
      },
      [0, {}]
    )
    .at(0);

  report("Part two", result, answer);
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw);

  partOne(input, report, 21138);
  partTwo(input, report, 7185540);
};
