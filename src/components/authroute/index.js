import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {actionCreator, actionTypes} from '../../store/user'

const mapStateToProps = state => {
  return {
    username: state.get('user').get('username')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo() {
      return dispatch(actionCreator.getUserInfo())
    }
  }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Authroute extends React.Component {
  render(){
    return null
  }

  async componentDidMount() {
    const publicViews = ['/login', '/register']
    const {pathname} = this.props.location
    const {username} = this.props

    if (publicViews.includes(pathname)) {
      return null
    }
    if (username) {
      return null
    } else {
      const res = await this.props.getUserInfo()
      if (res.type === actionTypes.SET_ERRORMSG) {
        this.props.history.push('/login')
        return null
      }
    }
    
  }
}

export default Authroute