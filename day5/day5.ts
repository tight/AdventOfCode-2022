import { readFileSync } from 'fs'
import { join } from 'path'

export class Crates {
  stacks: Array<Array<string>>
  orders: Array<Array<number>>
  model: number

  constructor(input: string, model: number = 9000) {
    const [initialState, orders] = input.split('\n\n').map((part) => part.split('\n'))
    this.stacks = this.#parseState(initialState.slice(0, -1))
    // @ts-expect-error
    this.orders = this.#parseOrders(orders)
    this.model = model
  }

  process() {
    this.orders.forEach((order) => {
      const [n, from, to] = order
      this.#processOrder(n, from, to)
    })
    return this
  }

  #processOrder(n: number, from: number, to: number) {
    if (this.model === 9000) {
      for (let i = 0; i < n; i++) {
        const top = this.at(from).pop()
        // @ts-expect-error
        this.at(to).push(top)
      }
    } else if (this.model === 9001) {
      let tops = []
      for (let i = 0; i < n; i++) {
        tops.push(this.at(from).pop())
      }
      // @ts-expect-error
      this.at(to).push(...tops.reverse())
    }
  }

  at(index: number) {
    return this.stacks[index - 1]
  }

  tops() {
    return this.stacks.map((stack) => stack.slice(-1)[0])
  }

  //     [D]
  // [N] [C]
  // [Z] [M] [P]
  #parseState(initialState: Array<string>) {
    const stacks: Array<Array<string>> = []

    initialState.forEach((line) => {
      this.#inGroupsOf4(line).forEach((crateRepr, index) => {
        const matches = crateRepr.match(/[A-Z]/)
        if (matches) {
          const item = matches[0]
          if (stacks[index] === undefined) stacks[index] = []
          stacks[index].push(item)
        }
      })
    })

    return stacks.map((stack) => stack.reverse())
  }

  #inGroupsOf4 = (line: string) => {
    const groups: Array<Array<string>> = []

    line.split('').forEach((element, index) => {
      if (index % 4 === 0) {
        groups.push([])
      }
      groups.at(-1)?.push(element)
    })

    return groups.map((group) => group.join(''))
  }

  // move 1 from 2 to 1
  // move 3 from 1 to 3
  #parseOrders(orders: Array<string>) {
    return orders.map((line) => {
      if (line !== '') return line.match(/\d+/g)?.map((numRepr) => parseInt(numRepr, 10))
    })
  }
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Crates(input).process().tops().join(''))

// Part 2
const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
console.log(new Crates(input, 9001).process().tops().join(''))
