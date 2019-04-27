import {combineReducers} from 'redux-immutable'
import {reducer as userReducer} from './user'
import {reducer as dashBoardReducer} from './dashboard'

export default combineReducers({
  user: userReducer,
  dashboard: dashBoardReducer
})