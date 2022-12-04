import { readFileSync } from 'fs'
import { join } from 'path'

export const pairsIncludeOtherPairCount = (input: string) => {
  return input
    .split('\n')
    .map((line) => line.split(/[-,]/).map((num) => parseInt(num, 10)))
    .map((nums) => {
      const [a, b, c, d] = nums
      // .a----b.
      // ..c-d...

      // ..a-b...
      // .c----d.
      return (a <= c && b >= d) || (a >= c && b <= d)
    })
    .filter((b) => b).length
}

export const pairsOverlappingCount = (input: string) => {
  // the first two pairs (2-4,6-8 and 2-3,4-5) don't overlap
  // the remaining four pairs (5-7,7-9, 2-8,3-7, 6-6,4-6, and 2-6,4-8) do overlap:

  return input
    .split('\n')
    .map((line) => line.split(/[-,]/).map((num) => parseInt(num, 10)))
    .map((nums) => {
      const [a, b, c, d] = nums
      return (b >= c && a <= d) || (c >= a && c <= b)
    })
    .filter((b) => b).length
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(pairsIncludeOtherPairCount(input))

// Part 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(pairsOverlappingCount(input))
