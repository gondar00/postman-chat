// @flow

import { createAction } from 'redux-actions'
import dummyData from '../data.json'

export const HOME_PAGE_REQUEST = 'HOME_PAGE_REQUEST'
export const HOME_PAGE_SUCCESS = 'HOME_PAGE_SUCCESS'
export const HOME_PAGE_FAILURE = 'HOME_PAGE_FAILURE'

const homePageRequest = createAction(HOME_PAGE_REQUEST)
const homePageRequestSuccess = createAction(HOME_PAGE_SUCCESS)
const homePageRequestFailure = createAction(HOME_PAGE_FAILURE)

export function getData(params) {
  return (dispatch) => {
    dispatch(homePageRequest())
    if (dummyData) return dispatch(homePageRequestSuccess(dummyData))
    return dispatch(homePageRequestFailure('Failed to load the json file'))
  }
}
