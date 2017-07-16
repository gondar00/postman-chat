// @flow

import { fromJS } from 'immutable'

import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_FAILURE,
} from '../action/home'

const initialState = fromJS({ isFetching: true, data: [] })

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
    default:
      return state
  }
}

export default menuReducer
