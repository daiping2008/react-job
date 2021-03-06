import React from 'react'
import {Button, WhiteSpace, InputItem, List, Radio} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

import {actionCreator} from '../../store/user'

import Logo from '../../components/logo'
import HocForm from '../../components/hoc/hocForm'

const mapStateToProps = state => {
  return {
    errMsg: state.get('user').get('errMsg'),
    redirectTo: state.get('user').get('redirectTo')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleRegister({username, pwd, cpwd, type}) {
      dispatch(actionCreator.handleRegister({username, pwd, cpwd, type}))
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@HocForm
class Register extends React.Component {
  constructor(props){
    super(props)

    this.handleRegister = this.handleRegister.bind(this)
    this.goLogin = this.goLogin.bind(this)
  }
  render() {
    const {type} = this.props.state
    const {errMsg, redirectTo, handlerChange} = this.props
    return (
      <div>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Logo/>
        <List>
          {errMsg ? <div className='error-msg'>{errMsg}</div> : ''}
          <InputItem onChange={v => handlerChange('username', v)}>用户名</InputItem>
          <WhiteSpace/>
          <InputItem onChange={v => handlerChange('pwd', v)} type='password' >密码</InputItem>
          <WhiteSpace/>
          <InputItem onChange={v => handlerChange('cpwd',v)} type='password'>确认密码</InputItem>
          <WhiteSpace/>
          <Radio>
            <Radio.RadioItem checked={type==='genius'} onChange={() => handlerChange('type', 'genius')}>牛人</Radio.RadioItem>
            <Radio.RadioItem checked={type==='boss'} onChange={() => handlerChange('type', 'boss')}>BOSS</Radio.RadioItem>
          </Radio>
          <Button type='primary' onClick={this.handleRegister} >注册</Button>
          <div className='go-info' onClick={this.goLogin}>去登录</div>
        </List>
      </div>
    )
  }

  goLogin() {
    this.props.history.push('/login')
  }

  handleRegister() {
    const {username, pwd, cpwd, type} = this.props.state
    console.log({username, pwd, cpwd, type})
    this.props.handleRegister({username, pwd, cpwd, type})
  }
}

export default Register