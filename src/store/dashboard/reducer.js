import {fromJS} from 'immutable'

import {actionTypes} from './'

const defaultState = fromJS({
  list:[],
  // 选择CardItem
  selectedItem:{} 
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIST:
      return state.set('list', action.data)
    case actionTypes.SET_SELECTITEM:
      return state.set('selectedItem', action.data)
    default:
      return state
  }
}