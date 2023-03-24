import { useCallback, useMemo } from 'react'
import { useUpdateEffect } from 'react-use'
import { data } from '../data'
import { compositionActions } from '../store/slices/compositionSlice'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

/**
 * @description
 * A custom hook that provides composition state and actions.
 */
export const useComposition = () => {
  const dispatch = useAppDispatch()
  const collection = useAppSelector(state => state.collection)
  const composition = useAppSelector(state => state.composition)
  const settings = useAppSelector(state => state.settings)

  const currentDeck = useMemo(
    () => composition.decks[composition.decks.length - 1],
    [composition.decks]
  )

  const onHold = useMemo(
    () => currentDeck && currentDeck.length !== 2,
    [currentDeck]
  )

  const composeNewDeck = useCallback(() => {
    dispatch(compositionActions.initDeck())
  }, [dispatch])

  const addBoosterToCurrentDeck = useCallback(
    (booster: MTG.Booster) => {
      dispatch(compositionActions.addBooster(booster))
    },
    [dispatch]
  )

  useUpdateEffect(() => {
    const pool = [
      ...collection.filter(entry =>
        data.sets
          .filter(set => settings.includedSets.includes(set.id))
          .some(set =>
            JSON.stringify(set.boosters).includes(JSON.stringify(entry))
          )
      ),
    ]

    composition.decks.flat().forEach(booster => {
      var index = pool.findIndex(
        entry => JSON.stringify(entry) === JSON.stringify(booster)
      )

      index > -1 && pool.splice(index, 1)
    })

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }

    dispatch(compositionActions.setPool(pool))
  }, [collection, composition.decks, dispatch, settings.includedSets])

  return {
    composition,
    composeNewDeck,
    addBoosterToCurrentDeck,
    currentDeck,
    onHold,
  }
}
