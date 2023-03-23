import { useCallback, useContext } from 'react'
import { data } from '../data'
import { TranslateContext } from './useTranslate'

/**
 * @description
 * A custom hook that returns a set of functions to help with MTG related tasks.
 */
export const useMTGTools = () => {
  const { t } = useContext(TranslateContext)

  const getHexFromRarity = useCallback((rarity: MTG.Rarity) => {
    switch (rarity) {
      case 'common':
        return '#d9d5d0'
      case 'rare':
        return '#a58e4a'
      case 'mythic':
        return '#bf4427'
    }
  }, [])

  const getHexFromColor = useCallback((color: MTG.Color) => {
    switch (color) {
      case 'white':
        return '#fcf9e1'
      case 'blue':
        return '#cae0ef'
      case 'black':
        return '#cbbeb5'
      case 'red':
        return '#f5a477'
      case 'green':
        return '#a8c796'
      case 'colorless':
        return '#d8d1ca'
    }
  }, [])

  const getSetFromBooster = useCallback(
    (booster: MTG.Booster) =>
      data.sets.find(set =>
        JSON.stringify(set.boosters).includes(JSON.stringify(booster))
      )!.id,
    []
  )

  const getCombinationFromDeck = useCallback(
    (deck: MTG.Deck) => {
      if (deck.length !== 2) {
        return '???'
      }

      const colors = deck
        .map(booster => booster.color)
        .filter(booster => booster !== 'colorless')

      if (colors.length === 0) {
        return t('colorless')
      } else if (colors.length === 1) {
        return data.combinations.find(combination =>
          combination.colors.every(color => color === colors[0])
        )?.name
      } else {
        return data.combinations.find(
          combination =>
            JSON.stringify(combination.colors.sort()) ===
            JSON.stringify(colors.sort())
        )?.name
      }
    },
    [t]
  )

  return {
    getHexFromRarity,
    getHexFromColor,
    getSetFromBooster,
    getCombinationFromDeck,
  }
}
