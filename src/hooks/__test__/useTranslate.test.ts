import { act, renderHook } from '@testing-library/react'
import { en } from '../../translations/en'
import { fr } from '../../translations/fr'
import { useTranslate } from '../useTranslate'

describe('useTranslate', () => {
  const randomKey = Object.keys(en)[
    Math.floor(Math.random() * Object.keys(en).length)
  ] as keyof typeof en

  it('should return a translated string in english', () => {
    const expected = en[randomKey]
    const { result } = renderHook(() => useTranslate())

    act(() => {
      const actual = result.current.t(randomKey)

      expect(actual).toBe(expected)
    })
  })

  it('should return a translated string in french', () => {
    const expected = fr[randomKey]
    const { result } = renderHook(() => useTranslate())

    act(() => {
      result.current.setLocale('fr')
    })

    act(() => {
      const actual = result.current.t(randomKey)

      expect(actual).toBe(expected)
    })
  })
})
