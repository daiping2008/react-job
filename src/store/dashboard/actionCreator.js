import axios from 'axios'
import {fromJS} from 'immutable'

import {actionTypes} from './'

export const setList = data => ({
  type: actionTypes.SET_LIST,
  data: fromJS(data)
})

export const getDashBoardList = (type) => {
  return async dispatch => {
    const {data} = await axios.get(`/user/list?type=${type}`)
    if (data.code===0) {
      console.log()
      return dispatch(setList(data.data))
    }
  }
}