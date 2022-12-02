import { scoreFor, scoreForV2, scoreForStrategyGuide, scoreForStrategyGuideV2 } from './day2'

const input = `A Y
B X
C Z`

test('scoreFor 1', () => {
  expect(scoreFor('A Y')).toEqual(8)
})
test('scoreFor 2', () => {
  expect(scoreFor('B X')).toEqual(1)
})
test('scoreFor 3', () => {
  expect(scoreFor('C Z')).toEqual(6)
})

test('day 1 works', () => {
  expect(scoreForStrategyGuide(input)).toEqual(15)
})

test('scoreForV2 1', () => {
  expect(scoreForV2('A Y')).toEqual(4)
})
test('scoreForV2 2', () => {
  expect(scoreForV2('B X')).toEqual(1)
})
test('scoreForV2 3', () => {
  expect(scoreForV2('C Z')).toEqual(7)
})

test('day 2 works', () => {
  expect(scoreForStrategyGuideV2(input)).toEqual(12)
})
