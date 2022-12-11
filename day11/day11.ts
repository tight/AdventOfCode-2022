import { readFileSync } from 'fs'
import { join } from 'path'

type PlusOrMult = '+' | '*'

interface Monkey {
  items: Array<number>
  operation: string
  testNumber: number
  ifTrue: number
  ifFalse: number
  inspections: number
}

export class MITMGame {
  monkeys: Array<Monkey>

  constructor(input: string) {
    this.monkeys = []

    input.split('\n\n').forEach((monkeyLines) => {
      const lines = monkeyLines.split('\n')

      const monkey = {
        items: (lines[1].match(/\d+/g) || []).map((n) => parseInt(n, 10)),
        operation: lines[2].split(': ')[1].replace('new = ', ''),
        // @ts-expect-error
        testNumber: parseInt(lines[3].match(/\d+/)[0], 10),
        // @ts-expect-error
        ifTrue: parseInt(lines[4].match(/\d+/)[0], 10),
        // @ts-expect-error
        ifFalse: parseInt(lines[5].match(/\d+/)[0], 10),
        inspections: 0,
      }

      this.monkeys.push(monkey)
    })
  }

  process(rounds: number, divideWorryBy3: boolean) {
    const globalTestNumber = this.monkeys.map((monkey) => monkey.testNumber).reduce((acc, current) => acc * current, 1)

    for (let index = 1; index <= rounds; index++) {
      this.monkeys.forEach((monkey) => {
        monkey.items.forEach((item) => {
          monkey.inspections++
          const operation = monkey.operation.replace(/old/g, item.toString())
          let newItem = eval(operation)
          if (divideWorryBy3) newItem = Math.floor(newItem / 3)
          const newMonkey = newItem % monkey.testNumber == 0 ? monkey.ifTrue : monkey.ifFalse
          newItem = newItem % globalTestNumber
          // if (newItem >= Number.MAX_SAFE_INTEGER) throw new Error(`Woops, ${item}`)
          this.monkeys[newMonkey].items.push(newItem)
        })
        monkey.items = []
      })
    }

    return this
  }

  monkeyBusiness() {
    const [a, b] = this.monkeys
      .map((monkey) => monkey.inspections)
      .sort((a, b) => b - a)
      .slice(0, 2)

    return a * b
  }
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new MITMGame(input).process(20, true).monkeyBusiness())

// Part 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new MITMGame(input).process(10_000, false).monkeyBusiness())
