import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit'
import collection from './slices/collectionSlice'
import composition from './slices/compositionSlice'
import settings from './slices/settingsSlice'
import { loadState, saveState } from './storage'

const preloadedState = loadState()
const reducer = { collection, composition, settings }

export const store = configureStore({
  preloadedState,
  reducer,
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = StateFromReducersMapObject<typeof reducer>
export type AppDispatch = typeof store.dispatch
