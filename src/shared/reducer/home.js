// @flow

import { fromJS } from 'immutable'

import {
  HOME_PAGE_REQUEST,
  RANDOM_USER_REQUEST,
  HOME_PAGE_SUCCESS,
  RANDOM_USER_SUCCESS,
  HOME_PAGE_FAILURE,
  RANDOM_USER_FAILURE,
} from '../action/home'

const initialState = fromJS({ isFetching: true, data: [], currentUser: {} })

const menuReducer = (
  state = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case HOME_PAGE_REQUEST:
      return state.set('isFetching', true)
    case HOME_PAGE_SUCCESS:
      return state.set('isFetching', false).set('data', fromJS(action.payload))
    case HOME_PAGE_FAILURE:
      return state.set('isFetching', false)
    case RANDOM_USER_REQUEST:
      return state.set('isFetching', true)
    case RANDOM_USER_SUCCESS:
      return state.set('isFetching', false).set('currentUser', fromJS(action.payload))
    case RANDOM_USER_FAILURE:
      return state.set('isFetching', false)
    default:
      return state
  }
}

export default menuReducer
