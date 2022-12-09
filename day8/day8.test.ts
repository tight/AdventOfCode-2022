import { Forest } from './day8'

const input = `30373
25512
65332
33549
35390`

test('visible tree - top', () => {
  expect(new Forest(input).isVisible(1, 0)).toEqual(true)
})
test('visible tree - left', () => {
  expect(new Forest(input).isVisible(0, 1)).toEqual(true)
})
test('visible tree - right', () => {
  expect(new Forest(input).isVisible(4, 1)).toEqual(true)
})
test('visible tree - bottom', () => {
  expect(new Forest(input).isVisible(1, 4)).toEqual(true)
})
test('visible tree - 1 1', () => {
  expect(new Forest(input).isVisible(1, 1)).toEqual(true)
})
test('invisible tree - 3 1', () => {
  expect(new Forest(input).isVisible(1, 1)).toEqual(true)
})
test('part 1 works', () => {
  expect(new Forest(input).visibleTreesCount()).toEqual(21)
})

test('scenic score - 1', () => {
  expect(new Forest(input).scenicScore(2, 1)).toEqual(4)
})
test('scenic score - 2', () => {
  expect(new Forest(input).scenicScore(2, 3)).toEqual(8)
})
test('part 2 works', () => {
  expect(new Forest(input).maxScenicScore()).toEqual(8)
})
