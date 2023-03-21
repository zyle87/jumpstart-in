import { BRO } from './BRO'
import { DMU } from './DMU'
import { J22 } from './J22'
import { JMP } from './JMP'
import { ONE } from './ONE'

export type Data = {
  colors: MTG.Color[]
  rarities: MTG.Rarity[]
  combinations: MTG.Combination[]
  sets: MTG.Set[]
}

export const data: Data = {
  colors: ['white', 'blue', 'black', 'red', 'green', 'colorless'],
  rarities: ['mythic', 'rare', 'common'],
  combinations: [
    {
      name: 'Mono-White',
      colors: ['white', 'white'],
    },
    {
      name: 'Mono-Blue',
      colors: ['blue', 'blue'],
    },
    {
      name: 'Mono-Black',
      colors: ['black', 'black'],
    },
    {
      name: 'Mono-Red',
      colors: ['red', 'red'],
    },
    {
      name: 'Mono-Green',
      colors: ['green', 'green'],
    },
    {
      name: 'Azorius',
      colors: ['white', 'blue'],
    },
    {
      name: 'Boros',
      colors: ['red', 'white'],
    },
    {
      name: 'Dimir',
      colors: ['blue', 'black'],
    },
    {
      name: 'Golgari',
      colors: ['black', 'green'],
    },
    {
      name: 'Gruul',
      colors: ['red', 'green'],
    },
    {
      name: 'Izzet',
      colors: ['blue', 'red'],
    },
    {
      name: 'Orzhov',
      colors: ['white', 'black'],
    },
    {
      name: 'Rakdos',
      colors: ['black', 'red'],
    },
    {
      name: 'Selesnya',
      colors: ['white', 'green'],
    },
    {
      name: 'Simic',
      colors: ['blue', 'green'],
    },
  ],
  sets: [ONE, J22, BRO, DMU, JMP],
}
