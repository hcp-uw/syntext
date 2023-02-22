const toAscii = (string) => 
    string.split("").map(c => c.charCodeAt())

const toChar = (asciiArr) => 
    asciiArr.map(ascii => String.fromCharCode(ascii)) 

module.exports = {toAscii, toChar}