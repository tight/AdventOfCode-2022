import { readFileSync } from 'fs'
import { join } from 'path'

interface Coords {
  x: number
  y: number
}

interface ObjectToObjectHash<Type> {
  [index: string]: Type
}

interface MapOptions<TypeForKey> {
  encodeKey: (key: TypeForKey) => string
  decodeKey: (encodedKey: string) => TypeForKey
}

class Map<TypeForKey, TypeForValue> {
  values: ObjectToObjectHash<TypeForValue>
  encodeKey: (key: TypeForKey) => string
  decodeKey: (encodedKey: string) => TypeForKey

  constructor(options: MapOptions<TypeForKey>) {
    this.values = {}
    this.encodeKey = options.encodeKey
    this.decodeKey = options.decodeKey
  }

  at(key: TypeForKey) {
    return this.values[this.encodeKey(key)]
  }

  set(key: TypeForKey, value: TypeForValue) {
    this.values[this.encodeKey(key)] = value
  }

  unset(key: TypeForKey) {
    delete this.values[this.encodeKey(key)]
  }

  keys() {
    return Object.keys(this.values).map((encodedKey) => this.decodeKey(encodedKey))
  }
}

type Item = 'rock' | 'sand'

export class CaveSim {
  items: Map<Coords, Item>

  constructor(input: string) {
    const linesCoords = input.split('\n').map((line) => {
      return line.split(' -> ').map((coords) => {
        const [x, y] = coords.split(',').map((n) => parseInt(n, 10))
        return { x, y }
      })
    })

    this.items = new Map({
      // encodeKey: (coords) => JSON.stringify(coords),
      // decodeKey: (stringCoords) => JSON.parse(stringCoords),
      encodeKey: (coords) => [coords.x, coords.y].join('-'),
      decodeKey: (stringCoords) => {
        const [x, y] = stringCoords.split('-').map((num) => parseInt(num, 10))
        return { x, y }
      },
    })
    linesCoords.forEach((lineCoords) => {
      for (let index = 1; index < lineCoords.length; index++) {
        const prev = lineCoords[index - 1]
        const current = lineCoords[index]

        if (prev.x == current.x) {
          const minY = Math.min(prev.y, current.y)
          const maxY = Math.max(prev.y, current.y)
          for (let y = minY; y <= maxY; y++) this.items.set({ x: current.x, y: y }, 'rock')
        } else if (prev.y == current.y) {
          const minX = Math.min(prev.x, current.x)
          const maxX = Math.max(prev.x, current.x)
          for (let x = minX; x <= maxX; x++) this.items.set({ x: x, y: current.y }, 'rock')
        }
      }
    })
  }

  toString() {
    let str = ''
    const itemsString = {
      rock: '#',
      sand: 'o',
    }

    const xs: Array<number> = []
    this.items.keys().map((coords) => xs.push(coords.x))
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = 0
    const maxY = Math.max(...this.items.keys().map((coords) => coords.y))

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const item = this.items.at({ x, y })
        if (item) {
          str += itemsString[item]
        } else str += '.'
      }
      str += '\n'
    }

    return str
  }

  tick(sandCoords: Coords) {
    const coordsBelow = { x: sandCoords.x, y: sandCoords.y + 1 }
    const itemBelow = this.items.at(coordsBelow)
    if (itemBelow === undefined) return coordsBelow
    else {
      const coordsBelowAndLeft = { x: sandCoords.x - 1, y: sandCoords.y + 1 }
      const itemBelowAndLeft = this.items.at(coordsBelowAndLeft)
      if (itemBelowAndLeft === undefined) return coordsBelowAndLeft

      const coordsBelowAndRight = { x: sandCoords.x + 1, y: sandCoords.y + 1 }
      const itemBelowAndRight = this.items.at(coordsBelowAndRight)
      if (itemBelowAndRight === undefined) return coordsBelowAndRight

      return sandCoords
    }
  }

  unitsOfSandBeforeFlowing() {
    let resting = 0
    const pouringCoords = { x: 500, y: 0 }
    const maxY = Math.max(...this.items.keys().map((coords) => coords.y))

    let currentCoords = pouringCoords
    this.items.set(currentCoords, 'sand')

    while (true) {
      const newCoords = this.tick(currentCoords)
      if (newCoords == currentCoords) {
        currentCoords = pouringCoords
        resting++
      } else {
        if (newCoords.y > maxY) {
          // console.log(this.toString())
          return resting
        }

        this.items.unset(currentCoords)
        this.items.set(newCoords, 'sand')
        currentCoords = newCoords
      }
    }
  }

  unitsOfSandBeforeBlocking() {
    let resting = 0
    const pouringCoords = { x: 500, y: 0 }
    const maxY = Math.max(...this.items.keys().map((coords) => coords.y))

    const xs = this.items.keys().map((coords) => coords.x)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const realMinX = minX - maxY
    const realMaxX = maxX + maxY
    for (let x = realMinX; x < realMaxX; x++) this.items.set({ x, y: maxY + 2 }, 'rock')

    let currentCoords = pouringCoords
    this.items.set(currentCoords, 'sand')

    while (true) {
      const newCoords = this.tick(currentCoords)
      if (newCoords == currentCoords) {
        resting++
        if (newCoords.x == pouringCoords.x && newCoords.y == pouringCoords.y) {
          console.log(this.toString())
          return resting
        }
        currentCoords = pouringCoords
      } else {
        this.items.unset(currentCoords)
        this.items.set(newCoords, 'sand')
        currentCoords = newCoords
      }
    }
  }
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new CaveSim(input).unitsOfSandBeforeFlowing())

// Part 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new CaveSim(input).unitsOfSandBeforeBlocking())
