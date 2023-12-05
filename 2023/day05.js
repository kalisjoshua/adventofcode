const NOPE = Symbol("NOPE");
const regex = /[^:]*:[\n\s]?/;
const parse = (raw) => raw.replace(regex, " ").trim();
const cleanRawInput = (raw) =>
  raw.trim().split(/\n\n/).map(parse).reduce(reducer, []);

const example = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

function lookup([table, ...maps], values) {
  const result = values.map(
    (val) =>
      table.reduce((acc, [dest, src, len]) => {
        if (!acc) {
          const diff = val - src;

          acc = diff >= 0 && diff < len ? dest + diff : false;
        }

        return acc;
      }, false) || val
  );

  return !maps.length ? result : lookup(maps, result);
}

function partOne(input, report, answer) {
  const result = input
    .shift()
    .map(lookup.bind(null, input))
    .at(0)
    .sort((a, b) => a - b)
    .at(0);

  report("Part one", result, answer);
}

function partTwo(input, report, answer) {
  let [temp] = input.shift();
  let seeds = [];

  while (temp.length) {
    const [alpha, len] = temp.splice(0, 2);

    seeds = seeds.concat(
      Array(len)
        .fill(alpha)
        .map((a, i) => a + i)
    );
  }

  const result = [seeds]
    .map(lookup.bind(null, input))
    .at(0)
    .sort((a, b) => a - b)
    .at(0);

  report("Part two", result, answer);
}

function reducer(acc, val, index) {
  if (index) {
    acc.push(val.split("\n").map((line) => line.split(" ").map(Number)));
  } else {
    acc.push([val.split(" ").map(Number)]);
  }

  return acc;
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw);

  partOne(structuredClone(input), report, 240320250);
  // partTwo(structuredClone(input), report, NOPE);
};
