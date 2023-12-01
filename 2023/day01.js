const NOPE = Symbol("NOPE");
const cleanRawInput = (raw) => raw.trim().split(/\n/);

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const rNumbers = new RegExp(`^(?:${numbers.join("|")})`);

const solution = (input) =>
  input
    .map((line) => line.match(/\d/g) || [])
    .map((list) => [list.at(0), list.at(-1)].join(""))
    .map(Number)
    .reduce((a, b) => a + b);

function parse(str) {
  const result = str.split("").reduceRight((acc, char, index) => {
    const [found] = str.slice(index).match(rNumbers) ?? [];

    if (found) {
      return `${numbers.indexOf(found) + 1}` + acc;
    } else if (!isNaN(+char)) {
      return char + acc;
    }

    return acc;
  }, "");

  return result;
}

function partOne(input, report, answer) {
  const result = solution(input);

  report("Part one", result, answer);
}

function partTwo(input, report, answer) {
  const result = solution(input.map(parse));

  report("Part two", result, answer);
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw);

  partOne(input, report, 54968);
  partTwo(input, report, 54094);
};
