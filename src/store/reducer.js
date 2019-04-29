import {combineReducers} from 'redux-immutable'
import {reducer as userReducer} from './user'
import {reducer as dashBoardReducer} from './dashboard'
import {reducer as chatReducer} from './chat'

export default combineReducers({
  user: userReducer,
  dashboard: dashBoardReducer,
  chat: chatReducer
})