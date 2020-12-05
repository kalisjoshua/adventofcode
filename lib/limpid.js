let animals = [
  'Kangaroo',
  'Potbelly Pig',
  'Llama',
  'Dingo',
  'Chihuahua',
  'Gazelle',
  'Anteater',
  'Orangutan',
  'Bison',
  'Sugarglider',
  'Chinchilla',
  'Komodo Dragon',
  'Labrador',
  'Sparrow',
  'Otter',
  'Squirrel',
  'Alpaca',
  'Koala',
  'Panda',
  'Kangaroo',
  'Lemur',
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
