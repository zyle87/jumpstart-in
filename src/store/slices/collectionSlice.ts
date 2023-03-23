import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CollectionState = MTG.Booster[]

const initialState: CollectionState = []

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    clear: state => {
      state.splice(0, state.length)
    },
    add: (state, action: PayloadAction<MTG.Booster>) => {
      state.push(action.payload)
    },
    remove: (state, action: PayloadAction<MTG.Booster>) => {
      state.splice(
        state.findIndex(
          entry => JSON.stringify(entry) === JSON.stringify(action.payload)
        ),
        1
      )
    },
  },
})

export const collectionActions = collectionSlice.actions

export default collectionSlice.reducer
