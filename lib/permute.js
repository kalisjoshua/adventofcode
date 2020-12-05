function* permute (a, n = a.length) {
  if (n <= 1) {
    yield a.slice()
  } else {
    for (let i = 0; i < n; i += 1) {
      yield* permute(a, n - 1)

      const j = n % 2 ? 0 : i;

      [a[n - 1], a[j]] = [a[j], a[n - 1]]
    }
  }
}

module.exports = permute
