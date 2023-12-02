const NOPE = Symbol("NOPE");
const cleanRawInput = (raw) => raw.trim().split(/\n/);

const example = cleanRawInput(`
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`);
const limits = { red: 12, green: 13, blue: 14 };

function minmax(acc, str) {
  const [num, color] = str.split(" ");

  if (acc[color] < num) acc[color] = +num;

  return acc;
}

function parse(input) {
  const rGame = /game \d+:\s*/i;
  const rSet = /\d+\s*\w+/g;

  const result = input.map((line) => {
    const sets = line
      .replace(rGame, "")
      .match(rSet)
      .reduce(minmax, { red: 0, green: 0, blue: 0 });

    return sets;
  });

  return result;
}

function sumIds(acc, { red, green, blue }, index) {
  if (red <= limits.red && green <= limits.green && blue <= limits.blue) {
    acc += index + 1;
  }
  return acc;
}

function sumPower(acc, { red, green, blue }) {
  return acc + red * green * blue;
}

function partOne(input, report, answer) {
  const result = parse(input).reduce(sumIds, 0);

  report("Part one", result, answer);
}

function partTwo(input, report, answer) {
  const result = parse(input).reduce(sumPower, 0);

  report("Part two", result, answer);
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw);

  partOne(input, report, 2204);
  partTwo(input, report, 71036);
};
