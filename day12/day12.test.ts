import { Heightmap } from './day12'

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

test('part 1 works', () => {
  expect(new Heightmap(input).shortestPathLength()).toEqual(31)
})

test('part 2 works', () => {
  expect(new Heightmap(input).shortestPathLengthFromAnyASquare()).toEqual(29)
})
