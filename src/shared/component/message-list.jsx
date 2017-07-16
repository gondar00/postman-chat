// @flow

import React from 'react'
import injectSheet from 'react-jss'

import styles from '../styles/message'

type Props = {
  classes: Object,
  messages: Immutable.Map,
}

const Message = ({ message, classes }) => (
  <div className={classes.sender}>
    <p className={classes.messageHolder}>{message.get('payload')}</p>
  </div>
)
const MessageList = ({ classes, messages }: Props) => (
  <div className={classes.message}>
    {messages.map(message => <Message message={message} classes={classes} />)}
  </div>
)

export default injectSheet(styles)(MessageList)
