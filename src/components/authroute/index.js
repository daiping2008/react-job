import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {actionCreator, actionTypes} from '../../store/user'

const mapStateToProps = state => {
  return {
    user: state.get('user').get('user')
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
    const {user} = this.props
    const newUser = user.toJS()

    if (publicViews.indexOf(pathname) >= 0) {
      return null
    }
    if (newUser.username) {
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