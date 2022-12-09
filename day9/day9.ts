import { readFileSync } from 'fs'
import { join } from 'path'

interface Order {
  direction: 'U' | 'D' | 'L' | 'R'
  num: number
}

interface Coords {
  x: number
  y: number
}

export class Rope {
  positions: Array<Coords>
  tailPositions: Array<Coords>

  constructor(size: number) {
    this.positions = new Array(size)
    for (let i = 0; i < this.positions.length; i++) this.positions[i] = { x: 0, y: 0 }
    this.tailPositions = []
  }

  moves(input: string) {
    input
      .split('\n')
      .map((line) => line.split(' '))
      .map((order) => {
        return { direction: order[0], num: parseInt(order[1], 10) }
      })
      .forEach((order) => {
        if (!['U', 'D', 'L', 'R'].includes(order.direction))
          throw new Error(`Unexpected direction "${order.direction}"`)
        // @ts-expect-error
        this.move(order)
      })

    return this
  }

  move(order: Order) {
    let move
    if (order.direction === 'U')
      move = () => {
        this.positions[0].y -= 1
      }
    else if (order.direction === 'D')
      move = () => {
        this.positions[0].y += 1
      }
    else if (order.direction === 'L')
      move = () => {
        this.positions[0].x -= 1
      }
    else if (order.direction === 'R')
      move = () => {
        this.positions[0].x += 1
      }
    else throw new Error('Woops')

    for (let i = 0; i < order.num; i++) {
      move()
      this.moveTails()
    }
  }

  moveTails() {
    const newPositions = [...this.positions]

    for (let i = 1; i < this.positions.length; i++) {
      const headX = this.positions[i - 1].x
      const headY = this.positions[i - 1].y

      const diffX = Math.abs(headX - this.positions[i].x),
        diffY = Math.abs(headY - this.positions[i].y)

      if (diffX > 1 || diffY > 1) {
        if (headX > this.positions[i].x) {
          newPositions[i].x += 1
        } else if (headX < this.positions[i].x) {
          newPositions[i].x -= 1
        }

        if (headY > this.positions[i].y) {
          newPositions[i].y += 1
        } else if (headY < this.positions[i].y) {
          newPositions[i].y -= 1
        }
      }
    }

    this.positions = newPositions
    const tailCoords = this.positions[this.positions.length - 1]
    this.tailPositions.push({ x: tailCoords.x, y: tailCoords.y })
  }

  uniqPositionsOfTailsCount() {
    const uniqTailPositions = this.tailPositions
      .map((position) => `${position.x},${position.y}`)
      .filter((value, index, self) => self.indexOf(value) == index)

    return uniqTailPositions.length
  }
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Rope(2).moves(input).uniqPositionsOfTailsCount())

// Part 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Rope(10).moves(input).uniqPositionsOfTailsCount())
