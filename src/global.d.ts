declare type Nullable<T> = T | null
declare type Undefinable<T> = T | undefined

declare namespace MTG {
  declare type Color =
    | 'white'
    | 'blue'
    | 'black'
    | 'red'
    | 'green'
    | 'colorless'

  declare type Rarity = 'common' | 'rare' | 'mythic'

  declare type Combination = {
    name: string
    colors: [Color, Color]
  }

  declare type Set = {
    id: string
    name: string
    wiki: string
    boosters: Booster[]
  }

  declare type Booster = {
    id: string
    variant: number
    TKey: string
    color: Color
    rarity: Rarity
    front: string
    featured: string
  }

  declare type Deck = Booster[]
}

declare type PaletteMode = 'dark' | 'light'
