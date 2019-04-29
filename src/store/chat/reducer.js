import {fromJS} from 'immutable'
import {actionTypes} from './'

const defaultState = fromJS({
  chatmsg:[]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHATMSG:
      return state.set('chatmsg', action.data)
    case actionTypes.SET_MSG:
      return state.set('chatmsg', state.get('chatmsg').concat([action.data]))
    default:
      return state
  }
}