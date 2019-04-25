import axios from 'axios'
import {fromJS} from 'immutable'
import {actionTypes} from './'

export const errMsg = msg => ({
  type: actionTypes.SET_ERRORMSG,
  msg: fromJS(msg)
})

export const setUserinfo = data => ({
  type: actionTypes.SET_USERINFO,
  username: fromJS(data.username),
  userType:fromJS(data.type)
})

export const handleRegister = ({username, pwd, cpwd, type}) => {
  return dispatch => {
    console.log({username, pwd, cpwd, type})
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

