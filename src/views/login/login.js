import React from 'react'

import {connect} from 'react-redux'

class Login extends React.Component {
  render() {
    return (
      <div>Hello World {this.props.count}</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state.get('user').get('count')
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)