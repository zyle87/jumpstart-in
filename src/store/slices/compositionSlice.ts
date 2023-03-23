import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ComposeState = {
  pool: MTG.Booster[]
  decks: MTG.Deck[]
}

const initialState: ComposeState = { pool: [], decks: [] }

export const compositionSlice = createSlice({
  name: 'composition',
  initialState,
  reducers: {
    setPool: (state, action: PayloadAction<MTG.Booster[]>) => {
      state.pool = action.payload
    },
    initDeck: state => {
      state.decks.push([])
    },
    addBooster: (state, action: PayloadAction<MTG.Booster>) => {
      state.decks[state.decks.length - 1].push(action.payload)
    },
    deleteDeck: (state, action: PayloadAction<number>) => {
      state.decks.splice(action.payload, 1)
    },
  },
})

export const compositionActions = compositionSlice.actions

export default compositionSlice.reducer
