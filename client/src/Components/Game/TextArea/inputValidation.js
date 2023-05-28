const atEndOfLine = (wIndex, cLine) => {
  return wIndex.current === cLine.length - 1
}

const atEndOfWord = (cWord, uInput) => cWord.length === uInput.length

const currWordHasMistake = (cWord, uInput) => {
  let res = false
  uInput.split('').forEach((c, i) => (res = res || cWord[i] !== c))
  return res
}

const isMistake = (c, currWord, letterIndex) => {
  return c !== currWord[letterIndex]
}

const allowedToOverflow = (cWord, uInput) => cWord.length + 6 > uInput.length

module.exports = {
  atEndOfLine,
  atEndOfWord,
  currWordHasMistake,
  allowedToOverflow,
  isMistake
}
