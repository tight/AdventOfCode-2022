import { readFileSync } from 'fs'
import { join } from 'path'
import { scoreFor } from '../day2/day2'

export const commonItemForRuckstack = (ruckstack: string) => {
  const firstCompartment = ruckstack.slice(0, ruckstack.length / 2).split(''),
    secondCompartment = ruckstack.slice(ruckstack.length / 2).split('')

  return firstCompartment.filter((item) => secondCompartment.includes(item))[0]
}

export const scoreForItem = (item: string) => {
  if (item == item.toLowerCase()) return item.charCodeAt(0) - 96
  else return item.charCodeAt(0) - 38
}

export const sumOfPrioritiesOfItemsInBothCompartments = (input: string) => {
  return input
    .split('\n')
    .map((ruckstack) => commonItemForRuckstack(ruckstack))
    .map((commonItem) => scoreForItem(commonItem))
    .reduce((acc, current) => acc + current, 0)
}

export const groups = (input: string) => {
  const actualGroups: Array<Array<string>> = []
  input.split('\n').forEach((ruckStack, index) => {
    if (index % 3 === 0) {
      actualGroups.push([])
    }
    // @ts-expect-error
    actualGroups.at(-1).push(ruckStack)
  })

  return actualGroups
}

const intersection = (a: string, b: string) => {
  const aAsArray = a.split(''),
    bAsArray = b.split('')

  return aAsArray.filter((item) => bAsArray.includes(item)).join('')
}

export const commonItemIn3Ruckstacks = (ruckstacks: Array<string>) => {
  const [first, second, third] = ruckstacks

  return intersection(intersection(first, second), third)[0]
}

export const sumOfPrioritiesOfBadgeItemsForEeach3ElfGroup = (input: string) => {
  return groups(input)
    .map((group) => commonItemIn3Ruckstacks(group))
    .map((item) => scoreForItem(item))
    .reduce((acc, current) => acc + current, 0)
}

// 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(sumOfPrioritiesOfItemsInBothCompartments(input))

// 2
const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
console.log(sumOfPrioritiesOfBadgeItemsForEeach3ElfGroup(input))
