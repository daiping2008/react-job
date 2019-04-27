import {fromJS} from 'immutable'

import {actionTypes} from './'

const defaultState = fromJS({
  list:[]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIST:
      return state.set('list', action.data)
    default:
      return state
  }
}