import axios from 'axios'
import {fromJS} from 'immutable'
import {actionTypes} from './'
import io from 'socket.io-client'
const socket = io('ws://localhost:8080')

export const setChatmsg = data => ({
  type:actionTypes.SET_CHATMSG,
  data:fromJS(data)
})

export const setMsg = data => ({
  type:actionTypes.SET_MSG,
  data:fromJS(data)
})

export const setUnread = ({unread, msg}) => ({
  type: actionTypes.SET_UNREAD,
  unread: fromJS(unread),
  msg: fromJS(msg)
})

export const getUnreadInfo = () => {
  return async dispatch => {
    const {data} = await axios.get('/chat/unreadInfo')
    return dispatch(setUnread({unread:data.data.unread, msg:data.data.msg}))
  }
}

export const recvMsg = () => {
  return dispatch => {
    socket.on('recvmsg', data => {
      return dispatch(setMsg(data))
    })
  }
}

export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    socket.emit('sendmsg', {from, to, content})
  }
}

export const getChatMsg = ({from, to}) => {
  return async dispatch => {
    const {data} = await axios.get(`/chat/getMsg?from=${from}&to=${to}`)
    return dispatch(setChatmsg(data.data))
  }
}