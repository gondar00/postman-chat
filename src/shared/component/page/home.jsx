// @flow

import React from 'react'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import { APP_NAME } from '../../config'

const styles = {}

const HomePage = ({ classes }: { classes: Object }) =>
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Chat app' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <div className="container">
      <div className="row">
        <div className="col-md-4 mt-4 mb-4">
          <h3 className="mb-3">Contact List comes here</h3>
        </div>
        <div className="col-md-8 mt-4 mb-4">
          <h3 className="mb-3">Chats come here</h3>
        </div>
      </div>
    </div>
  </div>

export default injectSheet(styles)(HomePage)
