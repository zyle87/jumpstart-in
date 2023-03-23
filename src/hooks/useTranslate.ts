import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { en } from '../translations/en'
import { fr } from '../translations/fr'

//
export const TranslateContext = createContext<{
  t: (key: keyof typeof en) => string
}>({
  t: key => key,
})

/**
 * @description
 * A custom hook that returns a translation function and a setter for the locale.
 * The translation function takes a TKey and returns a translated string.
 * The locale is set to the user's browser language by default.
 * If the user's browser language is not supported, the locale is set to english and the TKey is returned instead.
 *
 * @example
 * const { t, setLocale } = useTranslate()
 *
 * return (
 *   <div>
 *     {t('hello')}
 *     <button onClick={() => setLocale('fr')}>French</button>
 *   </div>
 * )
 *
 * @returns
 * {t: (key: keyof typeof en) => string, setLocale: React.Dispatch<React.SetStateAction<string>>}
 */
export const useTranslate = () => {
  const [locale, setLocale] = useState(navigator.language)
  const [translations, setTranslations] = useState(en)

  const formattedLocale = useMemo(
    () => (locale.includes('-') ? locale.split('-')[0] : locale),
    [locale]
  )

  useEffect(() => {
    switch (formattedLocale) {
      default:
      case 'en':
        setTranslations(en)
        break
      case 'fr':
        setTranslations(fr)
        break
    }
  }, [formattedLocale])

  const translate = useCallback(
    (key: keyof typeof en) => {
      const word = translations[key]

      if (word) {
        return word
      } else {
        console.warn(
          'No translation found TKey:',
          `"${key}"\n`,
          'Fallback to TKey.'
        )

        return key
      }
    },
    [translations]
  )

  return { t: translate, setLocale }
}
