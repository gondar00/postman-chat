// @flow

import 'babel-polyfill'

// import Immutable from 'immutable'
import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Tether from 'tether'

import InitStore from '../server/init-store'
import App from '../shared/app'
import { APP_CONTAINER_SELECTOR, JSS_SSR_SELECTOR } from '../shared/config'
// import { isProd } from '../shared/util'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

/* eslint-disable no-underscore-dangle */
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

const store = InitStore(preloadedState)
const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/app').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}

const jssServerSide = document.querySelector(JSS_SSR_SELECTOR)
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide)
