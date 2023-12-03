const NOPE = Symbol("NOPE");
const cleanRawInput = (raw) => {
  const size = raw.trim().split("\n").length + 2;
  const row = Array(size).fill(".").join("");

  return [
    row,
    raw
      .trim()
      .split("\n")
      .map((line) => `.${line}.`)
      .join("\n"),
    row,
  ].join("\n");
};

const example = cleanRawInput(`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`);

function getPartsAndSymbols(schematic) {
  const flat = schematic.replace(/\n/g, "");
  const grid = schematic.split(/\n/);

  const substr = (
    part,
    mod,
    col = flat.indexOf(part) % grid.length,
    row = mod + parseInt(flat.indexOf(part) / grid.length, 10)
  ) => grid[row].slice(Math.max(col - 1, 0), col + part.length + 1);

  const result = schematic
    .match(/\d+/g) // find all potential part numbers
    .map((part) => [
      parseInt(part, 10),
      // capture their surrounding character strings
      [substr(part, -1), substr(part, 0), substr(part, 1)]
        .join("")
        // reduce the string to only the symbols, if any
        .replace(/[\.\d]/g, ""),
    ]);

  return result;
}

function partOne(input, report, answer) {
  const result = getPartsAndSymbols(input).reduce(
    (acc, [part, symbol]) => (symbol.length === 1 ? acc + part : acc),
    0
  );

  report("Part one", result, answer);
}

function partTwo(input, report, answer) {
  const result = input;

  report("Part two", result, answer);
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw);

  // 552188 too high
  // 548923 no hint
  // 550563 no hint
  // 550174 too low
  partOne(input, report, NOPE);
  // partTwo(input, report, NOPE)
};
