import { Pairs } from './day13'

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

test('part 1 works', () => {
  expect(new Pairs(input).sumOfIndicesOfPairInTheRightOrder()).toEqual(13)
})

test('part 2 works', () => {
  expect(new Pairs(input).decoderKey()).toEqual(140)
})
