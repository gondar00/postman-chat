// @flow

import { createAction } from 'redux-actions'
import dummyData from '../data.json'

export const HOME_PAGE_REQUEST = 'HOME_PAGE_REQUEST'
export const HOME_PAGE_SUCCESS = 'HOME_PAGE_SUCCESS'
export const HOME_PAGE_FAILURE = 'HOME_PAGE_FAILURE'

const homePageRequest = createAction(HOME_PAGE_REQUEST)
const homePageRequestSuccess = createAction(HOME_PAGE_SUCCESS)
const homePageRequestFailure = createAction(HOME_PAGE_FAILURE)

export const RANDOM_USER_REQUEST = 'RANDOM_USER_REQUEST'
export const RANDOM_USER_SUCCESS = 'RANDOM_USER_SUCCESS'
export const RANDOM_USER_FAILURE = 'RANDOM_USER_FAILURE'

const randomUserRequest = createAction(RANDOM_USER_REQUEST)
const randomUserSuccess = createAction(RANDOM_USER_SUCCESS)
const randomUserFailure = createAction(RANDOM_USER_FAILURE)

export function getData(params) {
  return (dispatch) => {
    dispatch(homePageRequest())
    if (dummyData) return dispatch(homePageRequestSuccess(dummyData))
    return dispatch(homePageRequestFailure('Failed to load the json file'))
  }
}

export function getRandomCurrentUser() {
  return (dispatch) => {
    dispatch(randomUserRequest())
    const random = Math.floor(Math.random() * dummyData.users.length)

    if (random <= dummyData.users.length) {
      return dispatch(randomUserSuccess(dummyData.users[random]))
    }
    return dispatch(randomUserFailure('Failed to fetch random user'))
  }
}
