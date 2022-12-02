import { readFileSync } from 'fs'
import { join } from 'path'

export const maxCaloriesCarriedByAnElf = (input: string) => {
  return Math.max(
    ...input.split('\n\n').map((elfItemsCalories) =>
      elfItemsCalories
        .split('\n')
        .map((calories) => parseInt(calories, 10))
        .reduce((accumulator, current) => accumulator + current, 0)
    )
  )
}

export const caloriesCarriedByTopMax3CaloriesElf = (input: string) => {
  const caloriesByElf = input.split('\n\n').map((elfItemsCalories) =>
    elfItemsCalories
      .split('\n')
      .map((calories) => parseInt(calories, 10))
      .reduce((accumulator, current) => accumulator + current, 0)
  )

  return caloriesByElf
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((accumulator, current) => accumulator + current, 0)
}

// 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(maxCaloriesCarriedByAnElf(input))

// 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(caloriesCarriedByTopMax3CaloriesElf(input))
