// @flow

import React from 'react'
import injectSheet from 'react-jss'

import styles from '../styles/message'

type Props = {
  classes: Object,
  currentUserId: Number,
  messages: Immutable.Map,
}

const Message = ({ message, classes, isSender }) => (
  <div className={isSender ? classes.sender : classes.receiver}>
    <p className={classes.messageHolder}>{message.get('payload')}</p>
  </div>
)
const MessageList = ({ classes, messages, currentUserId }: Props) => (
  <div className={classes.message}>
    {messages.map(message => <Message message={message} classes={classes} isSender={currentUserId === message.get('user-id')} />)}
  </div>
)

export default injectSheet(styles)(MessageList)
