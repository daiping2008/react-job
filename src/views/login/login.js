import React from 'react'
import {Button} from 'antd-mobile'

import {connect} from 'react-redux'
const mapStateToProps = state => {
  return {
    count: state.get('user').get('count')
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Login extends React.Component {
  render() {
    return (
      <div>Hello World {this.props.count}<Button type="primary">Click</Button></div>
    )
  }
}

export default Login