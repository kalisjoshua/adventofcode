const NOPE = Symbol("NOPE");
const cleanRawInput = (raw) => {
  const size = raw.trim().split("\n")[0].length;
  const row = Array(size).fill(".").join("") + "\n";

  return `${row}${raw}\n${row}`
    .split("\n")
    .filter(Boolean)
    .map((line) => `.${line}.`)
    .join("\n");
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

function getPartsPositions(source) {
  const grid = source.split(/\n/);
  const x = grid[0].length;
  const y = (coord) => parseInt(coord / grid.length, 10);

  const result = getPartsRecursive(source).map(([part, pos]) => [
    part,
    [-1, 0, 1]
      .map((mod) =>
        grid[mod + y(pos)].slice(
          (pos % x) - 1,
          (pos % x) + `${part}`.length + 1
        )
      )
      .join(""),
    [pos % x, y(pos)],
  ]);

  return result;
}

function getPartsRecursive(source, result = []) {
  const match = source.replace(/\n/g, "").match(/(\d+)/);

  return !match
    ? result
    : getPartsRecursive(
        source.replace(match[1], Array(match[1].length).fill("X").join("")),
        result.concat([[+match[1], match.index]])
      );
}

function getSymbolPosition(part, str, coord) {
  const { length } = `${part}`;
  const pos = str.indexOf("*");

  return [
    coord[0] + (pos % (length + 2)) - 1,
    coord[1] + parseInt(pos / (length + 2), 10) - 1,
  ];
}

function partOne(input, report, answer) {
  const result = getPartsPositions(input)
    .map(([num, str]) => [num, str.replace(/[\.\d]/g, "")])
    .reduce((acc, [part, { length }]) => (length === 1 ? acc + part : acc), 0);

  report("Part one", result, answer);
}

function partTwo(input, report, answer) {
  const result = getPartsPositions(input)
    .filter(([_, str]) => str.includes("*"))
    .map((part) => part.concat([getSymbolPosition(...part)]))
    .reduce(
      ([sum, set], [num, _z, _x, pos]) => {
        if (set[pos]) {
          sum += set[pos] * num;
        } else {
          set[pos] = num;
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

  partOne(input, report, 550934);
  partTwo(input, report, 81997870);
};
