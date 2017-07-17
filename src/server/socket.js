// @flow

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_JOIN_CHAT,
  IO_CLIENT_LEAVE_CHAT,
  IO_CLIENT_NEW_CHAT_MESSAGE,
} from '../shared/config'

/* eslint-disable no-console */
const setUpSocket = (io: Object) => {
  io.on(IO_CONNECT, (socket) => {
    console.log('[socket.io] A client connected.')

    socket.on(IO_CLIENT_JOIN_CHAT, (id) => {
      socket.join(id)
      console.log(`[socket.io] A client joined thread ${id}.`)
    })
    socket.on(IO_CLIENT_LEAVE_CHAT, (chat) => {
      socket.leave(chat.id)
    })
    socket.on(IO_CLIENT_NEW_CHAT_MESSAGE, (data) => {
      socket.broadcast.to(data.id).emit(IO_CLIENT_NEW_CHAT_MESSAGE, data)
    })
    socket.on(IO_DISCONNECT, () => {
      console.log('[socket.io] A client disconnected.')
    })
  })
}
/* eslint-enable no-console */

export default setUpSocket
