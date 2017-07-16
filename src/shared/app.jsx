// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import HomePage from './container/home'
import Footer from './component/footer'
import Nav from './component/nav'
import NotFoundPage from './component/page/not-found'
import { APP_NAME } from './config'
import {
  HOME_PAGE_ROUTE,
} from './routes'

const App = () =>
  <div style={{ height: '100%', paddingTop: 54 }}>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>

export default App
