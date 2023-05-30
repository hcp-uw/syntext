// takes in raw typing data
//      ex: [0, 2, 3, 5, 3, 2, 2, 3, 2, 1]
//      each int corresponds to char/sec
// outputs thr rough estimate of wpm for each
// second in the array.
const smoothen = data => {
  const CHARACTERS_PER_WORD = 5
  const SECONDS_PER_MINUTE = 60
  const WINDOW_SIZE = Math.min(Math.floor(data.length / 5), 2)

  const wpm = []
  const dataLength = data.length
  for (let i = 0; i < dataLength; i++) {
    const currentWPM = data[i] * (SECONDS_PER_MINUTE / CHARACTERS_PER_WORD)
    let sum = currentWPM
    let count = 1
    for (let j = 1; j <= WINDOW_SIZE; j++) {
      if (i >= j) {
        sum += data[i - j] * (SECONDS_PER_MINUTE / CHARACTERS_PER_WORD)
        count++
      }
      if (i + j < dataLength) {
        sum += data[i + j] * (SECONDS_PER_MINUTE / CHARACTERS_PER_WORD)
        count++
      }
    }
    wpm.push(Math.round(sum / count))
  }
  return wpm
}

module.exports = smoothen
