import { Rope } from './day9'

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const input2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

test('part 1 works', () => {
  expect(new Rope(2).moves(input).uniqPositionsOfTailsCount()).toEqual(13)
})

test('part 2 works - 1', () => {
  expect(new Rope(10).moves(input).uniqPositionsOfTailsCount()).toEqual(1)
})

test('part 2 works - 2', () => {
  expect(new Rope(10).moves(input2).uniqPositionsOfTailsCount()).toEqual(36)
})
