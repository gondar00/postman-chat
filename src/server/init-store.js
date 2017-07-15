// @flow

// import Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { reducers } from '../shared/reducers'
import { isProd } from '../shared/config'

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  // if (plainPartialState && plainPartialState.hello) {

  // }
  const middlewares = []
  middlewares.push(thunkMiddleware)
  const reducer = combineReducers(reducers)
  const enhancers = [
    applyMiddleware(...middlewares),
    !isProd &&
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f,
  ]
  const store = createStore(reducer, preloadedState, compose(...enhancers))
  return store
}

export default initStore
