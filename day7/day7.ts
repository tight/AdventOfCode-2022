import { readFileSync } from 'fs'
import { join } from 'path'

type FileOrDirectoryType = 'dir' | 'file'

class FileOrDirectory {
  parent: FileOrDirectory | null
  children: Array<FileOrDirectory>
  name: string
  nodeType: FileOrDirectoryType
  size: number

  constructor(name: string, nodeType: FileOrDirectoryType, parent: FileOrDirectory | null = null, size = 0) {
    this.parent = parent
    this.name = name
    this.nodeType = nodeType
    this.size = size
    this.children = []
  }

  cd(path: string) {
    if (path === '/') {
      let result: FileOrDirectory = this
      while (this.parent) {
        result = this.parent
      }
      return result
    } else if (path == '..') {
      const result = this.parent
      if (!result) throw new Error(`Can't cd .., already at root`)
      return result
    } else {
      const result = this.children.find((child) => child.isDir() && child.getName() === path)
      if (!result) throw new Error(`Can't cd into "${path}", directory does not exists`)
      return result
    }
  }

  createDir(dirName: string) {
    this.children.push(new FileOrDirectory(dirName, 'dir', this))
  }

  createFile(fileName: string, fileSize: number) {
    this.children.push(new FileOrDirectory(fileName, 'file', this, fileSize))
  }

  isDir() {
    return this.nodeType == 'dir'
  }

  isFile() {
    return !this.isDir()
  }

  getName() {
    return this.name
  }

  getPath() {
    let paths = []
    let result: FileOrDirectory = this
    while (result.parent) {
      paths.push(result)
      result = result.parent
    }
    return ['/'].concat(paths.reverse().map((path) => path.getName()))
  }

  getSize(): number {
    if (this.isFile()) {
      return this.size
    } else {
      return this.children
        .map((child) => {
          const size = child.getSize()
          return child.getSize()
        })
        .reduce((acc, current) => acc + current, 0)
    }
  }
}

// private
interface DirWithSize {
  path: Array<string>
  size: number
}

export class Filesystem {
  root: FileOrDirectory

  constructor() {
    this.root = new FileOrDirectory('/', 'dir')
  }

  run(input: string) {
    let current = this.root

    input.split('\n').forEach((instr) => {
      if (instr.slice(0, 4) === '$ cd') {
        const path = instr.slice(5, instr.length)
        current = current.cd(path)
      } else if (instr.slice(0, 4) === '$ ls') {
        // NOOP
      } else if (instr.slice(0, 3) === 'dir') {
        const dirName = instr.slice(4, instr.length)
        current.createDir(dirName)
      } else {
        const [rawfileSize, fileName] = instr.split(' '),
          fileSize = parseInt(rawfileSize, 10)
        current.createFile(fileName, fileSize)
      }
    })

    return this
  }

  dirSize(paths: Array<string>) {
    let node = this.root
    paths.forEach((path) => {
      node = node.cd(path)
    })

    if (node.isFile()) throw new Error(`Can't be called for files`)

    return node.getSize()
  }

  smallDirTotalSize(current: FileOrDirectory | null = null, sizes: Array<number> = []) {
    if (!current) current = this.root
    sizes.push(current.getSize())
    current.children.forEach((child) => {
      if (child.isDir()) this.smallDirTotalSize(child, sizes)
    })

    return sizes.filter((size) => size <= 100000).reduce((acc, current) => acc + current, 0)
  }

  totalSizeOfSmallestDirToDelete() {
    const dirWithSizes = this.#computeDirWithSizes().sort((a, b) => {
      return a.size - b.size
    })

    const freeSpace = 70_000_000 - dirWithSizes.slice(-1)[0].size
    const result = dirWithSizes.find((dirWithSize) => freeSpace + dirWithSize.size >= 30_000_000)

    if (result) return result.size
  }

  #computeDirWithSizes(current: FileOrDirectory | null = null, sizes: Array<DirWithSize> = []) {
    if (!current) current = this.root
    sizes.push({ path: current.getPath(), size: current.getSize() })
    current.children.forEach((child) => {
      if (child.isDir()) this.#computeDirWithSizes(child, sizes)
    })

    return sizes
  }
}

// Part 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Filesystem().run(input).smallDirTotalSize())

// Part 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(new Filesystem().run(input).totalSizeOfSmallestDirToDelete())
