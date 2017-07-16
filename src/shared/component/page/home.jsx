// @flow

import React from 'react'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import classnames from 'classnames'
import Input from '../input'
import Message from '../message'
import { APP_NAME } from '../../config'

const styles = {
  h600: {
    height: '600px',
  },
  img: {
    float: 'left',
    height: '50px',
    width: '50px',
    borderRadius: '50%',
  },
  chat: {
    transition: 'all .5s',
    boxSizing: 'border-box',
    margin: 0,
    cursor: 'default',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    userSelect: 'none',
  },
  loading: {
    animation: 'loading-bar 2s 1',
    display: 'block',
    height: '2px',
    backgroundColor: '#00e34d',
    transition: 'width 0.2s',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 4,
  },
  messages: {
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'scroll',
    position: 'relative',
    height: '90%',
    width: '100%',
    padding: '2% 3%',
    borderBottom: '1px solid #ecf0f1',
  },
  '@keyframes loading-bar': {
    '0%': { width: 0 },
    '90%': { width: '90%' },
    '100%': { width: '100%' },
  },
}

const HomePage = ({ classes }: { classes: Object }) =>
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Chat app' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <div className="container">
      <div className={classnames(classes.h600, 'row')}>
        <div className="col-md-4 mt-4 mb-4">
          <Input placeholder="Search" />
          <ul className="list-group">
            <li className="list-group-item justify-content-between active">
              <img className={classes.img} src="/static/img/img_avatar_1.png" alt="Friend1" width="96" /> Friend1
              <span className="badge badge-default badge-pill">14</span>
            </li>
            <li className="list-group-item justify-content-between">
              <img className={classes.img} src="/static/img/img_avatar_2.png" alt="Friend2" width="96" /> Friend2
              <span className="badge badge-default badge-pill">14</span>
            </li>
          </ul>
        </div>
        <div className="col-md-8 mt-4 mb-4">
          <form className={classes.chat}>
            <span className={classes.loading} />
            <div className={classes.messages} id="postmanchat">
              <Message />
              <Message sender />
              <Message />
            </div>
            <Input type="text" placeholder="Your message" />
          </form>
        </div>
      </div>
    </div>
  </div>

export default injectSheet(styles)(HomePage)
