let animals = [
  "Kangaroo",
  "Potbelly Pig",
  "Llama",
  "Dingo",
  "Chihuahua",
  "Gazelle",
  "Anteater",
  "Orangutan",
  "Bison",
  "Sugarglider",
  "Chinchilla",
  "Python",
  "Komodo Dragon",
  "Labrador",
  "Sparrow",
  "Otter",
]

function limpid () {
  const i = Math.floor(Math.random() * animals.length)

  animals = [
    ...animals.slice(i),
    ...animals.slice(0, i),
  ]

  return animals[0]
}

module.exports = limpid
