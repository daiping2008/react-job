import React from 'react'
import {Button, List, InputItem, WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo'
import HocForm from '../../components/hoc/hocForm'
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
@HocForm
class Login extends React.Component {
  constructor(props){
    super(props)
    this.loginIn = this.loginIn.bind(this)
    this.goRegister = this.goRegister.bind(this)
  }

  render() {
    const {errMsg, redirectTo, handlerChange} = this.props
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
          
          <InputItem onChange = {v => handlerChange('username', v)}>用户名</InputItem>
          <WhiteSpace/>
          <InputItem onChange = { v => handlerChange('pwd', v)} type='password'>密码</InputItem>
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
    const {username, pwd} = this.props.state
    this.props.loginIn({username, pwd})
  }
}

export default Login