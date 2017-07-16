// @flow

export const WEB_PORT = process.env.PORT || 8000
export const WDS_PORT = 7000
export const STATIC_PATH = '/static'

export const APP_NAME = 'Postman Chat'

export const APP_CONTAINER_CLASS = 'postman-chat'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`
export const JSS_SSR_CLASS = 'jss-ssr'
export const JSS_SSR_SELECTOR = `.${JSS_SSR_CLASS}`

export const IO_CONNECT = 'connect'
export const IO_DISCONNECT = 'disconnect'
export const IO_CLIENT_JOIN_CHAT = 'IO_CLIENT_JOIN_CHAT'
export const IO_CLIENT_LEAVE_CHAT = 'IO_CLIENT_LEAVE_CHAT'
export const IO_CLIENT_NEW_CHAT_MESSAGE = 'IO_CLIENT_NEW_CHAT_MESSAGE'
