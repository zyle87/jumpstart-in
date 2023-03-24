import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { data } from '../../data'

export type SettingsState = {
  paletteMode: PaletteMode
  includedSets: string[]
  storeVersion: string
}

const initialState: SettingsState = {
  paletteMode: 'dark',
  includedSets: [...data.sets.map(set => set.id)],
  storeVersion: process.env.REACT_APP_STORE_VERSION,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    togglePaletteMode: state => {
      state.paletteMode = state.paletteMode === 'light' ? 'dark' : 'light'
    },
    allowSet: (
      state,
      {
        payload: { id },
      }: PayloadAction<{
        id: string
      }>
    ) => {
      state.includedSets.push(id)
    },
    disallowSet: (
      state,
      {
        payload: { id },
      }: PayloadAction<{
        id: string
      }>
    ) => {
      state.includedSets.splice(state.includedSets.indexOf(id), 1)
    },
  },
})

export const settingsActions = settingsSlice.actions

export default settingsSlice.reducer
