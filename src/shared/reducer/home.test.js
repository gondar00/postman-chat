import { fromJS } from 'immutable'

import homeReducer from './home'

const initialState = fromJS({ isFetching: true, data: {} })

describe('HOME REDUCER', () => {
  test('Should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual(initialState)
  })
})
