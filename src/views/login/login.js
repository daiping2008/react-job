import React from 'react'
import {Button, List, InputItem, WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo'

import {actionCreator} from '../../store/user'

import {connect} from 'react-redux'
const mapStateToProps = state => {
  return {
    errMsg: state.get('user').get('errMsg'),
    redirectTo: state.get('user').get('redirectTo')
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loginIn({username, pwd}) {
      dispatch(actionCreator.loginIn({username, pwd}))
    }
  }
}
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username:'',
      pwd:''
    }
    this.loginIn = this.loginIn.bind(this)
    this.goRegister = this.goRegister.bind(this)
  }

  render() {
    const {errMsg, redirectTo} = this.props
    return (
      <div>
        {
          redirectTo ? <Redirect to={redirectTo} /> : null
        }
        <Logo/>
        <List>
          {
            errMsg ? <div className='error-msg'>{errMsg}</div> : null
          }
          
          <InputItem onChange = {v => this.handleChange('username', v)}>用户名</InputItem>
          <WhiteSpace/>
          <InputItem onChange = { v => this.handleChange('pwd', v)} type='password'>密码</InputItem>
          <WhiteSpace/>
          <Button type='primary' onClick={this.loginIn} >登录</Button>
          <div className="go-info" onClick={this.goRegister} >前往注册</div>
        </List>
      </div>
    )
  }

  goRegister() {
    this.props.history.push('/register')
  }

  loginIn() {
    const {username, pwd} = this.state
    this.props.loginIn({username, pwd})
  }

  handleChange(type, value) {
    this.setState({
      [type]: value
    })
  }
}

export default Login