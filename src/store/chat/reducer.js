import {fromJS} from 'immutable'
import {actionTypes} from './'

const defaultState = fromJS({
  chatmsg:[],
  unread:0
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHATMSG:
      return state.merge({chatmsg: action.data, unread: action.data.size})
    case actionTypes.SET_MSG:
      return state.merge({chatmsg: state.get('chatmsg').concat([action.data]), unread: state.get('unread') + 1})
    default:
      return state
  }
}