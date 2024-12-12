export function getIntRandom(min = 0, max = 100) {
  return Math.round(Math.random() * (max - min)) - min
}

export function triggerRandomNumbers(size: number): string {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 10)).join('')
}

export function formatWithSeparator(numbers: string, separator: string): string {
  const regex = new RegExp(`.{1,3}`, 'g')
  return numbers.match(regex)?.join(separator) || numbers
}

export function addPrefix(number: string, prefix?: string): string {
  return prefix !== undefined ? `+${prefix} ${number}` : number
}
