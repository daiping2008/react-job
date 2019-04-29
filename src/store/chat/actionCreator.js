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

export const getChatMsg = () => {
  return async dispatch => {
    const {data} = await axios.get('/chat')
    return dispatch(setChatmsg(data.data))
  }
}