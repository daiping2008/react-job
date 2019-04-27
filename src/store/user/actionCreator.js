import axios from 'axios'
import {fromJS} from 'immutable'
import {actionTypes} from './'

export const errMsg = msg => ({
  type: actionTypes.SET_ERRORMSG,
  msg: fromJS(msg)
})

export const setUserinfo = data => ({
  type: actionTypes.SET_USERINFO,
  user: fromJS(data),
})

export const registerSussess = (data) => ({
  type: actionTypes.REGISTER_SUCC,
  user: fromJS(data)
})

export const handleRegister = ({username, pwd, cpwd, type}) => {
  return dispatch => {
    if (!username || !pwd) {
      return dispatch(errMsg('请输入用户名密码'))
    }
    if (pwd !== cpwd) {
      return dispatch(errMsg('两次密码不相同'))
    }

    axios.post('/user/register', {username, pwd, cpwd, type})
      .then(res => {
        const {data} = res
        if (data.code === 1) {
          return dispatch(errMsg(data.msg))
        }
        return dispatch(setUserinfo(data.data))
      })
      .catch(err => {
        return dispatch(errMsg('服务器出错'))
      })
  }
}

export const loginIn = ({username, pwd}) => {
  return async dispatch => {
    if (!username ||!pwd) {
      return dispatch(errMsg('请输入用户名密码'))
    }
    const {data} = await axios.post('/user/login', {username, pwd})
    if (data.code === 1) {
      return dispatch(errMsg(data.msg))
    }
    return dispatch(setUserinfo(data.data))
  }
}

export const getUserInfo = () => {
  return async dispatch => {
    const {data} = await axios.get('/user/info')
    if (data.code === 1) {
      return dispatch(errMsg('')) 
    }
    return dispatch(setUserinfo(data.data))
  }
}

export const updateUser = ({avator, job, desc}) => {
  return async dispatch => {
    console.log({avator, job, desc})
    const {data} = await axios.post('/user/update', {avator, job, desc})
    if (data.code === 1) {
      return dispatch(errMsg('')) 
    }
    return dispatch(setUserinfo(data.data))
  }
}

