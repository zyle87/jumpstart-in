import { act, renderHook } from '@testing-library/react'
import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { data } from '../../data'
import { store } from '../../store'
import { useComposition } from '../useComposition'

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

describe('useComposition', () => {
  it('should compose a new deck', () => {
    const { result } = renderHook(() => useComposition(), { wrapper })

    act(() => {
      result.current.composeNewDeck()
    })

    act(() => {
      const actual: MTG.Deck = []

      expect(result.current.currentDeck).toStrictEqual(actual)
    })
  })

  it('should add a booster to the current deck', () => {
    const { result } = renderHook(() => useComposition(), { wrapper })
    const set = data.sets[Math.floor(Math.random() * data.sets.length)]
    const booster =
      set.boosters[Math.floor(Math.random() * set.boosters.length)]

    act(() => {
      result.current.addBoosterToCurrentDeck(booster)
    })

    act(() => {
      const actual: MTG.Deck = [booster]

      expect(result.current.currentDeck).toStrictEqual(actual)
    })
  })
})
