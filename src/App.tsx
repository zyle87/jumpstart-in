import { FC } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { TranslateContext, useTranslate } from './hooks/useTranslate'
import { store } from './store'
import CollectionPage from './views/CollectionPage'
import CompositionPage from './views/CompositionPage'
import Root from './views/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <CompositionPage />,
      },
      {
        path: 'collection',
        element: <CollectionPage />,
      },
    ],
  },
])

const App: FC = () => {
  const translate = useTranslate()

  return (
    <main>
      <TranslateContext.Provider value={translate}>
        <StoreProvider store={store}>
          <RouterProvider router={router} />
        </StoreProvider>
      </TranslateContext.Provider>
    </main>
  )
}

export default App
