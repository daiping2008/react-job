import {fromJS} from 'immutable'
import {actionTypes} from './'
import {getRedirectPath} from '../../utils/utils'
const defaultState = fromJS({
  errMsg:'',
  user:{},
  redirectTo:''
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.SET_ERRORMSG:
      return state.merge({
        user:{},
        redirectTo:'',
        errMsg: action.msg
      })
    case actionTypes.SET_USERINFO:
      return state.merge({
        user: action.user,
        redirectTo:`/dashboard/${action.user.toJS().type}`, // 统一跳转到dashboard/页面
        errMsg:''
      })
    case actionTypes.REGISTER_SUCC:
      return state.merge({
        user:{},
        redirectTo:getRedirectPath(action.userType),
        errMsg:''
      })
    default:
      return state
  }
}

