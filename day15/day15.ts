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

class CoordsMap<TypeForValue> extends Map<Coords, TypeForValue> {
  constructor() {
    super({
      encodeKey: (coords) => [coords.x, coords.y].join(','),
      decodeKey: (stringCoords) => {
        const [x, y] = stringCoords.split(',').map((num) => parseInt(num, 10))
        return { x, y }
      },
    })
  }
}

export class SensorsReport {
  items: Map<Coords, Coords>
  unavailablePositionsMap: Map<Coords, boolean>

  constructor(input: string) {
    this.items = new CoordsMap()
    this.unavailablePositionsMap = new CoordsMap()

    input.split('\n').map((line) => {
      const matches = line.match(/[-\d]+/g)?.map((item) => parseInt(item, 10))
      if (!matches) throw new Error('Woops')
      const [sx, sy, bx, by] = matches
      const sensorCoords = { x: sx, y: sy }
      const beaconCoords = { x: bx, y: by }
      this.items.set(sensorCoords, beaconCoords)
    })
  }

  toString() {
    const xs: Array<number> = []
    this.items.keys().forEach((coords) => {
      xs.push(coords.x), xs.push(this.items.at(coords).x)
    })
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)

    const ys: Array<number> = []
    this.items.keys().forEach((coords) => {
      ys.push(coords.y), ys.push(this.items.at(coords).y)
    })
    const minY = Math.min(...xs)
    const maxY = Math.max(...xs)

    const sensors = this.items.keys()
    const beacons = sensors.map((coords) => this.items.at(coords))

    let str = ''
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (sensors.some((coords) => coords.x == x && coords.y == y)) str += 'S'
        else if (beacons.some((coords) => coords.x == x && coords.y == y)) str += 'B'
        else str += '.'
      }
      str += '\n'
    }

    return str
  }

  #dist(c1: Coords, c2: Coords) {
    return Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y)
  }

  unavailablePositionsForBeacon(line: number) {
    const xs: Array<number> = []
    this.items.keys().forEach((coords) => {
      xs.push(coords.x), xs.push(this.items.at(coords).x)
    })
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)

    const sensors = this.items.keys()

    const maxDist = Math.max(...sensors.map((sensor) => this.#dist(sensor, this.items.at(sensor))))
    const realMinX = minX - maxDist
    const realMaxX = maxX + maxDist

    let count = 0

    for (let x = realMinX; x <= realMaxX; x++) {
      // if (x % 100_000 === 0) console.log(`${x} / ${realMaxX}`)
      const pos = { x, y: line }

      const sensor = sensors.some((sensor) => {
        const beacon = this.items.at(sensor)
        const dist = this.#dist(sensor, beacon)

        return this.#dist({ x, y: line }, sensor) <= dist
      })

      if (sensor) count += 1
    }

    const beacons = sensors.map((coords) => this.items.at(coords))
    const beaconsOnThatLine = beacons
      .filter((coords) => coords.y == line)
      .map((coords) => this.items.encodeKey(coords))
      .filter((value, index, self) => self.indexOf(value) === index)

    return count - beaconsOnThatLine.length
  }
}

// Part 1
// Takes ~ 1:30 to compute
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new SensorsReport(input).unavailablePositionsForBeacon(2_000_000))

// Part 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(sumOfPrioritiesOfBadgeItemsForEeach3ElfGroup(input))
