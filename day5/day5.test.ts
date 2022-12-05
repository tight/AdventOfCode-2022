import { Crates } from './day5'

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

test('parsing initial state', () => {
  const crates = new Crates(input)
  expect(crates.at(1)).toEqual(['Z', 'N'])
  expect(crates.at(2)).toEqual(['M', 'C', 'D'])
  expect(crates.at(3)).toEqual(['P'])
})

test('top', () => {
  const crates = new Crates(input)
  expect(crates.tops()).toEqual(['N', 'D', 'P'])
})

test('part 1 works', () => {
  expect(new Crates(input).process().tops()).toEqual(['C', 'M', 'Z'])
})

test('part 1 works', () => {
  expect(new Crates(input).process().tops()).toEqual(['C', 'M', 'Z'])
})

test('part 2 works', () => {
  expect(new Crates(input, 9001).process().tops()).toEqual(['M', 'C', 'D'])
})
