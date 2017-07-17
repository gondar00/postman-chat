// @flow

import { connect } from 'react-redux'
import React from 'react'
import socketIOClient from 'socket.io-client'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import classnames from 'classnames'
import { fromJS } from 'immutable'
import isEmpty from 'lodash/isEmpty'
import FriendList from '../component/friend-list'
import MessageList from '../component/message-list'
import Input from '../component/input'
import { IO_CLIENT_JOIN_CHAT, IO_CLIENT_LEAVE_CHAT, IO_CLIENT_NEW_CHAT_MESSAGE, APP_NAME } from '../config'
import { getData, getRandomCurrentUser } from '../action/home'

const socket = socketIOClient('http://localhost:8000')

const styles = {
  h600: {
    height: '600px',
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
type Props = {
  classes: Object,
  userData: Immutable.Map,
  currentUser: Immutable.Map,
  getUserData: Function,
  getRandomUser: Function,
}
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { userData: fromJS([]), message: '', currentThread: 0 }
    socket.on(IO_CLIENT_NEW_CHAT_MESSAGE, (payload) => {
      this.updateChatFromSockets(payload)
    })
    this.handleNewMessage = this.handleNewMessage.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.updateChatFromSockets = this.updateChatFromSockets.bind(this)
    this.updateCurrentThread = this.updateCurrentThread.bind(this)
  }
  componentDidMount() {
    const { userData, getUserData, getRandomUser } = this.props
    // const { currentThread } = this.state
    if (userData.size === 0) {
      getRandomUser()
      getUserData()
    } else {
      // socket.emit(IO_CLIENT_JOIN_CHAT, userData.toJS().threads[currentThread])
      this.setState({
        userData,
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userData !== this.state.userData) {
      const { userData } = nextProps
      // socket.emit(IO_CLIENT_JOIN_CHAT, userData.toJS().threads[currentThread])
      this.setState({
        userData,
      })
    }
  }
  // componentWillUnmount() {  
  //   socket.emit(IO_CLIENT_LEAVE_CHAT, {
  //     chat: this.props.userData.threads[0],
  //   })
  // }
  handleNewMessage(e) {
    e.preventDefault()
    const { currentUser } = this.props
    const { userData, message, currentThread } = this.state
    const tempUserData = userData.toJS()
    const newMessage = {
      'user-id': currentUser.get('id'),
      type: 0,
      payload: message,
      date: new Date().toLocaleString(),
    }
    tempUserData.threads[currentThread].messages.push(newMessage)
    socket.emit(IO_CLIENT_NEW_CHAT_MESSAGE, {
      id: tempUserData.threads[currentThread].id,
      userData: tempUserData,
    })
    this.setState({
      userData: fromJS(tempUserData),
      message: '',
    })
  }
  handleMessageChange(e) {
    this.setState({
      message: e.target.value,
    })
  }
  handleFilterChange(e) {
    const query = e.target.value.toLowerCase()
    if (isEmpty(query)) this.setState({ userData: this.props.userData })
    else {
      const { userData } = this.state
      const filteredUserData = userData.get('users').filter(user => user.get('name').toLowerCase().includes(query))
      this.setState({
        userData: userData.set('users', filteredUserData),
      })
    }
  }
  updateCurrentThread(userId) {
    const { currentUser } = this.props
    const currentThread = currentUser.get('threads').find(thread => thread.get('user') === userId)
    this.setState({
      currentThread: currentThread.get('id'),
    })
    socket.emit(IO_CLIENT_JOIN_CHAT, currentThread.get('id'))
    // jOin and leave chat
  }
  updateChatFromSockets(payload) {
    this.setState({
      userData: fromJS(payload.userData),
    })
  }
  props: Props
  render() {
    const { classes, currentUser } = this.props
    const { userData, message, currentThread } = this.state
    if (userData.size === 0) return (<span>Loading</span>)
    return (
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
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">Hi, {currentUser.get('name')}</h4>
                </div>
              </div>
              <Input placeholder="Search" onChange={this.handleFilterChange} />
              <FriendList friends={userData.get('users')} currentUserId={currentUser.get('id')} updateThread={this.updateCurrentThread} />
            </div>
            <div className="col-md-8 mt-4 mb-4">
              <form className={classes.chat} onSubmit={this.handleNewMessage}>
                <span className={classes.loading} />
                <div className={classes.messages} id="postmanchat">
                  {currentThread === 0 ? <span>Click on a contact to start a chat</span> : <MessageList messages={userData.get('threads').get(currentThread.toString()).get('messages')} currentUserId={currentUser.get('id')} />}
                </div>
                <Input type="text" placeholder="Your message" value={message} onChange={this.handleMessageChange} />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.home.get('data'),
  currentUser: state.home.get('currentUser'),
})

const mapDispatchToProps = dispatch => ({
  getUserData: (id) => dispatch(getData()),
  getRandomUser: () => dispatch(getRandomCurrentUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(HomePage),
)
