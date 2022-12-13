import { access, readFileSync } from 'fs'
import { join } from 'path'

type List = Array<ArrayOrNumber>
type ArrayOrNumber = Array<ArrayOrNumber> | number

export class Pairs {
  pairs: Array<any>

  constructor(input: string) {
    this.pairs = input.split('\n\n').map((pairs) => {
      return pairs.split('\n').map((list) => JSON.parse(list))
    })
  }

  compare(first: List, second: List): boolean | null {
    let index = 0

    while (true) {
      let left = first[index]
      let right = second[index]

      // can be undefined
      if (left === undefined && right === undefined) {
        return null
      } else if (left !== undefined && right === undefined) {
        return false
      } else if (left === undefined && right !== undefined) {
        return true
      } else if (typeof left === 'number' && typeof right === 'number') {
        if (left < right) {
          return true
        } else if (left > right) {
          return false
        } else {
          // left == right => continue
        }
      } else if (typeof left === 'object' && typeof right === 'object') {
        const ret = this.compare(left, right)
        if (ret !== null) {
          return ret
        }
      } else {
        if (typeof left === 'number') {
          left = [left]
        } else if (typeof right === 'number') {
          right = [right]
        }
        // @ts-expect-error
        const ret = this.compare(left, right)
        if (ret !== null) {
          return ret
        }
      }

      index += 1
    }
  }

  decoderKey() {
    let packets = this.pairs.flat(1)
    packets.push([[2]], [[6]])
    packets = packets.sort((first, second) => {
      if (this.compare(first, second)) return -1
      else return 1
    })

    const two = JSON.stringify([[2]])
    const six = JSON.stringify([[6]])
    let twoIndex, sixIndex
    packets.forEach((packet, index) => {
      if (JSON.stringify(packet) == two) twoIndex = index + 1
      else if (JSON.stringify(packet) == six) sixIndex = index + 1
    })

    // @ts-expect-error
    return twoIndex * sixIndex
  }

  sumOfIndicesOfPairInTheRightOrder() {
    return this.pairs
      .map((pair, index) => {
        const [first, second] = pair
        const ret = { index: index + 1, inTheRightOrder: this.compare(first, second) }
        return ret
      })
      .filter((result) => result.inTheRightOrder)
      .map((result) => result.index)
      .reduce((acc, current) => current + acc, 0)
  }
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Pairs(input).sumOfIndicesOfPairInTheRightOrder())

// Part 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Pairs(input).decoderKey())
