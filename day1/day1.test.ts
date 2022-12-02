import { maxCaloriesCarriedByAnElf, caloriesCarriedByTopMax3CaloriesElf } from './day1'

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

test('works', () => {
  expect(maxCaloriesCarriedByAnElf(input)).toEqual(24000)
})

test('works', () => {
  expect(caloriesCarriedByTopMax3CaloriesElf(input)).toEqual(45000)
})
