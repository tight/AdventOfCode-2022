import { readFileSync } from 'fs'
import { join } from 'path'

const scoreForPlaying = (symbol: string) => {
  const score = {
    X: 1,
    Y: 2,
    Z: 3,
  }[symbol]

  if (score === undefined) throw new Error(`Unexpected symbol "${symbol}"`)

  return score
}

const scoreForResult = (round: string) => {
  const score = {
    'A X': 3,
    'A Y': 6,
    'A Z': 0,

    'B X': 0,
    'B Y': 3,
    'B Z': 6,

    'C X': 6,
    'C Y': 0,
    'C Z': 3,
  }[round]

  if (score === undefined) throw new Error(`Unexpected round "${round}"`)

  return score
}

export const scoreFor = (round: string) => {
  const first = round.slice(2, 3)
  return scoreForPlaying(first) + scoreForResult(round)
}

export const scoreForStrategyGuide = (rounds: string) => {
  return rounds
    .split('\n')
    .map((round) => scoreFor(round))
    .reduce((accumulator, current) => accumulator + current, 0)
}

// X means you need to lose
// Y means you need to end the round in a draw
// and Z means you need to win

const symbolToPlay = (round: string) => {
  const toPlay = {
    'A X': 'Z',
    'A Y': 'X',
    'A Z': 'Y',

    'B X': 'X',
    'B Y': 'Y',
    'B Z': 'Z',

    'C X': 'Y',
    'C Y': 'Z',
    'C Z': 'X',
  }[round]

  if (toPlay === undefined) throw new Error(`Unexpected round "${round}"`)

  return toPlay
}

const scoreForResultV2 = (round: string) => {
  const score = {
    X: 0,
    Y: 3,
    Z: 6,
  }[round.slice(2, 3)]

  if (score === undefined) throw new Error(`Unexpected round "${round}"`)

  return score
}

export const scoreForV2 = (round: string) => {
  const mySymbol = symbolToPlay(round)

  return scoreForPlaying(mySymbol) + scoreForResultV2(round)
}

export const scoreForStrategyGuideV2 = (rounds: string) => {
  return rounds
    .split('\n')
    .map((round) => scoreForV2(round))
    .reduce((accumulator, current) => accumulator + current, 0)
}

// 1
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(scoreForStrategyGuide(input))

// 2
// const input = readFileSync(join(__dirname, 'input.txt'), 'utf8')
// console.log(scoreForStrategyGuideV2(input))
