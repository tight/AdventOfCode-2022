import { readFileSync } from 'fs'
import { join } from 'path'

const splitInGroupsOf = (line: string, size: number) => {
  const groups: Array<Array<string>> = []

  line.split('').forEach((element, index) => {
    if (index % size === 0) {
      groups.push([])
    }
    groups.at(-1)?.push(element)
  })

  return groups.map((group) => group.join(''))
}

export class CathodeRayTube {
  xs: Array<number>

  constructor() {
    this.xs = []
  }

  process(input: string) {
    let cycle = 0
    let x = 1

    input.split('\n').forEach((line) => {
      const [instr, rawNum] = line.split(' ')
      if (instr === 'addx') {
        const num = parseInt(rawNum, 10)
        for (let i = 0; i < 2; i++) {
          this.xs.push(x)
        }
        x += num
      } else {
        this.xs.push(x)
      }
    })

    return this
  }

  xAt(cycle: number) {
    return this.xs[cycle - 1]
  }

  signalStrengthAt(cycle: number) {
    return cycle * this.xAt(cycle)
  }

  sumSignalStrenth() {
    return (
      this.signalStrengthAt(20) +
      this.signalStrengthAt(60) +
      this.signalStrengthAt(100) +
      this.signalStrengthAt(140) +
      this.signalStrengthAt(180) +
      this.signalStrengthAt(220)
    )
  }

  spritePositionsAt(cycle: number) {
    const x = this.xAt(cycle)
    return [x - 1, x, x + 1]
  }

  drawerPositionAt(cycle: number) {
    return (cycle - 1) % 40
  }

  isDrawingAt(cycle: number) {
    return this.spritePositionsAt(cycle).includes(this.drawerPositionAt(cycle))
  }

  draw() {
    let repr = ''
    for (let cycle = 1; cycle <= this.xs.length; cycle++) {
      let char
      if (this.isDrawingAt(cycle)) char = '#'
      else char = '.'
      repr = repr.concat(char)
    }

    return splitInGroupsOf(repr, 40).join('\n')
  }
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new CathodeRayTube().process(input).sumSignalStrenth())

// Part 2
const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
console.log(new CathodeRayTube().process(input).draw())
