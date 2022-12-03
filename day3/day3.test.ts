import {
  commonItemForRuckstack,
  scoreForItem,
  sumOfPrioritiesOfItemsInBothCompartments,
  groups,
  commonItemIn3Ruckstacks,
  sumOfPrioritiesOfBadgeItemsForEeach3ElfGroup,
} from './day3'

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

test('score for ruckstack 1', () => {
  expect(commonItemForRuckstack('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual('p')
})

test('score for item p', () => {
  expect(scoreForItem('p')).toEqual(16)
})

test('score for item L', () => {
  expect(scoreForItem('L')).toEqual(38)
})

test('day 1 works', () => {
  expect(sumOfPrioritiesOfItemsInBothCompartments(input)).toEqual(157)
})

test('groups', () => {
  expect(groups(input)).toEqual([
    ['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg'],
    ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw'],
  ])
})

test('common items in groups', () => {
  expect(
    commonItemIn3Ruckstacks(['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg'])
  ).toEqual('r')
})

test('day 2 works', () => {
  expect(sumOfPrioritiesOfBadgeItemsForEeach3ElfGroup(input)).toEqual(70)
})
