import { useCallback, useState } from 'react'
import { data } from '../data'
import { collectionActions } from '../store/slices/collectionSlice'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

/**
 * @description
 * A hook that provides access to the collection state and actions.
 */
export const useCollection = () => {
  const dispatch = useAppDispatch()
  const collection = useAppSelector(state => state.collection)

  const [stringifiedCollection, setStringifiedCollection] = useState<string>('')

  const addToCollection = useCallback(
    (booster: MTG.Booster) => {
      dispatch(collectionActions.add(booster))
    },
    [dispatch]
  )

  const removeFromCollection = useCallback(
    (booster: MTG.Booster) => {
      dispatch(collectionActions.remove(booster))
    },
    [dispatch]
  )

  const clearCollection = useCallback(() => {
    dispatch(collectionActions.clear())
  }, [dispatch])

  const importCollection = useCallback(() => {
    if (!stringifiedCollection) return

    dispatch(collectionActions.clear())

    const boosters = data.sets.map(set => set.boosters).flat()

    stringifiedCollection.split('\n').forEach(entry => {
      const booster = boosters.find(
        booster =>
          booster.id === entry.split(' ')[0] &&
          booster.variant === parseInt(entry.split(' ')[1].substring(1))
      )!
      booster && dispatch(collectionActions.add(booster))
    })
  }, [dispatch, stringifiedCollection])

  const exportCollection = useCallback(() => {
    setStringifiedCollection(
      collection.map(card => `${card.id} #${card.variant}`).join('\n')
    )
  }, [collection])

  return {
    collection,
    addToCollection,
    removeFromCollection,
    importCollection,
    exportCollection,
    clearCollection,
    stringifiedCollection,
    setStringifiedCollection,
  }
}
