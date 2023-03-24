import { data } from 'src/data'
import { store } from '..'
import { collectionActions } from '../slices/collectionSlice'

describe('store', () => {
  it('should match initial state', () => {
    expect(store.getState()).toMatchSnapshot()
  })

  it('should add a booster to the collection', () => {
    store.dispatch(collectionActions.add(data.sets[0].boosters[0]))

    expect(store.getState()).toMatchSnapshot()
  })

  it('should remove a booster from the collection', () => {
    store.dispatch(collectionActions.remove(data.sets[0].boosters[0]))

    expect(store.getState()).toMatchSnapshot()
  })

  it('should clear the whole collection', () => {
    store.dispatch(collectionActions.add(data.sets[0].boosters[0]))
    store.dispatch(collectionActions.add(data.sets[0].boosters[1]))
    store.dispatch(collectionActions.add(data.sets[0].boosters[2]))
    store.dispatch(collectionActions.clear())

    expect(store.getState()).toMatchSnapshot()
  })
})
