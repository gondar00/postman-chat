// @flow

import React from 'react'
import injectSheet from 'react-jss'

import styles from '../styles/message'

type Props = {
  classes: Object,
  sender: Boolean,
}

const Message = ({ classes, sender }: Props) => (
  <div className={classes.message}>
    <div className={sender ? classes.sender : classes.receiver}>
      <p className={classes.messageHolder}>Yes, I am a message.</p>
    </div>
  </div>
)

export default injectSheet(styles)(Message)
