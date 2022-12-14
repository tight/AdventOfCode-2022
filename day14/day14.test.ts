import { CaveSim } from './day14'

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

test('part 1 works', () => {
  expect(new CaveSim(input).unitsOfSandBeforeFlowing()).toEqual(24)
})

test('part 2 works', () => {
  expect(new CaveSim(input).unitsOfSandBeforeBlocking()).toEqual(93)
})
