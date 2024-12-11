export function getIntRandom(min = 0, max = 100) {
  return Math.round(Math.random() * (max - min)) - min
}

export function triggerRandomNumbers(size: number): string {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 10)).join('')
}
