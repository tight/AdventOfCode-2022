import { CathodeRayTube } from './day10'

const input = `noop
addx 3
addx -5`

const input2 = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

const crt1 = new CathodeRayTube().process(input)
const crt2 = new CathodeRayTube().process(input2)

test('part 1 works - 1', () => {
  expect(crt1.xAt(1)).toEqual(1) // noop
  expect(crt1.xAt(2)).toEqual(1) // addx 3
  expect(crt1.xAt(3)).toEqual(1) // addx -5
  expect(crt1.xAt(4)).toEqual(4) // addx 3 effect
  expect(crt1.xAt(5)).toEqual(4) // addx -5 effect
})

test('part 1 works - 2', () => {
  expect(crt2.xAt(20)).toEqual(21)
  expect(crt2.signalStrengthAt(20)).toEqual(420)
  expect(crt2.sumSignalStrenth()).toEqual(13140)
})

test('part 2 - sprite position', () => {
  expect(crt2.spritePositionsAt(1)).toEqual([0, 1, 2])
})

test('part 2 - CRT position', () => {
  expect(crt2.drawerPositionAt(1)).toEqual(0)
  expect(crt2.drawerPositionAt(41)).toEqual(0)
})

test('part 2 - drawing ?', () => {
  expect(crt2.isDrawingAt(1)).toEqual(true)
  expect(crt2.isDrawingAt(2)).toEqual(true)
  expect(crt2.isDrawingAt(3)).toEqual(false)
})

test('part 2 - works', () => {
  expect(crt2.draw()).toEqual(`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`)
})
