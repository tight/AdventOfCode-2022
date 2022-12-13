import { readFileSync } from 'fs'
import { join } from 'path'

interface Coords {
  x: number
  y: number
}

interface ObjectToObjectHash<Type> {
  [index: string]: Type
}

class Map<TypeForKey, TypeForValue> {
  values: ObjectToObjectHash<TypeForValue>

  constructor() {
    this.values = {}
  }

  at(key: TypeForKey) {
    return this.values[JSON.stringify(key)]
  }

  set(key: TypeForKey, value: TypeForValue) {
    this.values[JSON.stringify(key)] = value
  }

  keys() {
    Object.keys(this.values).map((keyAsJson) => JSON.parse(keyAsJson))
  }
}

class DistanceMap<Type> {
  root: Type
  distances: ObjectToObjectHash<number>

  constructor(root: Type) {
    this.root = root
    this.distances = {}
    this.distances[JSON.stringify(this.root)] = 0
  }

  at(coords: Type) {
    return this.distances[JSON.stringify(coords)]
  }

  set(coords: Type, distance: number) {
    this.distances[JSON.stringify(coords)] = distance
  }
}

export class Heightmap {
  heights: Map<Coords, number>
  start: Coords
  starts: Array<Coords>
  end: Coords

  constructor(input: string) {
    this.heights = new Map<Coords, number>()
    this.starts = []
    let start, end

    input.split('\n').map((line, currentY) => {
      const currentLine: Array<number> = []
      line.split('').map((letter, currentX) => {
        let val
        if (letter == 'S') {
          val = 1
          start = { x: currentX, y: currentY }
        } else if (letter == 'E') {
          val = 26
          end = { x: currentX, y: currentY }
        } else {
          if (letter == 'a') this.starts.push({ x: currentX, y: currentY })
          val = letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1
        }
        this.heights.set({ x: currentX, y: currentY }, val)
      })
    })

    if (start === undefined) throw new Error('Not found : S')
    if (end === undefined) throw new Error('Not found : E')

    this.start = start
    this.end = end
  }

  shortestPathLength(start = this.start) {
    const distancesMap = new DistanceMap<Coords>(start)
    let toVisit = [start]

    while (toVisit.length > 0) {
      const newToVisit: Array<Coords> = []

      toVisit.forEach((position) => {
        const availablePositions = this.#availablePositions(position, this.heights.at(position))
        availablePositions.forEach((nextPosition) => {
          if (distancesMap.at(nextPosition) === undefined) {
            distancesMap.set(nextPosition, distancesMap.at(position) + 1)
            newToVisit.push(nextPosition)
          }
        })
      })

      toVisit = newToVisit
    }

    return distancesMap.at(this.end)
  }

  shortestPathLengthFromAnyASquare() {
    return Math.min(
      ...this.starts.map((start) => this.shortestPathLength(start)).filter((value) => value !== undefined)
    )
  }

  #availablePositions(position: Coords, height: number) {
    const ret = [
      { x: position.x - 1, y: position.y },
      { x: position.x + 1, y: position.y },
      { x: position.x, y: position.y - 1 },
      { x: position.x, y: position.y + 1 },
    ]
      .filter((currentPosition) => {
        // on map
        return this.heights.at(currentPosition) !== undefined
      })
      .filter((currentPosition) => {
        // <= height + 1
        const currentPositionHeight = this.heights.at(currentPosition)
        return currentPositionHeight <= height + 1
      })

    return ret
  }
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Heightmap(input).shortestPathLength())

// Part 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Heightmap(input).shortestPathLengthFromAnyASquare())
