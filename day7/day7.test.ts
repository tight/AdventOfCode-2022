import { Filesystem } from './day7'

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

// Find all of the directories with a total size of at most 100000.
// What is the sum of the total sizes of those directories?

test('directory file size 1', () => {
  expect(new Filesystem().run(input).dirSize(['/', 'a', 'e'])).toEqual(584)
})

test('directory file size 2', () => {
  expect(new Filesystem().run(input).dirSize(['/', 'a'])).toEqual(94853)
})

test('directory file size 2', () => {
  expect(new Filesystem().run(input).dirSize(['/', 'd'])).toEqual(24933642)
})

test('directory file size /', () => {
  expect(new Filesystem().run(input).dirSize(['/'])).toEqual(48381165)
})

test('part 1 works', () => {
  expect(new Filesystem().run(input).smallDirTotalSize()).toEqual(95437)
})

test('part 2 works', () => {
  expect(new Filesystem().run(input).totalSizeOfSmallestDirToDelete()).toEqual(24933642)
})
