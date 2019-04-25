import {combineReducers} from 'redux-immutable'
import {reducer as userReducer} from './user'

export default combineReducers({
  user: userReducer
})