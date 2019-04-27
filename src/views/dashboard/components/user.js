import React from 'react'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'

import {connect} from 'react-redux'

import Genius from '../../../components/genius'
import Boss from '../../../components/boss'
import cookie  from 'react-cookies'
import {config} from '../../../utils/config'
// import {actionCreator} from '../../../store/user'

import './index.scss'

const mapStateToProps = state => {
  return {
    user: state.get('user').get('user')
  }
}

const mapDispatchToProps = dispatch => {
  return { }
}

@connect(mapStateToProps, mapDispatchToProps)
class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal:false
    }
    this.setUserinfo = this.setUserinfo.bind(this)
    this.logout = this.logout.bind(this)
  }
  render() {
    const {modal} = this.state
    const {user} = this.props
    const newUser = user.toJS()
    return (
      <div>
        <Result
          img={this.setAvator()}
          title={newUser.username}
          message={newUser.company && newUser.company}
        />
        <List renderHeader={() => '个人信息'}>
          {newUser.job&&(
            <List.Item >
              {newUser.job && newUser.job}
              {newUser.desc && newUser.desc.split('\n').map(v=>(<List.Item.Brief key={v}>{v}</List.Item.Brief>))}
              {newUser.money && <List.Item.Brief>{newUser.money}</List.Item.Brief>}
            </List.Item>
          )}
          <List.Item arrow="horizontal" onClick={this.setUserinfo}>
            完善信息
          </List.Item>
        </List>
        <WhiteSpace/>
        <List>
          <List.Item onClick={this.logout} >退出登录</List.Item>
        </List>
        {
          modal ? 
            <div className='user-modal'>
              {
                newUser.type==='boss' ? 
                  <Boss hideModal={ () => this.setState({modal:false}) } /> 
                  : <Genius hideModal={ () => this.setState({modal:false}) } />
              }
            </div>
            : null
        }
      </div>
    )
  }
  setUserinfo() {
    this.setState({ modal: true })
  }

  logout() {
    Modal.alert('注销', '确认退出登录吗？', [
      { text: '取消', onPress: () => {}, style: 'default' },
      { text: '确认', onPress: () => {
        cookie.remove(config.USER_ID)
      }},
    ])
  }

  setAvator() {
    const {user} = this.props
    const newUser = user.toJS()
    const style = {marginTop:'15px'}
    if (newUser.avator) {
      return <img src={require(`../../../assets/img/avators/${newUser.avator}.png`)} style={style} alt='' />
    } else {
      return <img src={require('../../../assets/img/avators/boy.png')} style={style} alt='' />
    }
  }
}

export default User