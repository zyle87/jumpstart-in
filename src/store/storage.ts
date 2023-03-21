import { RootState } from '.'

export const loadState: () => Undefinable<RootState> = () => {
  try {
    const serializedState = localStorage.getItem('state')

    return serializedState === null ? undefined : JSON.parse(serializedState)
  } catch (err) {}
}

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)

    localStorage.setItem('state', serializedState)
  } catch (err) {}
}
