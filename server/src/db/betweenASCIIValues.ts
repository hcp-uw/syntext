export const toAscii = (s: string): Array<number> =>
  s.split("").map((c) => c.charCodeAt(0));

export const toChar = (arr: Array<number>): Array<string> =>
  arr.map((ascii) => String.fromCharCode(ascii));
