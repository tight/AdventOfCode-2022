import { readFileSync } from 'fs'
import { join } from 'path'

export class Forest {
  trees: Array<Array<number>>

  constructor(input: string) {
    this.trees = input.split('\n').map((line) => line.split('').map((num) => parseInt(num, 10)))
  }

  isVisible(x: number, y: number) {
    if (x == 0 || y == 0 || x == this.trees[0].length - 1 || y == this.trees.length - 1) return true

    const val = this.trees[y][x]
    const visibleFromTop = this.#isVisibleFrom(val, this.#top(x, y))
    const visibleFromBottom = this.#isVisibleFrom(val, this.#bottom(x, y))
    const visibleFromLeft = this.#isVisibleFrom(val, this.#left(x, y))
    const visibleFromRight = this.#isVisibleFrom(val, this.#right(x, y))

    return visibleFromTop || visibleFromBottom || visibleFromLeft || visibleFromRight
  }

  #isVisibleFrom(val: number, values: Array<number>) {
    return values.filter((current) => current >= val).length == 0
  }

  #top(x: number, y: number) {
    const top = []
    for (var i = 0; i < y; i++) top.push(this.trees[i][x])
    return top.reverse()
  }

  #bottom(x: number, y: number) {
    const bottom = []
    for (var i = y + 1; i < this.trees.length; i++) bottom.push(this.trees[i][x])
    return bottom
  }

  #left(x: number, y: number) {
    const left = []
    for (var i = 0; i < x; i++) left.push(this.trees[y][i])
    return left.reverse()
  }

  #right(x: number, y: number) {
    const right = []
    for (var i = x + 1; i < this.trees[0].length; i++) right.push(this.trees[y][i])
    return right
  }

  visibleTreesCount() {
    let count = 0
    // for (let y = 0; y < this.trees.length; y++) {
    //   for (let x = 0; x < this.trees[y].length; x++) {
    //     if (this.isVisible(x, y)) count += 1
    //   }
    // }
    this.#forEach((x, y) => {
      if (this.isVisible(x, y)) count += 1
    })

    return count
  }

  #forEach(callback: (x: number, y: number) => void) {
    for (let y = 0; y < this.trees.length; y++) {
      for (let x = 0; x < this.trees[y].length; x++) {
        callback(x, y)
      }
    }
  }

  scenicScore(x: number, y: number) {
    const val = this.trees[y][x]
    const top = this.#scenicScoreFor(val, this.#top(x, y)),
      bottom = this.#scenicScoreFor(val, this.#bottom(x, y)),
      left = this.#scenicScoreFor(val, this.#left(x, y)),
      right = this.#scenicScoreFor(val, this.#right(x, y))

    return top * bottom * left * right
  }

  #scenicScoreFor(val: number, trees: Array<number>) {
    let score = 0
    for (let i = 0; i < trees.length; i++) {
      score += 1
      if (trees[i] >= val) return score
    }
    return score
  }

  maxScenicScore() {
    let maxScore = 0
    this.#forEach((x, y) => {
      const score = this.scenicScore(x, y)
      if (score > maxScore) maxScore = score
    })

    return maxScore
  }
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Forest(input).visibleTreesCount())

// Part 2
// ! 1120
const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
console.log(new Forest(input).maxScenicScore())
