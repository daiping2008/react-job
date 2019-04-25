import {fromJS} from 'immutable'
import {actionTypes} from './'
// import {getRedirectPath} from '../../utils/utils'
const defaultState = fromJS({
  errMsg:'',
  username:'',
  type:'',
  redirectTo:'',
  count:1
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.SET_ERRORMSG:
      return state.merge({
        username:'',
        type:'',
        redirectTo:'',
        'errMsg': action.msg
      })
    case actionTypes.SET_USERINFO:
      return state.merge({
        username: action.username,
        type: action.type,
        redirectTo:'/login',
        errMsg:''
      })
    default:
      return state
  }
}

