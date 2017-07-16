// @flow

import React from 'react'
import injectSheet from 'react-jss'

import styles from '../styles/friend-list'

type Props = {
  classes: Object,
  friends: Immutable.Map,
}
const Friend = ({friend, classes}) => (
  <li className="list-group-item justify-content-between">
    <img className={classes.img} src="/static/img/img_avatar_1.png" alt="Friend1" width="96" /> {friend.get('name')}
    <span className="badge badge-default badge-pill">14</span>
  </li>
)
const FriendList = ({ classes, friends }: Props) => (
  <ul className="list-group">
    {friends.map(friend => <Friend friend={friend} classes={classes} />)}
  </ul>
)

export default injectSheet(styles)(FriendList)
