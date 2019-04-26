import {fromJS} from 'immutable'
import {actionTypes} from './'
import {getRedirectPath} from '../../utils/utils'
const defaultState = fromJS({
  errMsg:'',
  username:'',
  type:'',
  redirectTo:''
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.SET_ERRORMSG:
      return state.merge({
        username:'',
        type:'',
        redirectTo:'',
        errMsg: action.msg
      })
    case actionTypes.SET_USERINFO:
      return state.merge({
        username: action.username,
        type: action.userType,
        redirectTo:`/dashboard/${action.userType}`, // 统一跳转到dashboard/页面
        errMsg:''
      })
    case actionTypes.REGISTER_SUCC:
      return state.merge({
        username:'',
        type:'',
        redirectTo:getRedirectPath(action.userType),
        errMsg:''
      })
    default:
      return state
  }
}

