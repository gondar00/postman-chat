// @flow

import React from 'react'
import injectSheet from 'react-jss'

import styles from '../styles/friend-list'

type Props = {
  classes: Object,
  currentUserId: Integer,
  updateThread: Function,
  friends: Immutable.Map,
}
const Friend = ({ friend, classes, updateThread }) => (
  <li className="list-group-item justify-content-between" onClick={() => updateThread(friend.get('id'))}>
    <img className={classes.img} src="/static/img/img_avatar_1.png" alt="Friend1" width="96" /> {friend.get('name')}
     <span className="badge badge-default badge-pill">0</span> 
  </li>
)
const FriendList = ({ classes, friends, currentUserId, updateThread }: Props) => (
  <ul className="list-group">
    {friends.map((friend) => { if (currentUserId !== friend.get('id')) return (<Friend key={friend.get('id')} friend={friend} classes={classes} updateThread={updateThread} />) })}
  </ul>
)

export default injectSheet(styles)(FriendList)
