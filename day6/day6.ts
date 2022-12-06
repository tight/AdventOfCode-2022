import { readFileSync } from 'fs'
import { join } from 'path'

const startIndex = (input: string, numDifferentCharsExpected: number) => {
  let current = 0
  while (true) {
    const lastChars = input.slice(current, current + numDifferentCharsExpected)
    if (lastChars === '') throw new Error('End of string reached ?!')
    const uniqueLastChars = lastChars.split('').filter((value, index, self) => self.indexOf(value) == index)
    if (uniqueLastChars.length === numDifferentCharsExpected) return current + numDifferentCharsExpected
    current += 1
  }
}

export const startOfPacketIndex = (input: string) => {
  return startIndex(input, 4)
}

export const startOfMessageIndex = (input: string) => {
  return startIndex(input, 14)
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(startOfPacketIndex(input))

// Part 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(startOfMessageIndex(input))
