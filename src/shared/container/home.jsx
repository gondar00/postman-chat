// @flow

import { connect } from 'react-redux'
import React from 'react'
import socketIOClient from 'socket.io-client'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'
import classnames from 'classnames'
import { fromJS } from 'immutable'
import FriendList from '../component/friend-list'
import MessageList from '../component/message-list'
import Input from '../component/input'
import { IO_CLIENT_JOIN_CHAT, IO_CLIENT_LEAVE_CHAT, IO_CLIENT_NEW_CHAT_MESSAGE, APP_NAME } from '../config'
import { getData } from '../action/home'

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
}
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { userData: fromJS([]), message: '' }
    socket.on(IO_CLIENT_NEW_CHAT_MESSAGE, (payload) => {
      this.updateChatFromSockets(payload)
    })
    this.handleNewMessage = this.handleNewMessage.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.updateChatFromSockets = this.updateChatFromSockets.bind(this)
  }
  componentDidMount() {
    const { userData, getUserData } = this.props
    if (userData.size === 0) {
      getUserData()
    } else {
      socket.emit(IO_CLIENT_JOIN_CHAT, userData.toJS().threads[0])
      this.setState({
        userData,
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userData !== this.state.userData) {
      const { userData } = nextProps
      socket.emit(IO_CLIENT_JOIN_CHAT, userData.toJS().threads[0])
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
    const { userData, message } = this.state
    const tempUserData = userData.toJS()
    const newMessage = {
      'user-id': 1,
      type: 0,
      payload: message,
      date: 'date',
    }
    tempUserData.threads[0].messages.push(newMessage)
    socket.emit(IO_CLIENT_NEW_CHAT_MESSAGE, {
      id: tempUserData.threads[0].id,
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
  updateChatFromSockets(payload) {
    this.setState({
      userData: fromJS(payload.userData),
    })
  }
  props: Props
  render() {
    const { classes } = this.props
    const { userData, message } = this.state
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
              <Input placeholder="Search" />
              <FriendList friends={userData.get('users')} />
            </div>
            <div className="col-md-8 mt-4 mb-4">
              <form className={classes.chat} onSubmit={this.handleNewMessage}>
                <span className={classes.loading} />
                <div className={classes.messages} id="postmanchat">
                  <MessageList messages={userData.get('threads').first().get('messages')} />
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
})

const mapDispatchToProps = dispatch => ({
  getUserData: (id) => dispatch(getData(1)),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(HomePage),
)
