import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import dummyData from '../data.json'

import {
  getData,
  HOME_PAGE_REQUEST,
  RANDOM_USER_REQUEST,
  HOME_PAGE_SUCCESS,
  RANDOM_USER_SUCCESS,
  HOME_PAGE_FAILURE,
  RANDOM_USER_FAILURE,
} from './home'

const mockStore = configureMockStore([thunk])
const store = mockStore({ isFetching: true, data: [], currentUser: {} })

describe('HOME PAGE ACTION', () => {
  it('creates HOME_PAGE_SUCCESS when logging in', () => {
    const expectedActions = [
      { type: HOME_PAGE_REQUEST },
      {
        type: HOME_PAGE_SUCCESS,
        payload: dummyData,
      },
    ]

    store.dispatch(
      getData(),
    )
    expect(store.getActions()).toEqual(expectedActions)
  })
})
