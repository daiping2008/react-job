import {fromJS} from 'immutable'
const defaultState = fromJS({
  count:1
})

export default (state = defaultState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

