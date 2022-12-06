import { startOfPacketIndex, startOfMessageIndex } from './day6'

const input = ``

test('part 1 works', () => {
  // mjqjpqmgbljsphdztnvjfqwrcgsmlb
  //       ^
  // mjqj => j
  // jqjp => j
  // qjpq => q
  // jpqm => !!!
  expect(startOfPacketIndex('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(7)
  expect(startOfPacketIndex('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5)
  expect(startOfPacketIndex('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6)
  expect(startOfPacketIndex('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(10)
  expect(startOfPacketIndex('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(11)
})

test('part 2 works', () => {
  // mjqjpqmgbljsphdztnvjfqwrcgsmlb
  //                   ^
  // q m g b l j s p h d z t n v
  // mjqjpqmgbljsphdztnvjfqwrcgsmlb
  // mjqjpqmgbljsphdztnvjfqwrcgsmlb
  // mjqjpqmgbljsphdztnvjfqwrcgsmlb
  // mjqjpqmgbljsphdztnvjfqwrcgsmlb
  // mjqjpqmgbljsphdztnvjfqwrcgsmlb
  expect(startOfMessageIndex('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(19)
  expect(startOfMessageIndex('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(23)
  expect(startOfMessageIndex('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(23)
  expect(startOfMessageIndex('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(29)
  expect(startOfMessageIndex('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(26)
})
